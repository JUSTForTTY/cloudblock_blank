import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '../../../../core/setting/settest.service';

@Component({
  selector: 'app-sucu04-weiget0010001',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sucu04-weiget0010001.component.html',
  styles: [
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
export class Sucu04Weiget0010001Component implements OnInit {
  serviceId;
  @Input() sets = {
    "blockId": "",
    "style": {
      "table": [],
      "tableLinkFields": {},
      "placeholder": "",
      "searchType": "like",
      "maxlength": 99
    }
  };
  @Input() local = false;
  @Input() static = false;
  dateSets: {} = {
    "type": 0,
    "refresh": false,
    "params": {}
  };

  constructor(
    private http: _HttpClient,
    public settestService: SettestService
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

  value = ""
  onChange(event): void {
    console.log("input:" + JSON.stringify(event));
    let field = "",searchType="";
    this.sets.style.table.forEach(tableId => {
      field = this.sets.style.tableLinkFields[tableId];
      searchType=this.sets.style.searchType;
      this.settestService.blocksort[tableId]['dateSets']['searchMap'][field] = [{
        "name": searchType,
        "value1": event,
        "value2": ''
      }]
    });

  }



}
