import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showProgressBar: boolean;

  constructor(private loadingService: LoadingService, private cd: ChangeDetectorRef) {
    this.showProgressBar = false;

    loadingService.isLoading.subscribe(next => {
      this.showProgressBar = next;
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
  }

}
