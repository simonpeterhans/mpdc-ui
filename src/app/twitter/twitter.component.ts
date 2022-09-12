import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Query Overview',
        link: '/twitter/overview',
        index: 0
      },
      {
        label: 'Tweet Query',
        link: '/twitter/query/tweet',
        index: 1
      },
      {
        label: 'Sample Stream Query',
        link: '/twitter/query/sample',
        index: 2
      },
      {
        label: 'Query Inspection',
        link: '/twitter/query/inspect',
        index: 3
      }
    ];
  }

  ngOnInit(): void {
  }

}
