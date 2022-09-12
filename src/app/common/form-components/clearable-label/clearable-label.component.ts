import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-clearable-label',
  templateUrl: './clearable-label.component.html',
  styleUrls: ['./clearable-label.component.scss']
})
export class ClearableLabelComponent implements OnInit {

  @Input() fg!: FormGroup
  @Input() fcName!: string
  @Input() inputLabel!: string
  @Input() errorMessage: string | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

  isInputNotEmpty() {
    let val = this.fg.get(this.fcName)?.value;

    // Null or undefined (=== null only checks for null).
    if (val == null) {
      return false
    }

    return val.toString().length != 0;
  }

  resetInput() {
    this.fg.get(this.fcName)?.setValue('');
  }

}
