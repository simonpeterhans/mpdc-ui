import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CtApiKeyCheckService, CtListUpdate} from "../ct-api-key-check.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ct-list-selector',
  templateUrl: './ct-list-selector.component.html',
  styleUrls: ['./ct-list-selector.component.scss']
})
export class CtListSelectorComponent implements OnInit, OnDestroy {

  @Input() fg!: FormGroup;
  subscription!: Subscription;
  lastUpdate: CtListUpdate

  constructor(private apiKeyCheckService: CtApiKeyCheckService) {
    this.lastUpdate = {
      loading: false,
      retrievedLists: [],
      validKey: false
    };
  }

  ngOnInit(): void {
    this.subscription = this.subscription = this.apiKeyCheckService.listUpdates.subscribe({
      next: (res: CtListUpdate) => {
        this.lastUpdate = res;
      },
      error: (err: any) => {
        // TODO.
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
