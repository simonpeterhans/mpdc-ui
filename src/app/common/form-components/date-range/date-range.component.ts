import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() fg!: FormGroup
  @Input() fcNameFrom!: string
  @Input() fcNameTo!: string

  constructor() {
  }

  ngOnInit(): void {
  }

}
