import { Component,  ElementRef, ViewChild, ViewEncapsulation,OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0010005',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sucu04-weiget0010005.component.html',
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
export class Sucu04Weiget0010005Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    value = '';
    title = '请输入手机号';
  
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
      const reg2 = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/; 

      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value;
      }
      this.inputElement.nativeElement.value = this.value;
      this.updateTitle(reg2.test(value)+'');
    }
  
    
    updateTitle(title:string): void {
        if(title=="false") title="手机号格式不对";
        this.title = title;
      }
}
