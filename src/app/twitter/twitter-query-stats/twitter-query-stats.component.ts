import {Component, OnDestroy, OnInit} from '@angular/core';
import {QueryType, SuperQuery} from "../../common/super-query-table/super-query.model";
import {ListTwitterQueryResponse, TwitterService} from "../../../../openapi/collector";
import {ActivatedRoute} from "@angular/router";
import {ConvertTwitterQueryService} from "./convert-twitter-query.service";

@Component({
  selector: 'app-twitter-query-stats',
  templateUrl: './twitter-query-stats.component.html',
  styleUrls: ['./twitter-query-stats.component.scss']
})
export class TwitterQueryStatsComponent implements OnInit, OnDestroy {

  allSuperQueries: SuperQuery[];
  selectedSuperQuery: SuperQuery | undefined;
  allQueryTypes = QueryType;

  private readonly interval: any;

  constructor(
    private twitterService: TwitterService,
    private twitterConvertService: ConvertTwitterQueryService,
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
    this.twitterService.getApiTwitterQueryList().subscribe({
      next: (res: ListTwitterQueryResponse) => {
        let tweetQueries = this.twitterConvertService.convertTweetQueries(res.tweetSuperQueries);
        let sampleQueries = this.twitterConvertService.convertSampleQueries(res.sampleSuperQueries);

        this.allSuperQueries = [];
        this.allSuperQueries.push(...tweetQueries);
        this.allSuperQueries.push(...sampleQueries);
      },
      error: (err: any) => {
      }
    })
  }

}
