import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-crowdtangle',
  templateUrl: './crowdtangle.component.html',
  styleUrls: ['./crowdtangle.component.scss']
})
export class CrowdtangleComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Query Overview',
        link: '/crowdtangle/overview',
        index: 0
      },
      {
        label: 'List Query',
        link: '/crowdtangle/query/list',
        index: 1
      },
      {
        label: 'Query Inspection',
        link: '/crowdtangle/query/inspect',
        index: 2
      }
    ];
  }

  ngOnInit() {
  }

}
