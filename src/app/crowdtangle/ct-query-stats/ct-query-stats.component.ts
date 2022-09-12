import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrowdtangleService, ListCtListQueryResponse} from "../../../../openapi/collector";
import {SuperQuery} from "../../common/super-query-table/super-query.model";
import {ConvertCtQueryService} from "./convert-ct-query.service";

@Component({
  selector: 'app-ct-query-stats',
  templateUrl: './ct-query-stats.component.html',
  styleUrls: ['./ct-query-stats.component.scss']
})
export class CtQueryStatsComponent implements OnInit, OnDestroy {

  allSuperQueries: SuperQuery[];
  selectedSuperQuery: SuperQuery | undefined;

  private readonly interval: any;

  constructor(
    private ctService: CrowdtangleService,
    private convertService: ConvertCtQueryService,
    private params: ActivatedRoute
  ) {
    this.allSuperQueries = [];
    this.selectedSuperQuery = undefined;

    this.interval = setInterval(() => {
      this.refreshData()
    }, 1000)
  }

  ngOnInit(): void {
    this.refreshData()
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  updateSelectedQuery($event: SuperQuery | undefined) {
    this.selectedSuperQuery = $event;
  }

  refreshData() {
    this.ctService.getApiCtQueryListList().subscribe({
      next: (res: ListCtListQueryResponse) => {
        let q = this.convertService.convertListQueries(res.superQueries);

        if (q) {
          this.allSuperQueries = q;
        } else {
          this.allSuperQueries = [];
        }
      },
      error: (err: any) => {
      }
    })
  }

}
