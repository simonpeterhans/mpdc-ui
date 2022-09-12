import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // private isLoadingSource = new BehaviorSubject<boolean>(false);
  private isLoadingSource = new Subject<boolean>();
  isLoading = this.isLoadingSource.asObservable()

  private activeLoaders: number;

  constructor() {
    this.activeLoaders = 0;
  }

  startLoading() {
    this.activeLoaders++;
    this.isLoadingSource.next(true);
  }

  stopLoading() {
    if (this.activeLoaders > 0) {
      this.activeLoaders--;
    }

    if (this.activeLoaders == 0) {
      this.isLoadingSource.next(false);
    }
  }

}
