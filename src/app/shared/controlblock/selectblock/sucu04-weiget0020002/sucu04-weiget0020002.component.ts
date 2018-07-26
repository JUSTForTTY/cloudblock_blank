import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }]
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }]
  }]
}];



@Component({
  selector: 'app-sucu04-weiget0020002',
  templateUrl: './sucu04-weiget0020002.component.html',
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    `
  ]
})
export class Sucu04Weiget0020002Component implements OnInit {

    /** init data */
  nzOptions = options;

  /** ngModel value */
  public values: any[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);
  }

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
