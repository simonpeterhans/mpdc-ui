import {Component, Input, OnInit} from '@angular/core';
import {ObservableDataSource} from "../action-table/observable-data-source.model";
import {ColumnDef} from "../action-table/column-def.model";
import {QueryService, ResponseMessage} from "../../../../openapi/collector";
import {UnitPipe} from "../pipes/unit.pipe";
import {UtcToTimeStringPipe} from "../pipes/utc-iso.pipe";
import {BehaviorSubject} from "rxjs";
import {SuperQuery} from "./super-query.model";
import {ButtonDef} from "../action-table/button-def.model";
import {PercentPipe} from "../pipes/percent.pipe";
import {StateEval} from "../state-eval";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-super-query-table',
  templateUrl: './super-query-table.component.html',
  styleUrls: ['./super-query-table.component.scss']
})
export class SuperQueryTableComponent implements OnInit {

  @Input('superQueryList')
  set superQueryList(data: SuperQuery[]) {
    this.superQueryListSubject.next(data)
  }

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private durationInSeconds = 5;

  // Actual subject to use for the data.
  private superQueryListSubject = new BehaviorSubject<SuperQuery[]>([]);

  dataSource: ObservableDataSource<SuperQuery>;
  columnDefs: ColumnDef[];

  constructor(private queryService: QueryService, private snackBar: MatSnackBar) {
    this.dataSource = new ObservableDataSource<SuperQuery>();
    this.columnDefs = [
      {key: 'superId', label: 'Super ID', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'numSubQueries', label: 'Sub Queries', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'label', label: 'Label', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'from', label: 'From', show: true, pipe: UtcToTimeStringPipe, pipeArgs: []},
      {key: 'to', label: 'To', show: true, pipe: UtcToTimeStringPipe, pipeArgs: []},
      {
        key: 'lastProcessed',
        label: 'Last Processed',
        show: true,
        pipe: UtcToTimeStringPipe,
        pipeArgs: []
      },
      {key: 'health', label: 'Health', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'progress', label: 'Progress', show: true, pipe: PercentPipe, pipeArgs: []},
      {key: 'numPosts', label: 'Posts', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'uniqueMedia', label: 'Media', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'mediaJobs', label: 'Media Queue', show: true, pipe: UnitPipe, pipeArgs: []},
      {
        key: 'multimediaDownload',
        label: 'Multimedia Download',
        show: true,
        pipe: UnitPipe,
        pipeArgs: []
      },
      {key: 'indexInCineast', label: 'Index in vitrivr', show: true, pipe: UnitPipe, pipeArgs: []}
    ];

    this.superQueryListSubject.subscribe(
      it => this.processNewData(it)
    )
  }

  ngOnInit(): void {
  }

  processNewData(superQueries: SuperQuery[]) {
    superQueries.forEach(superQuery => {
      let resumable = false;
      let pausable = false;

      superQuery.subQueries.forEach(subQuery => {
        if (StateEval.isRecoverable(subQuery.state)) {
          resumable = true;
        }
      });

      superQuery.subQueries.forEach(subQuery => {
        if (StateEval.isInterruptible(subQuery.state)) {
          pausable = true;
        }
      });

      if (resumable) {
        superQuery.actions.push(this.getResumeSuperButton());
      }

      if (pausable) {
        superQuery.actions.push(this.getPauseSuperButton());
      }
    });

    this.dataSource.setData(superQueries);
  }

  getPauseSuperButton(): ButtonDef<SuperQuery> {
    return {icon: 'pause', tooltip: '', f: (q: SuperQuery) => this.pauseSuper(q)};
  }

  getResumeSuperButton(): ButtonDef<SuperQuery> {
    return {icon: 'play_arrow', tooltip: '', f: (q: SuperQuery) => this.resumeSuper(q)};
  }

  pauseSuper(q: SuperQuery) {
    this.queryService.postApiQueryInterruptSub(q.getSubIds()).subscribe({
      next: (res: ResponseMessage) => {
        this.snackBar.open("Successfully interrupted sub queries.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      },
      error: (err: any) => {
        this.snackBar.open("Failed to interrupt sub queries.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      }
    });
  }

  resumeSuper(q: SuperQuery) {
    this.queryService.postApiQueryRecoverSub(q.getSubIds()).subscribe({
      next: (res: ResponseMessage) => {
        this.snackBar.open("Successfully resumed sub queries.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      },
      error: (err: any) => {
        this.snackBar.open("Failed to resume sub queries.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      }
    });
  }

}
