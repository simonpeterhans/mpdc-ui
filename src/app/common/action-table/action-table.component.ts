import {Component, Input, OnInit} from '@angular/core';
import {ColumnDef} from "./column-def.model";
import {ObservableDataSource} from "./observable-data-source.model";

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss']
})
export class ActionTableComponent<T> implements OnInit {

  @Input() dataSource!: ObservableDataSource<T>;
  @Input() columnDefs!: ColumnDef[];

  readonly BUTTON_COL_ID = "actions"; // Not static so we can easily access it in the template.

  constructor() {
  }

  ngOnInit(): void {
  }

  getVisibleColumns(): ColumnDef[] {
    return this.columnDefs.filter(it => {
      return it.show;
    });
  }

  getVisibleColumnDefs(): string[] {
    const defs = this.getVisibleColumns().map(it => {
      return it.key;
    });

    return [this.BUTTON_COL_ID, ...defs];
  }

}
