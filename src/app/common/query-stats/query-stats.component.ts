import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {QueryType, SuperQuery} from "../super-query-table/super-query.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-query-stats',
  templateUrl: './query-stats.component.html',
  styleUrls: ['./query-stats.component.scss']
})
export class QueryStatsComponent implements OnInit, OnChanges {

  @Input()
  allSuperQueries: SuperQuery[];

  @Output()
  selectedSuperQueryChange = new EventEmitter<SuperQuery | undefined>()

  selectedSuperQuery: SuperQuery | undefined;

  // Should only contain 1 element (the selected query).
  tableSuperQuery: SuperQuery[];

  constructor(
    private params: ActivatedRoute
  ) {
    this.selectedSuperQuery = undefined;
    this.allSuperQueries = [];
    this.tableSuperQuery = [];

    this.selectedSuperQueryChange.subscribe(it => {
      this.selectedSuperQuery = it;

      if (it) {
        this.tableSuperQuery = [it];
      } else {
        this.tableSuperQuery = [];
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.update(this.allSuperQueries)
  }

  capitalizeFirstLetter(s: String): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  getQueryTypeString(qt: QueryType): string {
    let fullString = QueryType[qt].toLowerCase();

    // Types consist of PLATFORM_QUERY_TYPE.
    let sub = fullString.split("_")
    let newString = ""

    // Omit platform, concatenate the rest.
    for (let s of sub.slice(1)) {
      newString += this.capitalizeFirstLetter(s) + " "
    }

    return newString.substring(0, newString.length - 1)
  }

  updateSelectedQuery() {
    this.selectedSuperQueryChange.emit(this.selectedSuperQuery);
  }

  update(queries: SuperQuery[]) {
    let oldId = -1;

    if (this.selectedSuperQuery) {
      oldId = this.selectedSuperQuery.superId;
    }

    if (this.selectedSuperQuery) {
      let backup = queries.find(it => it.superId === oldId);

      if (backup) {
        this.selectedSuperQuery = backup;
        this.tableSuperQuery = [this.selectedSuperQuery];
      } else {
        this.selectedSuperQuery = undefined;
        this.tableSuperQuery = [];
      }
    } else {
      if (this.allSuperQueries.filter(
        q => q.superId === this.selectedSuperQuery?.superId!!
      ).length === 0) {
        this.selectedSuperQuery = undefined;
      }

      if (this.selectedSuperQuery === undefined && this.allSuperQueries.length > 0) {
        this.selectedSuperQuery = this.allSuperQueries[0];
        this.updateSelectedQuery();
      }
    }
  }

}
