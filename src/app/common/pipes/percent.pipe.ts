import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    let percent = parseFloat((100 * value).toFixed(2));
    return percent + ' %';
  }

}
