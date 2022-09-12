import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {
  ResponseMessage, TwitterSampleQueryRequest,
  TwitterService,
  TwitterTweetQueryRequest
} from "../../../../openapi/collector";
import FetchMultimediaEnum = TwitterTweetQueryRequest.FetchMultimediaEnum;

@Component({
  selector: 'app-sample-query-form',
  templateUrl: './sample-query-form.component.html',
  styleUrls: ['./sample-query-form.component.scss']
})
export class SampleQueryFormComponent implements OnInit {

  twitterSampleForm: FormGroup;
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
    this.twitterSampleForm = this.fb.group({
      collection: ['', [Validators.required]],
      queryLabel: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],

      apiKey: ['', [Validators.required,]],
      downloadImages: [false, [Validators.required]],
      downloadGifs: [false, [Validators.required]],
      downloadVideos: [false, [Validators.required]],
      indexInCineast: [false, [Validators.required]],

      referencedTweetsDepth: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  getMultimediaDownloadToggles(): TwitterTweetQueryRequest.FetchMultimediaEnum[] {
    let multimediaDownload: FetchMultimediaEnum[] = [];

    if (this.twitterSampleForm.get('downloadImages')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Image)
    }
    if (this.twitterSampleForm.get('downloadGifs')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.AnimatedImage)
    }
    if (this.twitterSampleForm.get('downloadVideos')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Video)
    }

    return multimediaDownload;
  }

  onSubmit() {
    console.log(this.twitterSampleForm.value);

    const query: TwitterSampleQueryRequest = {
      apiKey: this.twitterSampleForm.get('apiKey')?.value,
      fetchMultimedia: this.getMultimediaDownloadToggles(),
      indexInCineast: this.twitterSampleForm.get('indexInCineast')?.value,
      label: this.twitterSampleForm.get('queryLabel')?.value,
      collectionName: this.twitterSampleForm.get('collection')?.value,
      from: this.twitterSampleForm.get('from')?.value,
      to: this.twitterSampleForm.get('to')?.value,
      referencedTweetsDepth: this.twitterSampleForm.get('referencedTweetsDepth')?.value,
    }

    console.log(query);

    this.loading = true;
    this.twitterTweetQueryService.postApiTwitterQuerySampleNew(query).subscribe({
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
