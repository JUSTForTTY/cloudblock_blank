import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';

@Component({
  selector: 'app-sucu04-weiget0040003',
  templateUrl: './sucu04-weiget0040003.component.html',
  styles  : [ `
  :host ::ng-deep .ant-calendar-picker {
    margin: 0 8px 12px 0;
  }
` ]
})
export class Sucu04Weiget0040003Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


}
