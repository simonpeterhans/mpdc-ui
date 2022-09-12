import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface TwitterApiKeyCheckUpdate {
  validKey: boolean
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TwitterApiKeyCheckService {

  private static readonly QUERY = "https://api.twitter.com/2/users/12" // Checks for Jack Dorsey.

  keyUpdates: Observable<TwitterApiKeyCheckUpdate>;
  private keyUpdateSubject: Subject<TwitterApiKeyCheckUpdate>;

  constructor(private http: HttpClient) {
    this.keyUpdateSubject = new Subject<TwitterApiKeyCheckUpdate>();
    this.keyUpdates = this.keyUpdateSubject.asObservable();
  }

  queryForKey(key: string) {
    // Test API key, set status to loading.
    this.keyUpdateSubject.next({
      loading: true,
      validKey: true
    });

    // TODO Remove this if we get the actual check working.
    this.keyUpdateSubject.next({
      loading: false,
      validKey: true
    });

    // This currently doesn't work.
    /*
    const headers = new HttpHeaders().set("Authorization", "Bearer " + key);

    // Key could be valid, make a request to check validity (but not one that depletes our quota!).
    this.http.get(TwitterApiKeyCheckService.QUERY, {headers}).subscribe({
      next: (res: any) => {
        this.keyUpdateSubject.next({
          loading: false,
          validKey: true
        });
      },
      error: (err: Error) => {
        console.log(err);
        this.keyUpdateSubject.next({
          loading: false,
          validKey: false
        });
      }
    });*/
  }

}
