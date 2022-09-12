import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CtApiKeyCheckService, CtListUpdate} from "../ct-api-key-check.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ct-api-key-input',
  templateUrl: './ct-api-key-input.component.html',
  styleUrls: ['./ct-api-key-input.component.scss']
})
export class CtApiKeyInputComponent implements OnInit, OnDestroy {

  @Input() fg!: FormGroup;
  @Input() fcName!: string;
  apiKeyCheckSubscription!: Subscription;
  valueChangeSubscription!: Subscription;

  constructor(private apiKeyCheckService: CtApiKeyCheckService) {
  }

  ngOnInit(): void {
    // Subscribe self so we can update accordingly.
    this.apiKeyCheckSubscription = this.apiKeyCheckService.listUpdates.subscribe({
      next: (res: CtListUpdate) => {
        this.processResponse(res);
      },
      error: (err: any) => {
        // TODO.
      }
    });

    this.valueChangeSubscription = this.fg.get(this.fcName)!.valueChanges.subscribe({
      next: (val: string) => {
        this.apiKeyCheckService.queryForKey(val);
      },
      error: (err: any) => {
      }
    });
  }

  ngOnDestroy() {
    this.apiKeyCheckSubscription.unsubscribe();
    this.valueChangeSubscription.unsubscribe();
  }

  private processResponse(update: CtListUpdate) {
    if (!update.validKey) {
      this.fg.get(this.fcName)!.setErrors({"invalidKey": true});
    }
  }

}
