import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0040002',
  templateUrl: './sucu04-weiget0040002.component.html',
})
export class Sucu04Weiget0040002Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

}
