import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrowdtangleComponent} from "./crowdtangle/crowdtangle.component";
import {OverviewComponent} from "./overview/overview.component";
import {CtOverviewComponent} from "./crowdtangle/ct-overview/ct-overview.component";
import {CtListQueryComponent} from "./crowdtangle/ct-list-query/ct-list-query.component";
import {TwitterOverviewComponent} from './twitter/twitter-overview/twitter-overview.component';
import {TwitterComponent} from './twitter/twitter.component';
import {
  TweetQueryComponent
} from "./twitter/tweet-query/tweet-query.component";
import {CtQueryStatsComponent} from "./crowdtangle/ct-query-stats/ct-query-stats.component";
import {
  TwitterQueryStatsComponent
} from "./twitter/twitter-query-stats/twitter-query-stats.component";
import {
  SampleQueryComponent
} from "./twitter/sample-query/sample-query.component";

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'overview', component: OverviewComponent},
  {
    path: 'twitter', component: TwitterComponent, children: [
      {path: 'overview', component: TwitterOverviewComponent},
      {path: 'query/tweet', component: TweetQueryComponent},
      {path: 'query/sample', component: SampleQueryComponent},
      {path: 'query/inspect', component: TwitterQueryStatsComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
    ]
  },
  {
    path: 'crowdtangle', component: CrowdtangleComponent, children: [
      {path: 'overview', component: CtOverviewComponent},
      {path: 'query/list', component: CtListQueryComponent},
      {path: 'query/inspect', component: CtQueryStatsComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
