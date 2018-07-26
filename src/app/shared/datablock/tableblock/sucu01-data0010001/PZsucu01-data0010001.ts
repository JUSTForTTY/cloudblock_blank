import { Component, OnInit, Inject, ViewChild, DoCheck } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '@core/httpService/http.service';
import { Sucu01Data0010001Component } from './sucu01-data0010001.component';
import { SettestService } from '@core/setting/settest.service';



@Component({
  selector: 'pz-sucu01-data0010001',
  templateUrl: './Pzsucu01-data0010001.html',
  styles: [
    `
    
    [nz-button] {
      margin-top: 10px;
    }
    `
  ]
})
export class PZsucu01Data0010001 implements OnInit {
  @ViewChild('tablefields') nzTree: NzTreeComponent;
  datatable_options: FormGroup;
  demoValue = 100;
  showpanel1 = true;
  showpanel2 = false;
  formatterPx = value => `${value}px`;
  parserPx = value => value.replace('px', '');
  formatterPercent = value => `${value} %`;
  parserPercent = value => value.replace(' %', '');
  formatterTime = value => `${value} s`;
  parserTime = value => value.replace(' s', '');
  listOfTbaleOption = [];
  selectedValue = "";
  newTableColumn = [];
  newTableSearchColumn = [];
  newTableGroup = [];
  ColumnSort = 1;
  firstId;//第一次init的id
  id;
  constructor(@Inject(FormBuilder) fb: FormBuilder,
    public settestService: SettestService,
    private message: NzMessageService,
    private http: _HttpClient, private optionservice: HttpService) {
    this.datatable_options = fb.group({

      table_name: [null, Validators.required],
      table_position: [null, Validators.required],
      table_datarows: [null, Validators.required],
      // table_datarows2: [null, Validators.required],
      table_datarows3: [null, Validators.required],
      image_size: [null, Validators.required],
      numerical_format: [null, Validators.required],
      date_format: [null, Validators.required],
      table_jump: [null, Validators.required],
      table_columnNname: [null, Validators.required],
      // table_columnNname2: [null, Validators.required],
      // table_columnNname3: [null, Validators.required],
      table_selectable: [null, Validators.required],
      table_footerNname: [null, Validators.required],
      table_colunmborder: [null, Validators.required],
      table_fiexdhead: [null, Validators.required],
      table_spacing: [null, Validators.required],
      table_divspacing: [null, Validators.required],
      table_autoloading: [null, Validators.required],
      table_operatingPosition: [null, Validators.required],
      colunm_sort: [null, Validators.required],
      colunm_screen: [null, Validators.required],
      colunm_fold: [null, Validators.required],
      colunm_lock: [null, Validators.required],
      colunm_editable: [null, Validators.required],
      colunm_spacing: [null, Validators.required],
      colunm_spacing2: [null, Validators.required],
      colunm_number: [null, Validators.required],
      colunm_align: [null, Validators.required],
      colunm_calculation: [null, Validators.required],
      colunm_fontstyle: [null, Validators.required]
    });
  }


  get table_name() { return this.datatable_options.controls.table_name; }
  get table_datarows() { return this.datatable_options.controls.table_datarows; }
  get table_fields() { return this.datatable_options.controls.table_fields; }
  get date_format() { return this.datatable_options.controls.date_format; }
  ngDoCheck() {
    if (this.firstId != this.settestService.rightid) {
      console.log(":ngDoCheck: change");
      this.init();
      this.tableChange()
    }

  }
  ngOnInit(): void {
    this.init();

  }

  init() {

    this.id = this.settestService.rightid;

    this.firstId = this.settestService.rightid;
    this.initOperations();
    
    // this.addField();
    this.getBlock();
    this.selectedValue = this.settestService.blocksort[this.id].sets['tableData']['tableName'];
    console.log("pageGroupsValue-JSON:" + JSON.stringify(this.settestService.blocksort[this.id].sets['tableStyle']['pageSizeOptions']));
    this.pageGroupsValue = JSON.stringify(this.settestService.blocksort[this.id].sets['tableStyle']['pageSizeOptions']);
    //获取数据表
    this.optionservice.getHttp("/v1/system/tableExplainData").subscribe(
      (data: any) => {
        // console.log("数据表:" +JSON.stringify(data));
        this.listOfTbaleOption = data.data;
      });
  }
  changeColumnSort(event) {
    console.log("changeColumnSort:" + event);
    const index = this.newTableColumn.indexOf(this.selectfield.value);
    this.newTableColumn.splice(index, 1);
    console.log(index + ":splice:" + this.newTableColumn);
    this.newTableColumn.splice(event - 1, 0, this.selectfield.value);
    console.log(event + ":add:" + this.newTableColumn);
  }
  searchData() {
    let id = this.settestService.rightid;
    console.log(":id:" + id);
    this.settestService.blocksort[id].sets['tableData']['tableGroup'] = this.newTableGroup;
    this.settestService.blocksort[id].sets['tableData']['showColumn'] = this.newTableColumn;
    this.settestService.blocksort[id].sets['tableData']['searchColumn'] = this.newTableSearchColumn;
    this.settestService.blocksort[id].sets['tableData']['tableName'] = this.selectedValue;
    this.settestService.blocksort[id].dateSets['refresh'] = true;
  }
  onClickNext() {
    this.searchData()

  }
  tableChange() {
    let id = this.settestService.rightid;
    console.log("tableChange2:" + this.selectedValue + ",:" + this.settestService.blocksort[id].sets['tableData']['tableName']);

    let isFirstInit = false;
    if (this.selectedValue == this.settestService.blocksort[id].sets['tableData']['tableName']) {
      isFirstInit = true;
    }
    //获取数据表字段
    if (this.selectedValue != "") {
      const bodys = {
        "cySysFieldTranslateBaseRegion": this.selectedValue
      }
      this.optionservice.postHttp("/v1/system/tableFieldData", bodys).subscribe(
        (data: any) => {
          console.log(isFirstInit + ":数据表字段:\n" + JSON.stringify(data));
          this.dataSource = [];
          this.newTableColumn = [];
          this.newTableSearchColumn = [];
          this.newTableGroup = [];
          this.settestService.blocksort[id].sets['tableData']['sysFields']['primaryKeys'] = [];
          console.log("数据表字段2:" + JSON.stringify(this.settestService.blocksort[id].sets['tableData']['searchColumn']));
          data.data.forEach(element => {
            let attribute = "0";
            attribute = element.cySysFieldTranslateBaseAttribute;
            if (element.cySysFieldTranslateBaseAttribute == "1") {
              //主键
              console.log('key:' + element.cySysFieldTranslateBaseName);
              this.settestService.blocksort[id].sets['tableData']['sysFields']['primaryKeys'].push(element.cySysFieldTranslateBaseName);
            } else if (element.cySysFieldTranslateBaseAttribute == "3") {
              this.settestService.blocksort[id].sets['tableData']['sysFields']['isDelete'] = element.cySysFieldTranslateBaseName;
            }
            else {
              console.log('notkey:' + element.cySysFieldTranslateBaseName);
            }
            //   coldataarr.push(element.Field);
            let type = "text", format = "", footer = "", alignType = "left", width = "100px", state = [], searchType = "like";
            let eyeshow = true, checked = true, isSort = false, isFilter = false, isEdit = false;
            let style=[];
            if (isFirstInit) {
              let index = this.settestService.blocksort[id].sets['tableData']['searchColumn'].indexOf(element.cySysFieldTranslateBaseName);
              console.log(element.cySysFieldTranslateBaseName + '数据表字段3:' + index)
              if (index < 0) checked = false;
              index = this.settestService.blocksort[id].sets['tableData']['showColumn'].indexOf(element.cySysFieldTranslateBaseName);
              if (index < 0) eyeshow = false;
              //isSort=true,isFilter=true;
              isSort = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['isSort'];
              isEdit = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['isEdit'];
              isFilter = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['isFilter'];
              type = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['type'];
              format = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['format'];
              footer = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['footer'];
              alignType = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['alignType'];
              searchType = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['searchType'];
              width = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['width'];
              state = this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['state'];
              style=this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName]['style'];
            }
            let item =
            {
              id: element.cySysFieldTranslateBaseId,
              label: element.cySysFieldTranslateBaseRelname,
              value: element.cySysFieldTranslateBaseName,
              checked: checked,
              eyeshow: eyeshow
            }
            this.dataSource.push(item);
            this.settestService.blocksort[id].sets['tableData']['ColumnDate'][element.cySysFieldTranslateBaseName] = {
              "Relname": element.cySysFieldTranslateBaseRelname,
              "type": type,
              "attribute": attribute,
              "format": format,
              "footer": footer,
              "alignType": alignType,
              "width": width,
              "state": state,
              "style":style,
              "isSearch": true,
              "searchType": searchType,
              "isShow": true,
              "isEdit": isEdit,
              "isSort": isSort,
              "isFilter": isFilter
            }

            this.newTableColumn.push(element.cySysFieldTranslateBaseName);
            this.newTableSearchColumn.push(element.cySysFieldTranslateBaseName);
          });

          this.settestService.blocksort[id].sets['tableData']['tableName'] = this.selectedValue;
          if (!isFirstInit) {
            this.settestService.blocksort[id].dateSets['type'] = 1;
            this.settestService.blocksort[id].dateSets['refresh'] = true;
            this.settestService.blocksort[id].sets['tableData']['showColumn'] = this.newTableColumn;
            this.settestService.blocksort[id].sets['tableData']['searchColumn'] = this.newTableSearchColumn;
            this.settestService.blocksort[id].sets['tableData']['tableGroup'] = this.newTableGroup;

          } else {
            console.log('isFirstInit:' + isFirstInit);
            this.newTableColumn = this.settestService.blocksort[id].sets['tableData']['showColumn'];
            this.settestService.blocksort[id].sets['tableData']['showColumn'] = this.newTableColumn;

            this.newTableSearchColumn = this.settestService.blocksort[id].sets['tableData']['searchColumn'];
            this.settestService.blocksort[id].sets['tableData']['searchColumn'] = this.newTableSearchColumn;

            this.newTableGroup = this.settestService.blocksort[id].sets['tableData']['tableGroup'];
            this.settestService.blocksort[id].sets['tableData']['tableGroup'] = this.newTableGroup;
            console.log('isFirstInit:' + JSON.stringify(this.newTableGroup));
            // this.settestService.blocksort[id].sets['tableData']['showColumn'] = this.newTableColumn;
          }

        });
    }

  }



  dataSource = [
  ];
  selectfield;
  //vantercTree===
  eyeClick(event) {
    if (event.eyeshow) {
      this.newTableColumn.push(event.value);
    } else {
      console.log("pop");
      const index = this.newTableColumn.indexOf(event.value);
      this.newTableColumn.splice(index, 1);
    }
  }
  itemchecked(event) {
    console.log("itemchecked:" + JSON.stringify(event));
    if (event.checked == true) {
      console.log("push");
      this.newTableSearchColumn.push(event.value);
      this.newTableColumn.push(event.value);
      this.dataSource[event.index].eyeshow = true;
    } else {
      console.log("pop");
      const index = this.newTableSearchColumn.indexOf(event.value);
      this.newTableSearchColumn.splice(index, 1);
      const index2 = this.newTableColumn.indexOf(event.value);
      console.log("pop" + index2);
      if (index2 >= 0) {
        this.newTableColumn.splice(index2, 1);
        this.dataSource[event.index].eyeshow = false;
      }
    }


  }
  editclick(event) {
    if (event.checked) {
      console.log("editclick:" + JSON.stringify(event));
      this.selectfield = event;
      this.initcustomStyle();
      this.ColumnSort = this.newTableColumn.indexOf(this.selectfield.value) + 1;
      this.showpanel1 = !this.showpanel1;
      this.showpanel2 = !this.showpanel2;
    }

  }
  panel2save() {
    this.showpanel1 = !this.showpanel1;
    this.showpanel2 = !this.showpanel2;
  }
  footerValue = '';
  footerOptions = [
    { label: '无', value: '' },
    { label: '求和', value: 'sum' },
    { label: '计数', value: 'count' },
    { label: '平均数', value: 'avg' },
    { label: '最小', value: 'min' },
    { label: '最大', value: 'max' }
  ];

  //--样式
  //----分页设置

  //----分页组条数
  pageGroupsValue = '';
  pageGroups = [
    "[5,10,15,20,25,30]",
    "[8,16,32,50,80]",
    "[10,20,30,50,100]",
    "[20,40,60,80,100]"
  ]
  pageGroupsChange() {
    let id = this.settestService.rightid;
    console.log("分页组2:" + this.pageGroupsValue + "==" + this.settestService.blocksort[this.settestService.rightid].sets['tableStyle']['pageSizeOptions']);
    if (typeof this.pageGroupsValue != "undefined" && this.pageGroupsValue != "" &&
      this.pageGroupsValue != JSON.stringify(this.settestService.blocksort[this.settestService.rightid].sets['tableStyle']['pageSizeOptions'])) {
      console.log("分页组变更");
      this.settestService.blocksort[this.settestService.rightid].sets['tableStyle']['pageSizeOptions'] = JSON.parse(this.pageGroupsValue);
      this.settestService.blocksort[this.settestService.rightid].sets['tableStyle']['nzPageSize'] = JSON.parse(this.pageGroupsValue)[0];
      this.settestService.blocksort[this.settestService.rightid].dateSets['refresh'] = true;
    }
  }
  //----分页跳转
  //----可选框
  //----列边框
  //----间距
  //----定时刷新
  setTimer() {
    this.settestService.blocksort[this.settestService.rightid].sets['tableStyle']['timer']['refresh'] = true;
  }

  switchSetValue(key, event, log) {
    if (event == true || event == false || event == "false" || event == "true") {
      console.log(log + JSON.stringify(event));
      this.setvalue(key, event)
    }
  }
  autoSetValue(key, event, log) {
    if (typeof event != "undefined" && event != "") {
      console.log(log + JSON.stringify(event));
      this.setvalue(key, event)
    }
  }
  setvalue(key, event) {
    this.settestService.blocksort[this.settestService.rightid].sets['tableStyle'][key] = event;
  }
  //--字段
  imageSize = 'A';
  typeGroups = [
    {
      "key": "文本",
      "value": "text"
    },
    {
      "key": "数值",
      "value": "numerical"
    },
    {
      "key": "图片",
      "value": "image"
    },
    {
      "key": "日期",
      "value": "date"
    },

    "[20,40,60,80,100]"
  ]
  changeType(event) {
    if (event == "image") {
      this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['format'] = 'small';
    }
    else {
      this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['format'] = '';
    }

  }
  //日期格式
  dateFormat;
  // this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][selectfield.value]['format']


  //筛选
  changeColumnFilter(event) {
    console.log("JSON1" + JSON.stringify(this.newTableGroup));
    if (event) {
      this.newTableGroup.push(this.selectfield.value);
    } else {
      const index = this.newTableGroup.indexOf(this.selectfield.value);
      if (index >= 0)
        this.newTableGroup.splice(index, 1);
    }
    console.log("JSON2" + JSON.stringify(this.newTableGroup));
  }
  //自定义条件
  // customStyle: Array<{
  //   id: number,
  //   name:string,
  //   controlInstance: {},
  //   column: string,
  //   conditions: string,
  //   styles: string,
  //   active: boolean,
  //   disabled: boolean
  // }> = [];
  initcustomStyle() {
    this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'].forEach(element => {
      for (const key in element.controlInstance) {
        if (element.controlInstance.hasOwnProperty(key)) {
          const fromName = element.controlInstance[key];
          this.datatable_options.addControl(fromName, new FormControl(null, Validators.required));
        }
      }
    });
  }
  addStyle(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'].length > 0) ? this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'][this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'].length - 1].id + 1 : 0;

    const control = {
      id: id,
      name: `样式${id+1}`,
      controlInstance: {
        conditions: `table_conditions${id}`,
        styles: `table_styles${id}`
      },
      conditions: "",
      styles: "",
      active: true,
      disabled: false
    };
    const index = this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'].push(control);
    for (const key in this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'][index - 1].controlInstance) {
      if (this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'][index - 1].controlInstance.hasOwnProperty(key)) {
        const element = this.settestService.blocksort[this.id].sets['tableData']['ColumnDate'][this.selectfield.value]['style'][index - 1].controlInstance[key];
        this.datatable_options.addControl(element, new FormControl(null, Validators.required));
      }
    }
  }
  //操作组
  operationsArray = [];//操作组数组
  panels: Array<{
    id: number, controlInstance: {}, type: string, color: string,
    name: string, page: string, active: boolean, disabled: boolean
  }> = [];
  getBlock() {
    this.optionservice.getHttp("/v1/block/39").subscribe(
      (data: any) => {
        // console.log("数据表:" +JSON.stringify(data));
        this.operationsArray = data.data;
      });
  }
  initOperations() {
    this.panels = this.settestService.blocksort[this.id].sets['tableStyle']['operationsGroup'];
    this.panels.forEach(element => {
      for (const key in element.controlInstance) {
        if (element.controlInstance.hasOwnProperty(key)) {
          const fromName = element.controlInstance[key];
          this.datatable_options.addControl(fromName, new FormControl(null, Validators.required));
        }
      }
    });
  }
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.panels.length > 0) ? this.panels[this.panels.length - 1].id + 1 : 0;

    const control = {
      id: id,
      controlInstance: {
        name: `table_operations_name${id}`,
        type: `table_operations_type${id}`,
        page: `table_operations_page${id}`,
        color: `table_operations_color${id}`
      },
      type: '删除',
      color: '#FF0000',
      name: "自定义操作组" + (id + 1),
      page: this.settestService.builtiInDataSource[1]['children'].length > 0 ? this.settestService.builtiInDataSource[1]['children'][0].label : '',
      active: true,
      disabled: false
    };
    const index = this.panels.push(control);
    console.log(this.panels[this.panels.length - 1]);
    for (const key in this.panels[index - 1].controlInstance) {
      if (this.panels[index - 1].controlInstance.hasOwnProperty(key)) {
        const element = this.panels[index - 1].controlInstance[key];
        this.datatable_options.addControl(element, new FormControl(null, Validators.required));
      }
    }
  }

  removeField(i: { id: number, controlInstance: {}, type: string, color: string, name: string, page: string, active: boolean, disabled: boolean }, e: MouseEvent): void {
    e.preventDefault();
    if (this.panels.length > 1) {
      const index = this.panels.indexOf(i);
      this.panels.splice(index, 1);
      console.log(this.panels);
      for (const key in i.controlInstance) {
        if (i.controlInstance.hasOwnProperty(key)) {
          const element = i.controlInstance[key];
          this.datatable_options.removeControl(element);
        }
      }
    }
  }
}