import { Component,  ElementRef, ViewChild, ViewEncapsulation,OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu04-weiget0010006',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sucu04-weiget0010006.component.html',
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
export class Sucu04Weiget0010006Component implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
    value = '';
    lastvalue='';
    title = '请输入身份证号码';
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
      const reg =  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      
      if(value.length-this.lastvalue.length==1)
        this.value = this.value+value.charAt(value.length-1);
      else if(value.length-this.lastvalue.length>1){
        //bug...
      }else{
          this.value=this.value.substring(0,this.value.length-1);
      }
      this.split(this.value);
      this.updateTitle(reg.test(this.value)+'');
    }

    split(str:string):void{
      let newstr="";
      for (let index = 0; index < str.length; index++) {
        if(index==6 || index==10 ||index==14) newstr=newstr+" ";
        if(index>=6&&index<14) newstr=newstr+"*";
        else newstr=newstr+str.charAt(index);
      }
      this.lastvalue=newstr;
    }
    
    updateTitle(title:string): void {
        title=title+":"+this.value;
        this.title = title;
      }
}
