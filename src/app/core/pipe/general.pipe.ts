import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'general'
})

export class GeneralPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe) { }

  transform(value: any, type: string, arg: String = ''): any {
    switch (type) {
      case "date":
        if (arg == '')
          return this.datePipe.transform(value);
        else
          return this.datePipe.transform(value, ...arg.split(","));
      case "numerical":
        if (arg == '')
          return this.decimalPipe.transform(value);
        else
          return this.decimalPipe.transform(value, ...arg.split(","));
      case "substr":
        return value.substr(-4, 4);
      default:
        return value;
    }

  }

}
