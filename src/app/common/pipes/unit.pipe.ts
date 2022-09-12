import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    return value;
  }

}
