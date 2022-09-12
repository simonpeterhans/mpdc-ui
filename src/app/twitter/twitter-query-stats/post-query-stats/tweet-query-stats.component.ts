import {Component, Input, OnInit} from '@angular/core';
import {
  TwitterAccountQueryParameter,
  TwitterKeywordQueryParameter,
  TwitterTweetQueryOptions
} from "../../../../../openapi/collector";
import {SuperQuery} from "../../../common/super-query-table/super-query.model";

@Component({
  selector: 'app-tweet-query-stats',
  templateUrl: './tweet-query-stats.component.html',
  styleUrls: ['./tweet-query-stats.component.scss']
})
export class TweetQueryStatsComponent implements OnInit {

  @Input()
  selectedSuperQuery: SuperQuery | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  getKeywords(): TwitterKeywordQueryParameter[] {
    if (!this.selectedSuperQuery) {
      return [];
    }

    return (this.selectedSuperQuery.specificData as TwitterTweetQueryOptions).keywords
  }

  getAccounts(): TwitterAccountQueryParameter[] {
    if (!this.selectedSuperQuery) {
      return [];
    }

    return (this.selectedSuperQuery.specificData as TwitterTweetQueryOptions).accounts
  }

}
