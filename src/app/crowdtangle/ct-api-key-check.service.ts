import {Injectable} from '@angular/core';
import {CtGetListService, CtList, CtListForApiKey} from "./ct-get-list.service";
import {Observable, Subject} from "rxjs";

export interface CtListUpdate {
  validKey: boolean
  loading: boolean
  retrievedLists: CtList[]
}

@Injectable({
  providedIn: 'root'
})
export class CtApiKeyCheckService {

  private static readonly KEY_LENGTH = 40;
  listUpdates: Observable<CtListUpdate>;
  private listUpdateSubject: Subject<CtListUpdate>;

  constructor(private listService: CtGetListService) {
    this.listUpdateSubject = new Subject<CtListUpdate>();
    this.listUpdates = this.listUpdateSubject.asObservable();
  }

  static isKeyValid(key: string) {
    return key.length == CtApiKeyCheckService.KEY_LENGTH;
  }

  queryForKey(key: string) {
    if (!CtApiKeyCheckService.isKeyValid(key)) {
      // Invalidate and return.
      this.listUpdateSubject.next({
        loading: false,
        validKey: false,
        retrievedLists: []
      });
      return
    }

    // Load if we made it until here.
    this.listUpdateSubject.next({
      loading: true,
      validKey: true,
      retrievedLists: []
    });

    // Key could be valid, try to get lists to check validity.
    this.listService.getListsForKey(key).subscribe({
      next: (res: CtListForApiKey) => {
        this.listUpdateSubject.next({
          loading: false,
          validKey: true,
          retrievedLists: res.result.lists
        });
      },
      error: (err: Error) => {
        console.log(err);
        this.listUpdateSubject.next({
          loading: false,
          validKey: false,
          retrievedLists: []
        });
      }
    });
  }

}
