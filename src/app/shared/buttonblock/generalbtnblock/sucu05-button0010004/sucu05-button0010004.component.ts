import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '../../../../core/setting/settest.service';
@Component({
  selector: 'app-sucu05-button0010004',
  templateUrl: './sucu05-button0010004.component.html',
  styles: [
    `
  `
  ]
})
export class Sucu05Button0010004Component implements OnInit {
  serviceId;
  @Input() sets = {
    "style": {
      "text": "批量删除",
      "nzSize": "default",
      "color": "",
      "table": "",
      "jumpType": "pop",
      "page": ""
    }
  };
  @Input() local = false;
  @Input() static = false;
  dateSets: {} = {
    "type": 0,
    "refresh": false
  };
  constructor(
    private http: _HttpClient,
    private settestService: SettestService
  ) { }

  ngOnInit() {
    if (!this.local) {//非本地
      if (!this.static) {//非静态
        this.serviceId = this.settestService.getblockid();
        console.log("新增按钮ngOnInit" + this.serviceId)
        if (this.settestService.blocksort[this.serviceId]['sets'] != "{}"
          && this.settestService.blocksort[this.serviceId]['sets'] != {}) {
          this.sets = this.settestService.blocksort[this.serviceId]['sets'];
        } else {
          this.settestService.blocksort[this.serviceId]['sets'] = this.sets;
        }
        this.settestService.blocksort[this.serviceId]['dateSets'] = this.dateSets;
      }
      else {//静态
        this.sets = JSON.parse(<any>this.sets);
      }
    }
  }
  onClick(): void {
    console.log("批量删除:" + this.sets.style.table);
    this.settestService.blocksort[this.sets.style.table]['dateSets']['type'] = 'deleteMore';
    this.settestService.blocksort[this.sets.style.table]['dateSets']['params'] =
      {
        "isShow": true,
        "title": "提示",
        "content": "肯定要删除吗"
      };
    this.settestService.blocksort[this.sets.style.table]['dateSets']['refresh'] = true;

  }
}
