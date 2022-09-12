import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";

export class ObservableDataSource<T> extends DataSource<T> {

  private readonly dataStream!: ReplaySubject<T[]>
  private currentLength: number

  constructor() {
    super()
    this.dataStream = new ReplaySubject<T[]>();
    this.currentLength = 0;
  }

  getDataLength() {
    return this.currentLength;
  }

  setData(data: T[]) {
    this.currentLength = data.length;
    this.dataStream.next(data);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
