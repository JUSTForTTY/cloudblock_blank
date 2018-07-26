import { Injectable } from '@angular/core';
import { HttpService } from '@core/httpService/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService} from '@delon/theme';
import { CacheService } from '@delon/cache';

@Injectable()
export class SettestService {
  constructor(
    public optionservice: HttpService,
    private message: NzMessageService,
    private settingService: SettingsService,
    private cacheService: CacheService,
  ) { }
  id: any = 0;
  get ip() { return this.cacheService.getNone("domain"); }
  rightid: any = -100;
  layoutid: any = 0;
  layoutindex: number = 0;
  blockindex: number = 0;
  index: number = 0;
  isAbleEdit = false;
  refresh = false;
  loadIsEnd = false;
  pageId = "";
  page = {};
  sets: string[] = ["large", "small", "default"];
  //页面
  builtiInDataSource;
  init() {
    this.loadIsEnd = false;
    this.id = 0;
    this.rightid = -100;
    this.layoutid = 0;
    this.layoutindex = 0;
    this.blockindex = 0;
    this.index = 0;
    this.isAbleEdit = true;
  }
  blocksort: { [key: string]: any } = {
    "-2": {
      "content": "轻量表格",
      "sets": {
        "nzSize": "large",
        "pageSizeOptions": [10, 20, 30, 40, 60],
        "loading": true,
        "displayData": [],
        "columnData": []
      }
    },
    "-3": {
      "content": "按钮一",
      "sets": { "nzSize": "large" },
    }

  };

  //模拟数据
  draggableListLeftCategory = [];
  draggableListLeftBlockCategory = [];
  blockLeft: { [key: string]: any } = {

  };
  blockLeftBlock: {
    [key: string]: any  } = {};
  draggableListRight = [];
  linkInfo:{[key: string]: any  } = {"table":[]};



  generatedCode(): string {
    //遍历页面上的每一行布局
    let htmlcodes = "";
    for (let i = 0; i < this.draggableListRight.length; i++) {
      const layoutdata = this.draggableListRight[i].layoutdata;
      let layoutCodes = this.draggableListRight[i].blockPageCode;//一行布局的代码
      //遍历布局里的每一块小布局
      for (let j = 0; j < layoutdata.length; j++) {
        const layout = layoutdata[j];
        let blockCodes = "";//每小块布局的代码
        //遍历每一块里的积木
        for (let k = 0; k < layout.length; k++) {
          const block = layout[k];
          let blockSets = "";
          // //遍历每一个积木的属性
          // for (const key in block.sets) {
          //   if (block.sets.hasOwnProperty(key)) {
          //     const element = block.sets[key];
          //     blockSets=blockSets+key+"='"+element+"' ";
          //     console.log("key:"+key+" , value:"+element);
          //   }
          // }
          blockSets = " sets='" + JSON.stringify(block.sets) + "' static='true'";
          blockCodes = blockCodes + block.blockPageCode.replace("@attribute", blockSets) + "\n";
          // console.log("blockCodes:" + blockCodes);
        }
        layoutCodes = layoutCodes.replace("replace" + j, blockCodes);
      }
      htmlcodes = htmlcodes + layoutCodes
    }
    return htmlcodes;
  }
  getlayoutid(defaultid?: any): any {
    //不是初次加载,返回布局id
    // if (!this.isfirst) {
    //   console.log('notfirst:'+this.layoutid)
    //   return this.layoutid;
    // }
    //初次加载
    console.log(this.id + '-first:' + this.layoutid)
    if (this.id == -1) return this.getfirstset();
    else if (this.id == 0) return defaultid;
    else return this.layoutid;
  }
  getblockid(defaultid?: any): any {
   // console.log(this.id + '-getblockid:')
    if (this.id == -1) return this.getlayoutset(defaultid);
    else if (this.id == 0) return defaultid;
    else return this.id;
  }

  getfirstset(): number {
    let this_Id;
    this_Id = this.draggableListRight[this.index].sysid;
    this.id = this_Id;
    this.index = this.index + 1;
    if (this.index < this.draggableListRight.length) {
      this.id = -1;
    }
    return this_Id;
  }
  getlayoutset(defaultid?: string): any {
    let this_Id;
    //过空布局
    for (let index = this.layoutindex; index < this.blocksort[this.layoutid].layoutdata.length; index++) {
      if (this.blockindex >= this.blocksort[this.layoutid].layoutdata[this.layoutindex].length) {
        this.layoutindex = this.layoutindex + 1;
        this.blockindex = 0;
      } else {
        break;
      }
    }

    if (typeof this.blocksort[this.layoutid].layoutdata[this.layoutindex] == "undefined") {
      // console.log("undefined");
      this.blockindex = 0;
      this.layoutindex = 0;
      this_Id = defaultid;
    } else {
      // console.log("this_Id" + this.layoutindex + "," + this.blockindex);
      //console.log("this_Idblocksort" + JSON.stringify(this.blocksort));
      // console.log("this_Idblocksort2" + JSON.stringify(this.blocksort[this.layoutid].layoutdata[this.layoutindex]));

      this_Id = this.blocksort[this.layoutid].layoutdata[this.layoutindex][this.blockindex].sysid;
      //console.log("getlayoutset:" + this_Id);
      this.id = this_Id;
      //后续设置
      this.blockindex = this.blockindex + 1;
      if (this.blockindex >= this.blocksort[this.layoutid].layoutdata[this.layoutindex].length) {
        this.blockindex = 0;
        if (this.layoutindex + 1 < this.blocksort[this.layoutid].layoutdata.length) {
          this.layoutindex = this.layoutindex + 1;
        }
      }
    }

    this.id = -1;
    console.log("endgetlayoutset:" + this.layoutid);
    return this_Id;

  }
  //保存大数组
  savePage() {
    if (this.pageId != '') {
      let code = this.generatedCode();
      console.log("页面代码:" + code);
      let bodys = {
        "cySysPageId": this.pageId,
        "cySysPageHtmlCode": code,
        "cySysPageHtmlDropCode": "拖拽代码2",
        "cySysPageHtmlTsCode": "ts代码",
        "cySysPageName": this.page['cySysPageName'],
        "cySysPageSettingsJson": JSON.stringify(this.draggableListRight),
        "cySysPageInfoJson":JSON.stringify(this.linkInfo),
        "cySysPageSort": 1,
        "cySysPageIsDelete": "0",
        "cySysPageStatus": this.page['state'],
        "cySysPageType": this.page['pageType']
      };
      this.optionservice.putHttp("/v1/page", bodys).subscribe(
        (data: any) => {
          console.log("保存大数组2:" + JSON.stringify(data))
        });
    }

  }
  //删除时情况大数组
  clearRight(pageid) {
    console.log("pageid:" + pageid + "," + this.pageId)
    if (pageid == this.pageId) {
      this.pageId = '';
      this.draggableListRight = [];
      this.isAbleEdit = false;
    }
  }
  //生成页面
  isOk = false;
  onShencheng() {
    
    console.log("ip:" + this.ip);
    if (this.ip != null) {
      this.isOk = true;
      console.log("url:" + "http://" + this.ip + "/v1/demo/buildCloudBlock/" + this.pageId);
      
      this.optionservice.getHttp("/v1/demo/buildCloudBlock/" + this.pageId).subscribe(
        (data: any) => {
          console.log("生成页面:" + JSON.stringify(data))
          this.isOk = false;
          if (data.errcode = "0") this.message.info('生成成功');
          else this.message.info('失败：' + JSON.stringify(data));
        });
      window.setTimeout(() => {
        if (this.isOk){
          this.isOk = false;
          this.message.info('接口调用失败');
        }
      }, 10000);
    } else {
      this.message.info('请重新登录');
    }

  }
  /**
   * 拖动时变更信息数组
   * @param data 信息数组
   * @param type 增减类型 0-减 1-增
   */
  changeInfo(data, type = 0, layoutid?) {
    console.log(type + "-changeInfo:" + JSON.stringify(data['sets']));
    let blockType = data['sets']['blockType'];
    let blockId = data['sets']['blockId'];
    switch (blockType) {
      case 'table':
        let item = {
          "name": "数据表" + blockId.substr(-4),
          "value": blockId
        };
        if (type == 1) {
          this.linkInfo['table'].push(item);
        }
        else {
          for (let index = 0; index < this.linkInfo['table'].length; index++) {
            const element = this.linkInfo['table'][index];
            if (element['value'] == blockId) {
              this.linkInfo['table'].splice(index, 1);
              break;
            }
          }
        }
        break;
      case 'layout':
        
        break;

      default:
        break;
    }

  }

}
