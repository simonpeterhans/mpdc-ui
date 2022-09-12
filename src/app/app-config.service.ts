import {Injectable} from '@angular/core';
import {Config} from "./config.model";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static currentConfig: Config;
  private static configSubject = new BehaviorSubject<Config | null>(null);

  constructor(private http: HttpClient) {
  }

  get config(): Config {
    return AppConfigService.currentConfig;
  }

  get configAsObservable(): Observable<Config | null> {
    return AppConfigService.configSubject.asObservable();
  }

  public publishChanges() {
    AppConfigService.configSubject.next(AppConfigService.currentConfig);
  }

  async loadFromJsonFile() {
    const jsonFile = 'config.json?r=' + v4(); // Is the UUID for caching purposes?

    // Block here to make sure the config is fully loaded once we return from this function.
    return firstValueFrom(
      this.http.get(jsonFile).pipe(it => {
        console.log(it);
        return it
      })
    ).then(
      response => {
        AppConfigService.currentConfig = Config.deserializeFromObject(response);
        console.log("Successfully loaded config.");
      }
    ).catch(
      response => {
        console.log("Failed to load config, creating default.");
        AppConfigService.currentConfig = Config.deserializeFromObject(new Config());
      }
    ).finally(
      () => {
        AppConfigService.configSubject.next(AppConfigService.currentConfig);
        console.log(AppConfigService.currentConfig)
      }
    )
  }

}
