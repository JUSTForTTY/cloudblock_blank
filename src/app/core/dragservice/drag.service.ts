import { Injectable } from '@angular/core';
import { SettestService } from '@core/setting/settest.service';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { NzMessageService } from 'ng-zorro-antd';
import { comps, importcomps, pzcomps, rightcomps } from '../../shared/importcomps';
import { HttpService } from '@core/httpService/http.service';
@Injectable()
export class DragService {

  rightcompshtmlcode: { [key: string]: any } = {};
  show: boolean = false;
  compshtmlcode: { [key: string]: any } = {};
  sysid: any;
  isnew: boolean;
  /** 记录布局的拖动是否合法*/
  isAbleChange: boolean;
  clickIsLayout: boolean = true;
  clicktype: string = "deletelayout";

  layoutminheight = 50;


  constructor(public settestService: SettestService,
    public optionservice: HttpService,
    private message: NzMessageService) { }

  //布局数据还原
  reduction(id: number) {
    console.log("reduction-id：" + id);
    this.settestService.id = -1;
    this.settestService.layoutid = id;
    this.settestService.blockindex = 0;
    this.settestService.layoutindex = 0;
    for (let i = 0; i < this.settestService.blocksort[id].layoutdata.length; i++) {
      for (let index = 0; index < this.settestService.blocksort[id].layoutdata[i].length; index++) {
        this.sysid = this.settestService.blocksort[id].layoutdata[i][index].sysid;
        this.settestService.blocksort[this.sysid] = this.settestService.blocksort[id].layoutdata[i][index];
        this.compshtmlcode[this.settestService.blocksort[id].layoutdata[i][index].htmlcode] = comps[this.settestService.blocksort[id].layoutdata[i][index].htmlcode];
        this.rightcompshtmlcode[this.settestService.blocksort[id].layoutdata[i][index].righthtmlcode] = rightcomps[this.settestService.blocksort[id].layoutdata[i][index].righthtmlcode];
      }
    }

  }
  //拖拽事件
  onDraggedLayout(item: any, list: any[], effect: DropEffect) {
    // console.log("onDragged item:"+JSON.stringify(item) );
    // console.log("blocksort:"+JSON.stringify(this.settestService.blocksort[item.sysid]) );
    if (typeof item.blocktype != "undefined" && item.blocktype == "layout" && this.isAbleChange == true) {
      console.log("移动11");
      if (effect === "move") {
        const index = list.indexOf(item);
        list.splice(index, 1);
      }
    }

  }


  //拖拽事件
  onDragged(item: any, list: any[], effect: DropEffect) {
    if (typeof item.blocktype == "undefined" || item.blocktype != "layout") {
      if (effect === "move") {
        const index = list.indexOf(item);
        list.splice(index, 1);
        this.settestService.changeInfo(item);
      }
    }
  }
  onClick(id: number): void {
    this.clickIsLayout = false;
    console.log("onClick2:" + id);
    this.settestService.id = id;
    this.settestService.rightid = id;
  }
  onClickLayout(id: number): void {

    if (this.clickIsLayout) {
      console.log("onClick:" + id);
      this.settestService.id = id;
      this.settestService.rightid = id;
    }
    this.clickIsLayout = true;
  }

  onDrop(event: DndDropEvent, list: any[], id: string) {
    console.log("layout事件:" + id);
    this.isAbleChange = false;
    this.settestService.loadIsEnd = true;
    if (typeof event.data.blocktype == "undefined" || event.data.blocktype != "layout") {

      //通过isnew来判断是新增还是移动
      this.isnew = true;

      if (event.dropEffect === "move") {
        let index = event.index;
        if (typeof index === "undefined") {
          index = list.length;

        }
        if (typeof event.data.sysid != "undefined") {
          this.isnew = false;
        }
        this.show = true;
        if (this.isnew == false) {
          console.log("移动012:" + event.data.sysid);
          this.settestService.id = event.data.sysid;
          this.settestService.rightid = event.data.sysid;
          this.compshtmlcode[event.data.htmlcode] = comps[event.data.htmlcode];
          this.rightcompshtmlcode[event.data.righthtmlcode] = rightcomps[event.data.righthtmlcode];
          list.splice(index, 0, event.data);
          this.settestService.changeInfo(event.data, 1);

          this.settestService.blocksort[event.data.sysid] = event.data;

        } else {
          console.log("layout新增");
          //接口调用
          let url = this.getNewBlock(event.data.id);
          this.optionservice.postHttp(
            url['url'], url['bodys']).subscribe(
              (data: any) => {
                if (data['errcode'] = '0') {
                  console.log("data:" + JSON.stringify(data));
                  this.sysid = data.data[url['idName']];

                  this.compshtmlcode[event.data.htmlcode] = comps[event.data.htmlcode];
                  this.rightcompshtmlcode[event.data.righthtmlcode] = rightcomps[event.data.righthtmlcode];

                  this.settestService.id = this.sysid;
                  this.settestService.blocksort[this.sysid] = event.data;
                  this.settestService.rightid = this.sysid;

                  list.splice(index, 0, event.data);
                  list[index]['sysid'] = this.sysid;
                  if (url['type'] == 'table') {
                    this.settestService.linkInfo['table'].push({
                      "name": "数据表" + this.sysid.substr(-4),
                      "value": this.sysid
                    });
                  }
                }
                else {
                  this.message.info('接口调用失败:' + data['errcode']);
                }



              }
            );
        }
      }
    }

  }

  getNewBlock(blockId: string): {} {
    let body = {};
    let url = "", idName;
    let type = "";
    switch (blockId) {
      case "sucublock1"://表格
        body = { "cySysBlockId": blockId }
        url = "/v1/SUCU01DATA0010001/tableSettingsData";
        idName = "cySysBlockSucu01data0010001Id";
        type = "table";
        break;
      case "sucublock12"://新增按钮
        body = {
          "cySysBlockId": blockId,
          "cySysBlockSucu05button0010001BindingPage": this.settestService.pageId,
          "cySysBlockSucu05button0010001Color": "",
          "cySysBlockSucu05button0010001CreateTime": -2209158000000,
          "cySysBlockSucu05button0010001CreateUser": "1",
          "cySysBlockSucu05button0010001Name": "",
          "cySysBlockSucu05button0010001Nickname": "",
          "cySysBlockSucu05button0010001Showmode": "",
          "cySysBlockSucu05button0010001Size": "",
          "cySysBlockSucu05button0010001Targetroute": "",
          "cySysBlockSucu05button0010001Targetselector": "",
          "cySysInstanceBlockId": "1"
        };
        url = "/v1/SUCU05BUTTON0010001/buttonSettingsData";
        idName = "cySysBlockSucu05button0010001Id";
        type = "button";
        break;
      case "sucublock13"://编辑按钮
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu05button0010002BindingPage": this.settestService.pageId,
            "cySysBlockSucu05button0010002Color": "1",
            "cySysBlockSucu05button0010002CreateTime": -2209158000000,
            "cySysBlockSucu05button0010002CreateUser": "1",
            "cySysBlockSucu05button0010002Name": "1",
            "cySysBlockSucu05button0010002Nickname": "1",
            "cySysBlockSucu05button0010002Showmode": "1",
            "cySysBlockSucu05button0010002Size": "1",
            "cySysBlockSucu05button0010002Targetroute": "1",
            "cySysBlockSucu05button0010002Targetselector": "1",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU05BUTTON0010002/buttonSettingsData";
        idName = "cySysBlockSucu05button0010002Id";
        type = "button";
        break;
      case "sucublock14"://删除按钮
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu05button0010003Color": "1",
            "cySysBlockSucu05button0010003Deletetype": "1",
            "cySysBlockSucu05button0010003Id": "1",
            "cySysBlockSucu05button0010003Name": "1",
            "cySysBlockSucu05button0010003Nickname": "1",
            "cySysBlockSucu05button0010003Size": "1",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU05BUTTON0010003/buttonSettingsData";
        idName = "cySysBlockSucu05button0010003Id";
        type = "button";
        break;
      case "sucublock15"://批量删除按钮
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu05button0010004Color": "1",
            "cySysBlockSucu05button0010004Deletetype": "1",
            "cySysBlockSucu05button0010004Id": "1",
            "cySysBlockSucu05button0010004Name": "1",
            "cySysBlockSucu05button0010004Nickname": "1",
            "cySysBlockSucu05button0010004Size": "1",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU05BUTTON0010004/buttonSettingsData";
        idName = "cySysBlockSucu05button0010004Id";
        type = "button";
        break;
      case "sucublock16"://保存按钮
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu05button0010005Color": "1",
            "cySysBlockSucu05button0010005Id": "1",
            "cySysBlockSucu05button0010005Name": "1",
            "cySysBlockSucu05button0010005Nickname": "1",
            "cySysBlockSucu05button0010005Size": "1",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU05BUTTON0010005/buttonSettingsData";
        idName = "cySysBlockSucu05button0010005Id";
        type = "button";
        break;
      case "sucublock29"://查询按钮
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu05button0010009Color": "1",
            "cySysBlockSucu05button0010009Id": "1",
            "cySysBlockSucu05button0010009Name": "1",
            "cySysBlockSucu05button0010009Nickname": "1",
            "cySysBlockSucu05button0010009Size": "1",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU05BUTTON0010009/buttonSettingsData";
        idName = "cySysBlockSucu05button0010009Id";
        type = "button";
        break;
      case "sucublock21"://文本输入框
        body =
          {
            "cySysBlockId": blockId,
            "cySysBlockSucu08searchweiget0010001Color": "black",
            "cySysBlockSucu08searchweiget0010001Hint": "输入商品名称",
            "cySysBlockSucu08searchweiget0010001IsDelete": "0",
            "cySysBlockSucu08searchweiget0010001Isrequired": "0",
            "cySysBlockSucu08searchweiget0010001Name": "商品名称",
            "cySysBlockSucu08searchweiget0010001Searchtype": "=",
            "cySysBlockSucu08searchweiget0010001Textlength": "50",
            "cySysBlockSucu08searchweiget0010001Title": "商品名称",
            "cySysBlockSucu08searchweiget0010001Titlealign": "left",
            "cySysBlockSucu08searchweiget0010001Titlelength": "50",
            "cySysFieldTranslateBaseAttribute": "普通字段",
            "cySysFieldTranslateBaseId": "1",
            "cySysFieldTranslateBaseIsExistCompositeforeignkeys": "0",
            "cySysFieldTranslateBaseIsExistCompositekeys": "0",
            "cySysFieldTranslateBaseName": "商品名称",
            "cySysFieldTranslateBaseRealname": "商品名称",
            "cySysInstanceBlockId": "1"
          };
        url = "/v1/SUCU08SEARCHWEIGET0010001/inputSettingsData";
        idName = "cySysBlockSucu08searchweiget0010001Id";
        type = "form";
        break;



      default:
        break;
    }
    return {
      "bodys": body,
      "url": url,
      "idName": idName,
      "type": type
    };
  }


}
