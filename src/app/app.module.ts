import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "../../openapi/collector";
import {AppComponent} from './app.component';
import {AppConfigService} from "./app-config.service";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {ClearableLabelComponent} from "./common/form-components/clearable-label/clearable-label.component";
import {
  CollectionSelectorComponent
} from "./common/form-components/collection-selector/collection-selector.component";
import {CommonModule} from "@angular/common";
import {CrowdtangleComponent} from "./crowdtangle/crowdtangle.component";
import {CtApiKeyInputComponent} from "./crowdtangle/ct-api-key-input/ct-api-key-input.component";
import {CtListQueryComponent} from "./crowdtangle/ct-list-query/ct-list-query.component";
import {
  CtListQueryFormComponent
} from "./crowdtangle/ct-list-query-form/ct-list-query-form.component";
import {CtListSelectorComponent} from "./crowdtangle/ct-list-selector/ct-list-selector.component";
import {CtOverviewComponent} from "./crowdtangle/ct-overview/ct-overview.component";
import {CtQueryStatsComponent} from "./crowdtangle/ct-query-stats/ct-query-stats.component";
import {DateRangeComponent} from "./common/form-components/date-range/date-range.component";
import {DynamicPipe} from "./common/pipes/dynamic.pipe";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ActionTableComponent
} from "./common/action-table/action-table.component";
import {
  QueryStatsComponent
} from "./common/query-stats/query-stats.component";
import {
  SubQueryTableComponent
} from "./common/sub-query-table/sub-query-table.component";
import {
  SuperQueryTableComponent
} from "./common/super-query-table/super-query-table.component";
import {
  ListQueryStatsComponent
} from "./crowdtangle/ct-query-stats/list-query-stats/list-query-stats.component";
import {LoadingInterceptorService} from "./loading-interceptor.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {OverviewComponent} from "./overview/overview.component";
import {PercentPipe} from "./common/pipes/percent.pipe";
import {RouterModule} from "@angular/router";
import {
  SampleQueryStatsComponent
} from "./twitter/twitter-query-stats/sample-query-stats/sample-query-stats.component";
import {
  TweetQueryStatsComponent
} from "./twitter/twitter-query-stats/post-query-stats/tweet-query-stats.component";
import {
  TwitterApiKeyInputComponent
} from "./twitter/twitter-api-key-input/twitter-api-key-input.component";
import {TwitterComponent} from "./twitter/twitter.component";
import {TwitterOverviewComponent} from "./twitter/twitter-overview/twitter-overview.component";
import {
  TwitterQueryStatsComponent
} from "./twitter/twitter-query-stats/twitter-query-stats.component";
import {
  SampleQueryComponent
} from "./twitter/sample-query/sample-query.component";
import {
  SampleQueryFormComponent
} from "./twitter/sample-query-form/sample-query-form.component";
import {
  TweetQueryComponent
} from "./twitter/tweet-query/tweet-query.component";
import {
  TweetQueryFormComponent
} from "./twitter/tweet-query-form/tweet-query-form.component";
import {UnitPipe} from "./common/pipes/unit.pipe";
import {UtcToTimeStringPipe} from "./common/pipes/utc-iso.pipe";

function initializeConfig(appConfig: AppConfigService) {
  return () => {
    // Async loading, return promise (initializer will wait until this is executed).
    return appConfig.loadFromJsonFile();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ClearableLabelComponent,
    CollectionSelectorComponent,
    CrowdtangleComponent,
    CtApiKeyInputComponent,
    CtListQueryComponent,
    CtListQueryFormComponent,
    CtListSelectorComponent,
    CtOverviewComponent,
    CtQueryStatsComponent,
    DateRangeComponent,
    DynamicPipe,
    ActionTableComponent,
    QueryStatsComponent,
    SubQueryTableComponent,
    SuperQueryTableComponent,
    ListQueryStatsComponent,
    OverviewComponent,
    PercentPipe,
    SampleQueryStatsComponent,
    TweetQueryStatsComponent,
    TwitterApiKeyInputComponent,
    TwitterComponent,
    TwitterOverviewComponent,
    TwitterQueryStatsComponent,
    SampleQueryComponent,
    SampleQueryFormComponent,
    TweetQueryComponent,
    TweetQueryFormComponent,
    UnitPipe,
    UtcToTimeStringPipe
  ],
  imports: [
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${AppConfigService.currentConfig.collectorBasePath}`
      })
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [AppConfigService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true},
    AppConfigService,
    DynamicPipe,
    UnitPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
