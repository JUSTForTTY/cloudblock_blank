import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-option-layout',
  templateUrl: './option-layout.component.html',
  styles:[`
  .container {
    width: 100%;
    min-height: 100%;
    padding-top: 65px;
    position: relative;
    padding-bottom: 50px;
}
  `]
})
export class OptionLayoutComponent implements OnInit {
    isFetching = false;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
