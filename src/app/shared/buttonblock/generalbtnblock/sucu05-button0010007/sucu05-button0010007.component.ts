import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu05-button0010007',
  templateUrl: './sucu05-button0010007.component.html',
  styles  : [
    `
    [nz-button] {
      margin-right: 8px;
      margin-bottom: 12px;
    }

  `
]
})
export class Sucu05Button0010007Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
