import { Component,  ElementRef, ViewChild, ViewEncapsulation,OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0010002',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sucu04-weiget0010002.component.html',
  styles       : [
    `
    .numeric-input .ant-tooltip-inner {
      min-width: 32px;
      min-height: 37px;
    }

    .numeric-input .numeric-input-title {
      font-size: 14px;
    }

  `
    ]
})
export class Sucu04Weiget0010002Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    value = '';
    title = '请输入密码';
  
    @ViewChild('inputElement') inputElement: ElementRef;
  
    onChange(value: string): void {
      this.updateValue(value);
    }
  
    // '.' at the end or only '-' in the input box.
    onBlur(): void {
      if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
        this.updateValue(this.value.slice(0, -1));
      }
    }
  
    updateValue(value: string): void {
      const reg = /^[a-zA-Z0-9_-]{4,16}$/; 
      this.value = value;
      this.inputElement.nativeElement.value = this.value;
      this.updateTitle(reg.test(value)+'');
    }
  
    
    updateTitle(title:string): void {
        if(title=="false") title=title+"-4到16位（字母，数字，下划线，减号）";
        this.title = title;
      }
  
    
}
