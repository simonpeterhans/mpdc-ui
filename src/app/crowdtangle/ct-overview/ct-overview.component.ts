import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CrowdtangleService, ListCtListQueryResponse} from "../../../../openapi/collector";
import {SuperQuery} from "../../common/super-query-table/super-query.model";
import {ConvertCtQueryService} from "../ct-query-stats/convert-ct-query.service";

@Component({
  selector: 'app-ct-overview',
  templateUrl: './ct-overview.component.html',
  styleUrls: ['./ct-overview.component.scss']
})
export class CtOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  listQueries: SuperQuery[];
  private readonly interval: any;

  constructor(
    private ctService: CrowdtangleService,
    private convertService: ConvertCtQueryService
  ) {
    this.listQueries = [];
    this.interval = setInterval(() => {
      this.refreshData()
    }, 1000)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  refreshData() {
    this.ctService.getApiCtQueryListList().subscribe({
      next: (res: ListCtListQueryResponse) => {
        this.listQueries = this.convertService.convertListQueries(res.superQueries);
      },
      error: (err: any) => {
      }
    })
  }

}
