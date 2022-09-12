import {Component, Input, OnInit} from '@angular/core';
import {ObservableDataSource} from "../action-table/observable-data-source.model";
import {ColumnDef} from "../action-table/column-def.model";
import {BehaviorSubject} from "rxjs";
import {QueryService, ResponseMessage} from "../../../../openapi/collector";
import {UnitPipe} from "../pipes/unit.pipe";
import {UtcToTimeStringPipe} from "../pipes/utc-iso.pipe";
import {SubQuery} from "./sub-query.model";
import {ButtonDef} from "../action-table/button-def.model";
import {PercentPipe} from "../pipes/percent.pipe";
import {StateEval} from "../state-eval";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sub-query-table',
  templateUrl: './sub-query-table.component.html',
  styleUrls: ['./sub-query-table.component.scss']
})
export class SubQueryTableComponent implements OnInit {

  @Input('subQueryList')
  set subQueryList(data: SubQuery[]) {
    this.subQueryListSubject.next(data)
  }

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private durationInSeconds = 5;

  // Actual subject to use for the data.
  private subQueryListSubject = new BehaviorSubject<SubQuery[]>([]);

  dataSource: ObservableDataSource<SubQuery>;
  columnDefs: ColumnDef[];

  constructor(private queryService: QueryService, private snackBar: MatSnackBar) {
    this.dataSource = new ObservableDataSource<SubQuery>();
    this.columnDefs = [
      {key: 'subId', label: 'Sub ID', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'temporalType', label: 'Temporal Type', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'from', label: 'From', show: true, pipe: UtcToTimeStringPipe, pipeArgs: []},
      {key: 'to', label: 'To', show: true, pipe: UtcToTimeStringPipe, pipeArgs: []},
      {
        key: 'lastProcessed',
        label: 'Last Processed',
        show: true,
        pipe: UtcToTimeStringPipe,
        pipeArgs: []
      },
      {
        key: 'lastCheckpoint',
        label: 'Last Checkpoint',
        show: true,
        pipe: UtcToTimeStringPipe,
        pipeArgs: []
      },
      {key: 'state', label: 'Stream State', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'statusText', label: 'Status Text', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'progress', label: 'Progress', show: true, pipe: PercentPipe, pipeArgs: []},
      {key: 'numPosts', label: 'Posts', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'uniqueMedia', label: 'Media', show: true, pipe: UnitPipe, pipeArgs: []},
      {key: 'mediaJobs', label: 'Media Queue', show: true, pipe: UnitPipe, pipeArgs: []}
    ];

    this.subQueryListSubject.subscribe(
      it => this.processNewData(it)
    )
  }

  ngOnInit(): void {
  }

  processNewData(subQueries: SubQuery[]) {
    subQueries.forEach(subQuery => {
      if (StateEval.isRecoverable(subQuery.state)) {
        subQuery.actions.push(this.getResumeSubButton())
      }
      if (StateEval.isInterruptible(subQuery.state)) {
        subQuery.actions.push(this.getPauseSubButton())
      }
    });

    this.dataSource.setData(subQueries);
  }

  getPauseSubButton(): ButtonDef<SubQuery> {
    return {icon: 'pause', tooltip: '', f: (q: SubQuery) => this.pauseSub(q)}
  }

  getResumeSubButton(): ButtonDef<SubQuery> {
    return {icon: 'play_arrow', tooltip: '', f: (q: SubQuery) => this.resumeSub(q)}
  }

  pauseSub(q: SubQuery) {
    this.queryService.postApiQueryInterruptSub([q.subId]).subscribe({
      next: (res: ResponseMessage) => {
        this.snackBar.open("Successfully interrupted sub query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      },
      error: (err: any) => {
        this.snackBar.open("Failed to interrupt sub query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      }
    });
  }

  resumeSub(q: SubQuery) {
    this.queryService.postApiQueryRecoverSub([q.subId]).subscribe({
      next: (res: ResponseMessage) => {
        this.snackBar.open("Successfully resumed sub query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      },
      error: (err: any) => {
        this.snackBar.open("Failed to resume sub query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
      }
    });
  }

}
