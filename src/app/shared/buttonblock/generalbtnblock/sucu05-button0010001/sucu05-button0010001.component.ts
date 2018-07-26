import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '../../../../core/setting/settest.service';
import { NzModalService } from 'ng-zorro-antd';
@Component({
    selector: 'app-sucu05-button0010001',
    templateUrl: './sucu05-button0010001.component.html',
    styles: [``]
})
export class Sucu05Button0010001Component implements OnInit {
    serviceId;
    @Input() sets = {
        "style": {
            "text": "新增",
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
        public settestService: SettestService,
        private modalService: NzModalService
    ) { }
    ngOnInit() {

        if (!this.local) {//非本地
            if (!this.static) {//非静态
                this.serviceId = this.settestService.getblockid();
                console.log("新增按钮ngOnInit" + this.serviceId)
                if (this.settestService.blocksort[this.serviceId]['sets'] != "{}"
                    && this.settestService.blocksort[this.serviceId]['sets'] != {}) {
                    this.sets = this.settestService.blocksort[this.serviceId]['sets'];
                    console.log("新增按钮type1" + this.serviceId);
                } else {
                    this.settestService.blocksort[this.serviceId]['sets'] = this.sets;
                    console.log("新增按钮type2" + this.serviceId)
                }

                this.settestService.blocksort[this.serviceId]['dateSets'] = this.dateSets;
            }
            else {//静态
                this.sets = JSON.parse(<any>this.sets);
            }
        }
    }
    onClick() {
        console.log("onClick");
        switch (this.sets['style']['jumpType']) {
            case 'pop':
                this.modalService.info({
                    nzTitle: this.sets['style']['page'],
                    nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
                    nzOnOk: () => console.log('Info OK')
                });
                break;
            case 'new':
                window.open("https://www.baidu.com/");
                break;
            case 'bottom':

                break;

            default:
                break;
        }
    }

}
