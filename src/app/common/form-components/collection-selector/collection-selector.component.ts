import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {catchError, map, Observable, startWith, throwError} from "rxjs";
import {CollectionLabelsResponse, QueryService} from "../../../../../openapi/collector";

@Component({
  selector: 'app-collection-selector',
  templateUrl: './collection-selector.component.html',
  styleUrls: ['./collection-selector.component.scss']
})
export class CollectionSelectorComponent implements OnInit {

  @Input() fg!: FormGroup
  @Input() errorMessage: string | null = null

  collections: string[] = [];
  filteredCollections: Observable<string[]>

  constructor(public queryApi: QueryService) {
    this.collections = [];
    this.filteredCollections = new Observable();
  }

  ngOnInit(): void {
    // Only do this once for now, could do it periodically or on request as well.
    this.updateCollections();
  }

  handleApiError(error: any) {
    return throwError(() => error);
  }

  updateCollections() {
    console.log("Updating collections...");

    this.queryApi.getApiQueryCollections().pipe(
      catchError(this.handleApiError)
    ).subscribe(
      (next: CollectionLabelsResponse) => {
        // Update available collections.
        this.collections = next.collections;
        this._updateFiltering();
        console.log("Updated collections.");
      }
    );
  }

  isInputNotEmpty() {
    let val = this.fg.get('collection')?.value;

    // Null or undefined (=== null only checks for null).
    if (val == null) {
      return false
    }

    return val.toString().length != 0;
  }

  resetInput() {
    this.fg.get('collection')?.setValue('');
  }

  private _updateFiltering() {
    // Update filtering.
    this.filteredCollections = this.fg.controls['collection'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCollections(value))
    );
  }

  private _filterCollections(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.collections.filter(option => option.toLowerCase().startsWith(filterValue));
  }

}
