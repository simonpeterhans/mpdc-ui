import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {
  TwitterApiKeyCheckService,
  TwitterApiKeyCheckUpdate
} from "../twitter-api-key-check.service";

@Component({
  selector: 'app-twitter-api-key-input',
  templateUrl: './twitter-api-key-input.component.html',
  styleUrls: ['./twitter-api-key-input.component.scss']
})
export class TwitterApiKeyInputComponent implements OnInit {

  @Input() fg!: FormGroup;
  @Input() fcName!: string;
  apiKeyCheckSubscription!: Subscription;
  valueChangeSubscription!: Subscription;

  constructor(private apiKeyCheckService: TwitterApiKeyCheckService) {
  }

  ngOnInit(): void {
    // Subscribe self so we can update accordingly.
    this.apiKeyCheckSubscription = this.apiKeyCheckService.keyUpdates.subscribe({
      next: (res: TwitterApiKeyCheckUpdate) => {
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

  private processResponse(update: TwitterApiKeyCheckUpdate) {
    if (!update.validKey) {
      this.fg.get(this.fcName)!.setErrors({"invalidKey": true});
    }
  }

}
