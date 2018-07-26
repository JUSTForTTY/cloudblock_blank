import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu05-button0010006',
  templateUrl: './sucu05-button0010006.component.html',
  styles  : [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class Sucu05Button0010006Component implements OnInit {
    isLoadingOne = false;
  
    loadOne(): void {
      this.isLoadingOne = true;
      setTimeout(_ => {
        this.isLoadingOne = false;
      }, 5000);
    }
  
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
