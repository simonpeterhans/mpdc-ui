import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  CrowdtangleService,
  CtListQueryRequest,
  ResponseMessage
} from "../../../../openapi/collector";
import {CtList} from "../ct-get-list.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import FetchMultimediaEnum = CtListQueryRequest.FetchMultimediaEnum;

@Component({
  selector: 'app-ct-list-query-form',
  templateUrl: './ct-list-query-form.component.html',
  styleUrls: ['./ct-list-query-form.component.scss'],
  // providers: [CtGetListService]
})
export class CtListQueryFormComponent implements OnInit {

  ctListForm: FormGroup;
  loading: boolean
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private durationInSeconds = 5;

  constructor(
    private ctListQueryService: CrowdtangleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
    this.ctListForm = this.fb.group({
      collection: ['', [Validators.required]],
      queryLabel: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],

      apiKey: ['', [Validators.required,]],
      downloadImages: [false, [Validators.required]],
      downloadVideos: [false, [Validators.required]],
      indexInCineast: [false, [Validators.required]],

      listIds: [[], [Validators.required]],
      queryDelayMinutes: [0, [Validators.required]],
      includeHistory: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  getMultimediaDownloadToggles(): CtListQueryRequest.FetchMultimediaEnum[] {
    let multimediaDownload: FetchMultimediaEnum[] = [];

    if (this.ctListForm.get('downloadImages')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Image)
    }
    if (this.ctListForm.get('downloadVideos')?.value) {
      multimediaDownload.push(FetchMultimediaEnum.Video)
    }

    return multimediaDownload
  }

  onSubmit() {
    this.loading = true;
    console.log(this.ctListForm.value);

    const query: CtListQueryRequest = {
      apiKey: this.ctListForm.get('apiKey')?.value,
      fetchMultimedia: this.getMultimediaDownloadToggles(),
      indexInCineast: this.ctListForm.get('indexInCineast')?.value,
      label: this.ctListForm.get('queryLabel')?.value,
      collectionName: this.ctListForm.get('collection')?.value,
      from: this.ctListForm.get('from')?.value,
      to: this.ctListForm.get('to')?.value,
      listIds: this.ctListForm.get('listIds')?.value.map(function (element: CtList) {
        return element.id
      }),
      includeHistory: this.ctListForm.get('includeHistory')?.value
    }

    console.log(query);

    this.ctListQueryService.postApiCtQueryListNew(query).subscribe({
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
