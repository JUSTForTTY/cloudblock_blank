import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0010003',
  templateUrl: './sucu04-weiget0010003.component.html',
})
export class Sucu04Weiget0010003Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    
    demoValue = 3;
    isDisabled = false;
  
    toggleDisabled(): void {
      this.isDisabled = !this.isDisabled;
    }

}
