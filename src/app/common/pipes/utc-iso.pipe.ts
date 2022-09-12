import {Pipe, PipeTransform} from '@angular/core';
import * as dayjs from "dayjs";

@Pipe({
  name: 'utcToTimeString'
})
export class UtcToTimeStringPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    if (value < 0) {
      return "-"
    }
    const unixMillis = 1_000 * value;
    return dayjs(unixMillis).format('DD/MM/YYYY - HH:mm:ss');
  }

}
