import {
  Component, OnInit, DoCheck, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, QueryList,enableProdMode,
  ViewChildren, Directive, TemplateRef, ElementRef, Renderer2, NgModuleFactory, Compiler, Renderer
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { NzMessageService } from 'ng-zorro-antd';
import { DragService } from '@core/dragservice/drag.service';
import { pzcomps, rightcomps } from '../../../shared/importcomps';
import { layoutcomps, importlayoutcomps } from '../../../shared/layoutcomps';
import { SettestService } from '@core/setting/settest.service';
import { HttpService } from '@core/httpService/http.service';
enableProdMode();
@Component({
  selector: 'app-drag-options',
  templateUrl: './drag-options.component.html',
  styleUrls:['./drag-options.component.less']
})
export class DragOptionsComponent implements OnInit {
  isliftCollapsed:boolean=false;
  isrightCollapsed:boolean =false;
  compshtmlcode: { [key: string]: any } = {};
  sysid: any;
  isnew: boolean;
 

  constructor(private http: _HttpClient,
    private message: NzMessageService,
    public viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private elRef: ElementRef,
    public settestService: SettestService,
    public drag: DragService,
    public optionservice: HttpService
  ) {

  }
  ngDoCheck() {
    if (this.settestService.refresh) {
      this.settestService.refresh=false;
      this.reductionPage();
    }
  }
  ngOnInit(): void {
    console.log("oniiiiit5");

    this.settestService.id = -1;
    this.settestService.isAbleEdit = false;
    this.settestService.rightid=-100;
    //加载左侧布局列表
    this.optionservice.getHttp("/v1/layout").subscribe(
      (data: any) => {
        // console.log("左侧布局" + JSON.stringify(data));

        this.settestService.blockLeft = data.data;
      });
    //加载左侧积木列表
    this.optionservice.getHttp("/v1/block").subscribe(
      (data: any) => {
      //  console.log("左侧积木" + JSON.stringify(data));

        this.settestService.blockLeftBlock = data.data;
        //console.log("左侧积木2" + JSON.stringify(this.settestService.blockLeftBlock['37'][0]));
      });
    //加载左侧布局分类
    this.optionservice.getHttp("/v1/layoutCategory").subscribe(
      (data: any) => {
       // console.log("分类" + JSON.stringify(data.data));
        this.settestService.draggableListLeftCategory = data.data;
      });
    //加载左侧积木分类
    this.optionservice.getHttp("/v1/blockCategory").subscribe(
      (data: any) => {
        // console.log("积木分类"+JSON.stringify(data.data) );
        this.settestService.draggableListLeftBlockCategory = data.data;

      });
      


  }
  reductionPage() {
    //读取还原数据
  
    this.optionservice.getHttp("/v1/pageDetail/"+this.settestService.pageId).subscribe(
      (data: any) => {
        console.log("读取还原数据2:"+JSON.stringify(data.data)  );
        //console.log("cySysPageSettingsJson\n:"+data.data[0]['cySysPageSettingsJson'] );
        this.settestService.init();
        this.settestService.draggableListRight = JSON.parse(data.data[0]['cySysPageSettingsJson']) ;
        this.settestService.linkInfo=JSON.parse(data.data[0]['cySysPageInfoJson']) ;
        //console.log("draggableListRight\n:"+JSON.stringify(this.settestService.draggableListRight) );
        //console.log(this.settestService.draggableListRight);
        //还原拖动的积木
        for (let index = 0; index < this.settestService.draggableListRight.length; index++) {
          this.sysid = this.settestService.draggableListRight[index].sysid;
          this.settestService.blocksort[this.sysid] = this.settestService.draggableListRight[index];
          this.compshtmlcode[this.settestService.draggableListRight[index].htmlcode] = layoutcomps[this.settestService.draggableListRight[index].htmlcode];
          this.drag.rightcompshtmlcode[this.settestService.draggableListRight[index].righthtmlcode] = rightcomps[this.settestService.draggableListRight[index].righthtmlcode];
        }
        
        this.settestService.id = -1;
      });
  }



  onDrop(event: DndDropEvent, list?: any[], name?: any) {
    console.log("移动012");
    this.drag.isAbleChange = true;
    this.settestService.loadIsEnd=true;
    if (typeof event.data.blocktype != "undefined" && event.data.blocktype == "layout") {
      //通过isnew来判断是新增还是移动
      this.isnew = true;

      console.log(event.dropEffect);
      console.log("list:" + list);
      if (list && (event.dropEffect === "move")) {
        let index = event.index;
        if (typeof index === "undefined") {
          index = list.length;

        }
        if (typeof event.data.sysid != "undefined") {
          this.isnew = false;
          console.log("indexsysid:" + event.data.sysid);
        }

        if (this.isnew == false) {

          console.log("移动12:" + event.data.sysid);
          this.settestService.id=event.data.sysid;
          this.settestService.layoutid = event.data.sysid;
          this.settestService.rightid = event.data.sysid;
          this.compshtmlcode[event.data.htmlcode] = layoutcomps[event.data.htmlcode];
          this.drag.rightcompshtmlcode[event.data.righthtmlcode] = rightcomps[event.data.righthtmlcode];
          list.splice(index, 0, event.data);

          this.settestService.blocksort[event.data.sysid] = event.data;
        } else {
          console.log("新增");
          //接口调用
          const bodys = {
            "cySysPageId": this.settestService.pageId,
            "cySysLayoutId": event.data.id
          }
          this.optionservice.postHttp("/v1/module", bodys).subscribe(
            (data: any) => {
              console.log("data:" + JSON.stringify(data));
              this.sysid = data.data['cySysModuleId'];

              this.compshtmlcode[event.data.htmlcode] = layoutcomps[event.data.htmlcode];
              this.drag.rightcompshtmlcode[event.data.righthtmlcode] = rightcomps[event.data.righthtmlcode];
             
              event.data.layoutdata=JSON.parse(event.data.layoutdata);
              // console.log(list);
              this.settestService.id = this.sysid;
              this.settestService.rightid = this.sysid;
              this.settestService.layoutid = this.sysid;
              this.settestService.blocksort[this.sysid] = event.data;
              list.splice(index, 0, event.data);
              list[index]['sysid'] = this.sysid;
            }
          );
        }
      }
    }

  }


  onShencheng() {
    let scCode = [];
    // this.settestService.draggableListRight.forEach(element => {
    //   scCode.push(element.blockPageCode);
    // });
    // this.optionservice.getHttpNoParams("http://localhost:8080/v1/demo/buildCloudBlock/"+this.sysid).subscribe(
    //   (data=>{
    //     console.log(data);
    //     this.message.info('保存成功！');
    // }));
    console.log(this.settestService.generatedCode());
  }


}
