import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SuperQuery} from "../../common/super-query-table/super-query.model";
import {ListTwitterQueryResponse, TwitterService} from "../../../../openapi/collector";
import {ConvertTwitterQueryService} from "../twitter-query-stats/convert-twitter-query.service";

@Component({
  selector: 'app-twitter-overview',
  templateUrl: './twitter-overview.component.html',
  styleUrls: ['./twitter-overview.component.scss']
})
export class TwitterOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  tweetQueries: SuperQuery[];
  sampleQueries: SuperQuery[];
  private readonly interval: any;

  constructor(
    private twitterService: TwitterService,
    private convertService: ConvertTwitterQueryService
  ) {
    this.tweetQueries = [];
    this.sampleQueries = [];
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
    this.twitterService.getApiTwitterQueryList().subscribe({
      next: (res: ListTwitterQueryResponse) => {
        this.tweetQueries = this.convertService.convertTweetQueries(res.tweetSuperQueries);
        this.sampleQueries = this.convertService.convertSampleQueries(res.sampleSuperQueries);
      },
      error: (err: any) => {
      }
    })
  }

}
