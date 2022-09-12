import {Component, Input, OnInit} from '@angular/core';
import {SuperQuery} from "../../../common/super-query-table/super-query.model";

@Component({
  selector: 'app-sample-query-stats',
  templateUrl: './sample-query-stats.component.html',
  styleUrls: ['./sample-query-stats.component.scss']
})
export class SampleQueryStatsComponent implements OnInit {

  @Input()
  selectedSuperQuery: SuperQuery | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
