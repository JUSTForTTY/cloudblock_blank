import { Component, OnInit, Inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SettestService } from '@core/setting/settest.service';
@Component({
    selector: 'app-pzsucu04-weiget0010001',
    templateUrl: './pzsucu04-weiget0010001.component.html',
})
export class Pzsucu04Weiget0010001Component implements OnInit {
    listOfOption = [];
    weiget_options: FormGroup;
    firstId;//第一次init的id
    id;
    constructor(
        private http: _HttpClient,
        public settestService: SettestService,
        @Inject(FormBuilder) fb: FormBuilder,
    ) {
        this.weiget_options = fb.group({
            weiget_datatables: [null, Validators.required],
            weiget_bingcolumns: [null, Validators.required],
            weiget_defaluttext: [null, Validators.required],
            weiget_textlength: [null, Validators.required],
            weiget_searchtype: [null, Validators.required],
            weiget_texttitle: [null, Validators.required],
            weiget_lengthstyle: [null, Validators.required],
            weiget_textcolor: [null, Validators.required],
            weiget_bordercolor: [null, Validators.required],
            weiget_totleposition: [null, Validators.required],
            weiget_inputsize: [null, Validators.required],
            weiget_searchstyle: [null, Validators.required],
        })
    }
    ngDoCheck() {
        if (this.firstId != this.settestService.rightid) {
            this.init();
        }
    }

    ngOnInit() {
        this.init();
    }
    init(){
        this.id = this.settestService.rightid;
        this.firstId = this.settestService.rightid;
        if (this.settestService.blocksort[this.settestService.rightid].sets['style']['table'].length == 0 && this.settestService.linkInfo['table'].length > 0) {
            this.settestService.blocksort[this.settestService.rightid].sets['style']['table'].push(this.settestService.linkInfo['table'][0]['value']);
        }
        this.initTableFields();

        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
    /**
     * 数据表选择后触发事件。1:动态新增表单
     * @param event 
     */
    onTableChange(event) {
        this.tableFields = {};
        this.initTableFields();
    }
    //初始化表的选择字段
    tableFields = {};
    initTableFields() {
        this.settestService.blocksort[this.settestService.rightid].sets['style']['table'].forEach(element => {
            this.tableFields[element] = this.settestService.blocksort[element].sets['tableData']['searchColumn'];
            this.weiget_options.addControl(element, new FormControl(null, Validators.required));
            if (typeof this.settestService.blocksort[this.settestService.rightid].sets['style']['tableLinkFields'][element] == 'undefined') {
                this.settestService.blocksort[this.settestService.rightid].sets['style']['tableLinkFields'][element] = this.tableFields[element][0]
            }
        });
    }

}
