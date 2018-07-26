import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0020001',
  templateUrl: './sucu04-weiget0020001.component.html',
})
export class Sucu04Weiget0020001Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    log(e) {
        console.log('click dropdown button');
      }

}
