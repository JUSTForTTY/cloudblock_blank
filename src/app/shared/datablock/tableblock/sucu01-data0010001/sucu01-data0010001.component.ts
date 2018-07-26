import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';
import { HttpService } from '@core/httpService/http.service';
import { SettestService } from '@core/setting/settest.service';
import { GeneralPipe } from '@core/pipe/general.pipe';
import { min } from 'moment';
@Component({
  selector: 'app-sucu01-data0010001',
  templateUrl: './sucu01-data0010001.component.html',
  styles: [
    `
    .custom-filter-dropdown {
      padding: 8px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    }

    

    .highlight {
      color: #f50;
    }
      .editable-cell {
        position: relative;
      }

      .editable-cell-input-wrapper,
      .editable-cell-text-wrapper {
        padding-right: 24px;
      }

      .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
      }

      .editable-cell-icon,
      .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
      }

      .editable-cell-icon {
        line-height: 18px;
        display: none;
      }

      .editable-cell-icon-check {
        line-height: 28px;
      }

      .editable-cell:hover .editable-cell-icon {
        display: inline-block;
      }

      .editable-cell-icon:hover,
      .editable-cell-icon-check:hover {
        color: #108ee9;
      }

      .editable-add-btn {
        margin-bottom: 8px;
      }
  `
  ]
})
export class Sucu01Data0010001Component implements OnInit {
  displayData = [];
  nzTotal = [];
  loading = false;
  isEdit: { [key: string]: any } = {};
  isRowEdit: { [key: string]: any } = {};
  columnStatu: { [key: string]: any } = {};
  footer = {};
  isNeedFooter = false;
  alreadySet = false;
  geval = eval;
  @Input() sets = {
    "blockId": "",
    "blockType": "table",
    "tableStyle": {
      "pageSizeOptions": [8, 16, 32, 50, 80],
      "nzPageSize": 8,

      "nzShowPagination": true,
      "nzShowQuickJumper": true,
      "nzShowCheckbox": false,
      "nzBordered": true,
      "nzScroll": false,
      "nzTitle": "",
      "nzSize": "small",
      "timer": {
        "used": false,
        "time": 2,
        "refresh": false
      },
      "operationsPosition": "front",
      "operationsGroup": [],
      "operationWidth": "100",
      "footerName": "统计",

    },
    "tableData": {
      "tableName": "t_test001",
      "sysFields": {
        "isDelete": "flag",
        "primaryKeys": ["test001_id"]
      },
      "searchColumn": [
        "test001_id", "test001_name", "test001_content", "create_time",
        "create_user", "modify_time", "modify_user", "flag"],
      "showColumn": [
        "test001_id", "test001_name", "test001_content",
        "create_time", "create_user", "flag"],
      "tableGroup": ["create_user"],
      "ColumnDate": {
        "test001_id": {
          "Relname": "编号",
          "type": "text",
          "attribute": "1",
          "format": "",
          "footer": "",
          "alignType": "right",
          "width": "100",
          "state": [
            { "conditions": "", "results": "" }
          ],
          "style": [],
          "isSearch": true,
          "searchType": "=",
          "isShow": true,
          "isEdit": false,
          "isSort": false,
          "isFilter": false


        },
        "test001_name": {
          "Relname": "测试表1名称",
          "type": "text",
          "attribute": "0",
          "format": "",
          "footer": "",
          "alignType": "center",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": true,
          "isEdit": false,
          "isSort": true,
          "isFilter": false
        },
        "test001_content": {
          "Relname": "测试表1内容",
          "type": "text",
          "attribute": "0",
          "format": "",
          "footer": "",
          "alignType": "right",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": true,
          "isEdit": false,
          "isSort": true,
          "isFilter": false
        },
        "create_time": {
          "Relname": "创建时间",
          "type": "date",
          "attribute": "4",
          "format": "",
          "footer": "",
          "alignType": "left",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": true,
          "isEdit": false,
          "isSort": false,
          "isFilter": false
        },
        "create_user": {
          "Relname": "创建人",
          "type": "text",
          "attribute": "5",
          "format": "",
          "footer": "",
          "alignType": "left",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": true,
          "isEdit": false,
          "isSort": false,
          "isFilter": true
        },
        "modify_time": {
          "Relname": "更新时间",
          "type": "text",
          "attribute": "6",
          "format": "",
          "footer": "",
          "alignType": "left",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": false,
          "isEdit": false,
          "isSort": false,
          "isFilter": false
        },
        "modify_user": {
          "Relname": "更新人",
          "type": "text",
          "attribute": "7",
          "format": "",
          "footer": "",
          "alignType": "left",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "like",
          "isShow": false,
          "isEdit": false,
          "isSort": false,
          "isFilter": false
        },
        "flag": {
          "Relname": "删除标记",
          "type": "image",
          "attribute": "3",
          "format": "",
          "footer": "",
          "alignType": "left",
          "width": "100",
          "state": [],
          "style": [],
          "isSearch": true,
          "searchType": "=",
          "isShow": true,
          "isEdit": false,
          "isSort": false,
          "isFilter": false
        }
      }
    }
  };
  dateSets: {} = {
    "type": 0,
    "refresh": false,
    "params": {},
    "searchMap": {}
  };
  @Input() local = false;
  @Input() static = false;
  //定时器
  private timer;

  constructor(private http: _HttpClient, private optionservice: HttpService,
    public settestService: SettestService, private modalService: NzModalService) {

  }
  ngDoCheck() {
    if (this.dateSets['refresh']) {
      switch (this.dateSets['type']) {
        case 1:
          this.displayData = [];
          break;
        case 'deleteMore':
          this.deleteMore();
          break;
        case 'search':
          this.searchTable();
          break;

        default:
          this.searchData(true);
          break;
      }

      this.dateSets['type'] = 0;
      this.dateSets['refresh'] = false;
    }
    if (this.sets['tableStyle']['timer']['refresh']) {
      if (this.sets['tableStyle']['timer']['used']) {
        //启动定时刷新
        if (!this.timer) {
          this.timer = setInterval(() => {
            console.log("定时器")
            this.searchData();
          }, this.sets['tableStyle']['timer']['time'] * 1000)
        }
      } else {
        //关闭
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
      this.sets['tableStyle']['timer']['refresh'] = false;
    }
  }
  ngOnInit(): void {
    if (!this.local) {//非本地
      if (!this.static) {//非静态
        this.serviceId = this.settestService.getblockid(-3);
        console.log("表格ngOnInit" + this.serviceId)
        if (this.settestService.blocksort[this.serviceId]['sets'] != "{}" && this.settestService.blocksort[this.serviceId]['sets'] != {}) {
          this.sets = this.settestService.blocksort[this.serviceId]['sets'];
          // this.dateSets = this.settestService.blocksort[this.serviceId]['dateSets'];
        } else {
          this.settestService.blocksort[this.serviceId]['sets'] = this.sets;

        }
        this.sets['blockId'] = this.serviceId;
        console.log("表格ngOnInit" + JSON.stringify(this.sets));
        this.settestService.blocksort[this.serviceId]['dateSets'] = this.dateSets;
      }
      else {//静态
        this.sets = JSON.parse(<any>this.sets);
        this.settestService.blocksort[this.sets.blockId] = { "dateSets": {} };
        this.settestService.blocksort[this.sets.blockId]['dateSets'] = this.dateSets;
      }
    }
    this.searchMap = {
    };


    this.tableSort = [];
    this.searchData();
    if (this.sets['tableStyle']['operationsGroup'].length <= 3) {
      this.myContext = this.sets['tableStyle']['operationsGroup'];
    }
    else {
      this.myContext = this.sets['tableStyle']['operationsGroup'].filter((value, index) => index < 2);
      this.moreOperations = this.sets['tableStyle']['operationsGroup'].filter((value, index) => index >= 2);
    }
    if (this.sets['tableStyle']['timer']['used']) {
      this.timer = setInterval(() => {
        console.log("定时器")
        this.searchData();
      }, this.sets['tableStyle']['timer']['time'] * 1000)
    }

  }
  //销毁组件时清除定时器  
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }


  //
  pageIndex = 1;
  @Input() serviceId;

  //选择框
  allChecked = false;
  indeterminate = false;

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  //批量删除
  deleteMore() {
    console.log("批量删除：" + this.displayData.filter(value => value.checked).length);
    let checkedList = this.displayData.filter(value => value.checked);
    if (checkedList.length > 0) {
      if (this.dateSets['params']['isShow']) {
        this.modalService.confirm({
          nzTitle: this.dateSets['params']['title'],
          nzContent: this.dateSets['params']['content'],
          nzOnOk: () => this.delete(checkedList)
        });
      } else {
        this.delete(checkedList)
      }

    } else {
      this.modalService.info({
        nzTitle: "提示",
        nzContent: "请勾选删除项"
      });
    }

  }
  /**
   * 查询表格事件
   */
  searchTable() {
    let searchMap = {};
    let name = "", value1 = "", value2 = "";
    for (const key in this.dateSets['searchMap']) {
      if (this.dateSets['searchMap'].hasOwnProperty(key)) {
        const fieldMap = this.dateSets['searchMap'][key];
        searchMap[key] = [];
        fieldMap.forEach(element => {
          searchMap[key].push({
            "name": element['name'],
            "value1": element['value1'],
            "value2": element['value2']
          });
        });


      }
    }
    this.searchData(true, searchMap);
  }
  //编辑
  isSpinning = false;
  updateMap = [];
  primaryMap = [];

  finishEdit(key: string, index: string): void {
    this.isSpinning = true;
    this.updateOneFieldDate(key, this.displayData[index][key], index, false, "finishEdit");
  }
  startEdit(key: string, index: string): void {
    this.isEdit[index + "-" + key] = true;
    console.log(JSON.stringify(this.isEdit));
  }


  //
  //页脚
  searchData(reset: boolean = false, searchMap?) {
    this.loading = true;
    if (reset) {
      this.pageIndex = 1;
    }
    if (typeof searchMap == 'undefined') searchMap = this.searchMap;
    const bodys = {
      "tableColumn": this.sets['tableData']['searchColumn'],
      "tableName": this.sets['tableData']['tableName'],
      "pageSize": this.sets['tableStyle']['nzPageSize'],
      "nowPage": this.pageIndex,
      "tableSort": this.tableSort,
      "searchMap": searchMap,
      "tableGroup": this.sets['tableData']['tableGroup'],
      "deleteFlag": [
        {
          "name": this.sets['tableData']['sysFields']['isDelete'],
          "value": "0"
        }
      ]
    }
    console.log("表格body:" + JSON.stringify(bodys));
    this.optionservice.postHttp("/v1/SUCU01DATA0010001/tableData", bodys).subscribe(
      (data: any) => {
        this.loading = false;
        // console.log("表格data:" + JSON.stringify(data));

        this.displayData = data.data.result;
        this.groupResult = data.data.groupResult;
        this.nzTotal = data.data.dataTotal;
        //页脚设置
        let needFooter = {};

        if (this.sets['tableStyle']['nzShowCheckbox'] == true) {
          this.footer['sucuCheckBox'] = this.sets['tableStyle']['footerName'];
          this.alreadySet = true;
        } else if (this.sets['tableStyle']['operationsPosition'] == 'front' && this.sets['tableStyle']['operationsGroup'].length > 0) {
          this.footer['sucuOperations'] = this.sets['tableStyle']['footerName'];
          this.alreadySet = true;
        }
        this.sets['tableData']['showColumn'].forEach(element => {
          this.footer[element] = '';
          if (this.sets['tableData']['ColumnDate'][element]['footer'] != '') {
            this.isNeedFooter = true;
            needFooter[element] = this.sets['tableData']['ColumnDate'][element]['footer'];
          }
        });
        let count = 0;
        this.displayData.forEach(dataelement => {

          for (const key in needFooter) {
            if (needFooter.hasOwnProperty(key)) {
              const element = needFooter[key];
              switch (element) {
                case 'sum':
                  if (this.footer[key] == '') this.footer[key] = 0;
                  console.log("sum:" + this.footer[key] + "," + Number(dataelement[key]));
                  this.footer[key] = this.footer[key] + Number(dataelement[key]);
                  break;
                case 'avg':
                  if (this.footer[key] == '') this.footer[key] = 0;
                  this.footer[key] = (this.footer[key] * count + Number(dataelement[key])) / (count + 1);
                  count = count + 1;
                  break;
                case 'min':
                  if (this.footer[key] == '') this.footer[key] = dataelement[key];
                  this.footer[key] = min(this.footer[key], dataelement[key]);
                  break;
                case 'max':
                  if (this.footer[key] == '') this.footer[key] = Number(dataelement[key]);
                  this.footer[key] = this.footer[key] >= dataelement[key] ? this.footer[key] : dataelement[key];
                  break;
                case 'count':
                  if (this.footer[key] == '') this.footer[key] = 0;
                  this.footer[key] = this.footer[key] + 1;

                  break;

                default:
                  break;
              }
            }
          }
          dataelement['checked'] = false;
          dataelement['disabled'] = false;

        });
        if (!this.alreadySet) {
          this.alreadySet = true;
          this.footer[this.sets['tableData']['showColumn'][0]] = this.sets['tableStyle']['footerName'];
        }
        this.isEdit = {};
        this.isRowEdit = {};
        this.columnStatu = {};
        this.allChecked = false;
        this.indeterminate = false;
      }
    );


  }
  //排序
  tableSort = [];
  sort(sort: { key: string, value: string }): void {
    console.log(sort.key + "," + sort.value);
    this.tableSort = [{
      "name": "create_time",
      "value": "desc"
    }];
    this.tableSort[0]['name'] = sort.key;
    if (sort.value.startsWith('desc')) {
      this.tableSort[0]['value'] = 'desc';
      this.searchData();
    } else if (sort.value.startsWith('asc')) {
      this.tableSort[0]['value'] = 'asc';
      this.searchData();
    }

  }
  //筛选

  groupResult = [{
    "value": "gry",
    "text": "gry"
  },
  {
    "value": "tty",
    "text": "tty"
  }
  ];
  searchValue = {};
  searchMap = {};


  filter(field, event) {
    console.log("event:" + JSON.stringify(event));
    if (event.length > 0) {
      this.searchMap[field] = [];

      event.forEach(element => {
        this.searchMap[field].push(
          {
            "name": "=",
            "value1": element
          }
        )
      });
    } else {
      delete this.searchMap[field];
    }

    this.searchData();
    console.log("event:" + JSON.stringify(this.searchMap));

  }
  search(field) {//暂时无用
    this.searchMap = [];
    if (this.searchValue[field] != "") {
      console.log("json:" + JSON.stringify(this.sets['tableData']['ColumnDate'][field]));
      this.searchMap = [{
        "name": field,
        "value": [
          {
            "name": this.sets['tableData']['ColumnDate'][field]['searchType'],
            "value1": this.searchValue[field]
          }
        ]
      }];

    }
    this.searchData();

  }
  //操作组事件
  myContext;
  moreOperations = [];
  operationClick(type, index, page?) {
    console.log("operationClick:" + type + "," + index);
    if (type == "删除") {
      this.deleteOne(index)
    }
    else if (type == "编辑-单行") {
      this.editOneStart(index);
    }
    else if (type == '编辑-弹框') {
      this.modalService.info({
        nzTitle: page,
        nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
        nzOnOk: () => console.log('Info OK')
      });
    }
    else if (type == '查询-弹框') {
      this.modalService.info({
        nzTitle: page,
        nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
        nzOnOk: () => console.log('Info OK')
      });
    }
  }
  //编辑单行
  editOneStart(index) {
    this.isRowEdit[index] = true;
    for (const key in this.displayData[index]) {
      if (this.displayData[index].hasOwnProperty(key)) {
        const element = this.displayData[index][key];
        this.isEdit[index + "-" + key] = false;
      }
    }
  }
  cancelEdit(index): void {
    this.isRowEdit[index] = false;
  }

  saveEdit(index): void {
    this.updateMap = [];
    this.sets['tableData'].showColumn.filter(value => this.sets['tableData']['ColumnDate'][value]['attribute'] == '0').forEach(element => {
      this.updateMap.push({
        "name": element,
        "value": this.displayData[index][element]
      });
    });
    this.updateByUpdateMap(index, this.updateMap, index, true, "saveEdit");

  }

  //删除单行
  deleteOne(index) {
    let list = [this.displayData[index]];
    this.delete(list);
  }



  //===通用方法
  //删除
  delete(checkedList) {
    console.log("删除：" + checkedList.length)
    let bodys = [];
    let primaryMap = [];
    checkedList.forEach(element => {
      primaryMap = [];
      this.sets['tableData']['sysFields']['primaryKeys'].forEach(primaryKey => {
        primaryMap.push({
          "name": primaryKey,
          "value": element[primaryKey]
        });
      });
      bodys.push({
        "tableName": this.sets['tableData']['tableName'],
        "deleteFlag": this.sets['tableData']['sysFields']['isDelete'],
        "primaryMap": primaryMap
      });
    });
    console.log("bodys:" + JSON.stringify(bodys));
    this.optionservice.postHttp("/v1/system/logicalDeleteData", bodys).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.searchData();
      }
    );

  }
  //更新数据
  updateByUpdateMap(key: string, updateMap, index: string, isrefresh: boolean, otherEventType?) {
    this.primaryMap = [];
    this.sets['tableData']['sysFields']['primaryKeys'].forEach(element => {
      this.primaryMap.push({
        "name": element,
        "value": this.displayData[index][element]
      })
    });
    console.log("primaryKeys:" + JSON.stringify(this.sets['tableData']['sysFields']['primaryKeys']));
    console.log("primaryMap:" + JSON.stringify(this.primaryMap));
    const bodys = {
      "tableName": this.sets['tableData']['tableName'],
      "updateMap": updateMap,
      "primaryMap": this.primaryMap
    }
    this.optionservice.putHttp("/v1/SUCU01DATA0010001/tableData", bodys).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        if (otherEventType == "finishEdit") {
          this.isEdit[index + "-" + key] = false;
          this.isSpinning = false;
        }
        else if (otherEventType == "saveEdit") {
          this.isRowEdit[key] = false;
        }
      }
    );
    if (isrefresh) {
      this.searchData();
    }
  }
  updateOneFieldDate(key: string, value: string, index: string, isrefresh: boolean, otherEventType?) {
    this.updateMap = [];
    this.updateMap.push({
      "name": key,
      "value": value
    });
    this.updateByUpdateMap(key, this.updateMap, index, isrefresh, otherEventType);
  }
  conditions = [{
    condition: "",
    style: ""
  }];
  testIcon(styles, indexRow, Column) {
    if (typeof styles['icon'] != 'undefined') {
      this.columnStatu[indexRow + '-' + Column] = styles['icon'];
    }
  }
  textstyle(Column, indexRow): string {
    let res;
    let data = this.displayData[indexRow][Column];
    let style = this.sets['tableData']['ColumnDate'][Column]['style'];
    if (style.length > 0) {
      // console.log(index+"style:" + JSON.stringify(style));
      let conditions, styles, type, icon;
      try {
        //在这里运行代码
        for (let index = 0; index < style.length; index++) {
          const element = style[index];
          conditions = element.conditions;

          styles = JSON.parse(element.styles);

          type = styles.type;
          if (type == "string") {
            let operator = conditions.split(",")[0];
            let value = conditions.split(",")[1];
            switch (operator) {
              case "==":
                res = (data == value);
                if (res) {
                  this.testIcon(styles, indexRow, Column);
                  if (typeof styles['color'] != 'undefined') {
                    return styles['color'];
                  }
                }


                break;

              default:
                break;
            }

          } else {
            res = eval(data + conditions);
            if (res) {
              this.testIcon(styles, indexRow, Column);
              if (typeof styles['color'] != 'undefined') {
                return styles['color'];
              }
            }

          }




        }
        // console.log("res:" + res + "," + typeof res);
      }
      catch (err) {
        //在这里处理错误
        // console.log("err:" + err);
        return null;
      }
    } else {
      return null;
    }


  }
}

