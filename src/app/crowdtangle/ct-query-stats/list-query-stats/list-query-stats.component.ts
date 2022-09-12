import {Component, Input, OnInit} from '@angular/core';
import {CtListQueryOptions} from "../../../../../openapi/collector";
import {SuperQuery} from "../../../common/super-query-table/super-query.model";

@Component({
  selector: 'app-list-query-stats',
  templateUrl: './list-query-stats.component.html',
  styleUrls: ['./list-query-stats.component.scss']
})
export class ListQueryStatsComponent implements OnInit {

  @Input()
  selectedSuperQuery: SuperQuery | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  getLists() {
    if (!this.selectedSuperQuery) {
      return [];
    }

    return (this.selectedSuperQuery.specificData as CtListQueryOptions).listIds
  }

}
