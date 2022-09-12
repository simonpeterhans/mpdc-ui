import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ResponseMessage,
  TwitterService,
  TwitterTweetQueryRequest
} from "../../../../openapi/collector";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import FetchMultimediaEnum = TwitterTweetQueryRequest.FetchMultimediaEnum;

@Component({
  selector: 'app-tweet-query-form',
  templateUrl: './tweet-query-form.component.html',
  styleUrls: ['./tweet-query-form.component.scss']
})
export class TweetQueryFormComponent implements OnInit {

  twitterTweetForm: FormGroup;
  loading: boolean
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private durationInSeconds = 5;

  constructor(
    private twitterTweetQueryService: TwitterService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
    this.twitterTweetForm = this.fb.group({
      collection: ['', [Validators.required]],
      queryLabel: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],

      apiKey: ['', [Validators.required,]],
      downloadImages: [false, [Validators.required]],
      downloadGifs: [false, [Validators.required]],
      downloadVideos: [false, [Validators.required]],
      indexInCineast: [false, [Validators.required]],

      keywords: [''],
      accounts: [''],
      referencedTweetsDepth: [1, [Validators.required]],
      queryDelayMinutes: [0, [Validators.required]],
      useStreamingApiIfPossible: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  getMultimediaDownloadToggles(): TwitterTweetQueryRequest.FetchMultimediaEnum[] {
    let multimediaDownload: FetchMultimediaEnum[] = [];

    if (this.twitterTweetForm.get('downloadImages')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Image)
    }
    if (this.twitterTweetForm.get('downloadGifs')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.AnimatedImage)
    }
    if (this.twitterTweetForm.get('downloadVideos')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Video)
    }

    return multimediaDownload;
  }

  onSubmit() {
    console.log(this.twitterTweetForm.value);

    const kws = this.twitterTweetForm.get('keywords')?.value
    const accs = this.twitterTweetForm.get('accounts')?.value

    const query: TwitterTweetQueryRequest = {
      apiKey: this.twitterTweetForm.get('apiKey')?.value,
      fetchMultimedia: this.getMultimediaDownloadToggles(),
      indexInCineast: this.twitterTweetForm.get('indexInCineast')?.value,
      label: this.twitterTweetForm.get('queryLabel')?.value,
      collectionName: this.twitterTweetForm.get('collection')?.value,
      from: this.twitterTweetForm.get('from')?.value,
      to: this.twitterTweetForm.get('to')?.value,
      keywords: (kws === "") ? [] : kws.split(/\r?\n/), // Split by newline.
      accounts: (accs === "") ? [] : accs.split(/\r?\n/), // Split by newline.
      queryDelayMinutes: 0,
      referencedTweetsDepth: this.twitterTweetForm.get('referencedTweetsDepth')?.value,
      useStreamingApiIfPossible: this.twitterTweetForm.get('useStreamingApiIfPossible')?.value
    }

    console.log(query);

    this.loading = true;
    this.twitterTweetQueryService.postApiTwitterQueryTweetNew(query).subscribe({
      next: (res: ResponseMessage) => {
        this.snackBar.open("Successfully issued query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.snackBar.open("Failed to issue query.", "Dismiss", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000
        });
        this.loading = false;
      }
    });
  }

}
