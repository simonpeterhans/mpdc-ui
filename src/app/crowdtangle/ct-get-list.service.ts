import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CtListForApiKey {
  status: number,
  result: Result
}

export interface Result {
  lists: CtList[]
}

export interface CtList {
  id: number,
  title: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class CtGetListService {

  private endpoint = 'https://api.crowdtangle.com/lists?token=';

  constructor(private http: HttpClient) {
  }

  getListsForKey(key: string): Observable<CtListForApiKey> {
    return this.http.get<CtListForApiKey>(this.endpoint + key).pipe()
  }

}
