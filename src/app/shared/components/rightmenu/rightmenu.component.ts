import { Component, OnInit, Inject, ElementRef, Renderer2, EventEmitter, ViewChild, ContentChild, QueryList } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@core/httpService/http.service';
import { SettestService } from '@core/setting/settest.service';
@Component({
    selector: 'app-rightmenu',
    templateUrl: './rightmenu.component.html',
    styleUrls: ['./rightmenu.component.less']
})
export class RightmenuComponent implements OnInit {
    @ContentChild("nztree") nztree: EventEmitter<any>;
    showindex = true;
    showcreatemenu = false;
    showcreatepage = false;




    pageMenu: FormGroup;
    demoValue = 1;
    releasebtntext = "发布";
    constructor(
        @Inject(FormBuilder) fb: FormBuilder,
        private http: _HttpClient,
        private renderer: Renderer2,
        public optionservice: HttpService,
        public settestService: SettestService
    ) {
        this.pageMenu = fb.group({
            page_name_meun: [null, Validators.required],
            auto_page: [null, Validators.required],
            parent_page: [null, Validators.required],
            menu_name: [null, Validators.required],
            menu_icon: [null],
            menu_sort: [null, Validators.required],
            page_name: [null, Validators.required],
            parent_menu: [null, Validators.required],
            page_type: [null, Validators.required],
            page_modalwidth: [null, Validators.required],
            index_tree: [null, Validators.required],
        })
    }
    get menu_icon() { return this.pageMenu.controls.menu_icon; }
    get page_name_meun() { return this.pageMenu.controls.page_name_meun; }
    get page_name() { return this.pageMenu.controls.page_name; }

    get table_name() { return this.pageMenu.controls.menu_name; }
    setPage(type, index) {
        this.builtiInDataSource[index]['children'] = [];
        this.optionservice.getHttp("/v1/page/" + type).subscribe(
            (data: any) => {
               // console.log((type == 1 ? "内置" : "弹框") + ":" + JSON.stringify(data.data));
                data.data.forEach(element => {
                    let dataItem = {
                        label: element['cySysPageName'],
                        cySysPageName: element['cySysPageName'],
                        cySysPageRoutePath:element['cySysPageRoutePath'],
                        value: element['cySysPageId'],
                        disabled: false,
                        state: element['cySysPageStatus'],
                        checked: false,
                        isLeaf: true,
                        icon: "",
                        showoptionbtn: false,
                        pageType: element['cySysPageType']
                    };
                    this.builtiInDataSource[index]['children'].push(dataItem);
                });
            });
    }
    ngOnInit() {
        window.setTimeout(() => {
            this.getMenu();
            //查询内置页面
            this.setPage(1, 0)
            //弹框页面
            this.setPage(2, 1)
            //菜单页面
            this.getPages();
            this.settestService.builtiInDataSource=this.builtiInDataSource;
            
          }, 200);
        
    }
    getMenu() {
        //查询菜单
        this.optionservice.getHttp("/v1/menuview").subscribe(
            (data: any) => {
              //  console.log("菜单：" + JSON.stringify(data.data));
                this.dataSource = data.data;
            });
    }
    createPage() {
        this.isEditPage = false;
        this.showindex = false;
        this.showcreatemenu = false;
        this.showcreatepage = true;
    }
    //新增页面
    pageType = '1';
    pageNamePage="";
    isEditPage = false;
    selectPageId;
    pageReturn(type) {
        if (type == 'submit') {
            const bodys = {
                "cySysPageHtmlCode": "",
                "cySysPageHtmlDropCode": "拖拽代码",
                "cySysPageHtmlTsCode": "ts代码",
                "cySysPageName": this.pageNamePage,
                "cySysPageSettingsJson": "[]",
                "cySysPageSort": 1,
                "cySysPageStatus": 0,
                "cySysPageType": this.pageType
            }
            this.optionservice.postHttp("/v1/page", bodys).subscribe(
                (data: any) => {
                    //console.log("创建页面:" + JSON.stringify(data.data));
                    this.setPage(this.pageType, this.pageType == '1' ? 0 : 1);
                    this.pageNamePage = "";
                    this.pageType = '1';
                });
        } else if (type == 'edit') {
            this.optionservice.getHttp("/v1/pageDetail/" + this.selectPageId).subscribe(
                (data: any) => {
                    let page = data.data[0];
                    page['cySysPageName'] = this.pageNamePage;
                    page['cySysPageType'] = this.pageType;

                    this.optionservice.putHttp("/v1/page", page).subscribe(
                        (data: any) => {
                            this.setPage(1, 0)
                            this.setPage(2, 1)
                            this.pageNamePage = "";
                            this.pageType = '1';
                        });
                });
        }

        this.showindex = true;
        this.showcreatemenu = false;
        this.showcreatepage = false;
    }
    disablePageSubmit=true;
    checkPage(){
        if(this.pageNamePage!="") this.disablePageSubmit=false;
        else this.disablePageSubmit=true;
    }
    //编辑页面
    editPage(event) {
        this.pageNamePage = event.label;
        this.pageType = event.pageType;
        this.selectPageId = event.value;
        this.isEditPage = true;
        this.showindex = false;
        this.showcreatemenu = false;
        this.showcreatepage = true;
    }
    //删除页面
    deletePage(event) {
        this.optionservice.getHttp("/v1/pageDetail/" + event.value).subscribe(
            (data: any) => {
               // console.log("页面" + event.value + ":" + JSON.stringify(data.data));
                let page = data.data[0];
                page['cySysPageIsDelete'] = 1;
                this.optionservice.putHttp("/v1/page", page).subscribe(
                    (data: any) => {
                        this.setPage(page['cySysPageType'], page['cySysPageType'] == '1' ? 0 : 1);
                        this.pageNamePage = "";
                        this.pageType = '1';
                        this.settestService.clearRight( event.value);
                        this.handleEnd();
                    });
            });
    }
    vcCheckable = true;
    release() {
        this.vcCheckable = false;
        this.releasebtntext = "确认发布"
    }


    
    //内置页面，弹框页面点击
    pageClick(page) {
        this.settestService.pageId = page.value;
        this.settestService.page = page;
        this.settestService.refresh = true;
    }
    //上方菜单点击
    menuClick(page) {
        if (typeof page['pageid'] != 'undefined' && page['pageid'] != "") {
            this.settestService.pageId = page.pageid;
            this.settestService.page = page;
            this.settestService.page['pageType'] = 0;
            this.settestService.refresh = true;
        }
    }
    fatherClick(item) {
        if (item['children'].length == 0) {
            this.settestService.pageId = item.pageid;
            this.settestService.page = item;
            this.settestService.page['pageType'] = 0;
            this.settestService.refresh = true;
        }
    }
    //菜单编辑
    isEditMenu = false;
    isEditClick = false;
    selectMenuId = '';
    editClick(event) {
        //
        console.log("菜单编辑:" + JSON.stringify(event));
        this.selectMenuId = event.value;
        this.readMenu(event);
        this.showindex = false;
        this.showcreatemenu = true;
        this.showcreatepage = false;
    }
    //---对话框
    deleteType = '';
    deleteEvent;
    isVisible = false;
    isOkLoading = false;

    handleOk(): void {
        this.isOkLoading = true;
        if (this.deleteType == "menu")
            this.deleteMenu(this.deleteEvent)
        else
            this.deletePage(this.deleteEvent);
    }
    handleEnd(){
        window.setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 100);
    }
    handleCancel(): void {
        this.isVisible = false;
    }
    //----对话框end

    //删除按钮
    deleteClick(event,type) {
        this.deleteType = type
        this.isVisible = true;
        this.deleteEvent=event;
    }
    //删除菜单
    deleteMenu(event) {
        let meuns = [];
        let ids=[];
        console.log('deleteMenu:'+JSON.stringify(event));
        ids.push(event.pageid);
        meuns.push({
            "cySysMenuId": event.value,
            "cySysMenuIsDelete": "1"
        });
        
        event['children'].forEach(element => {
            meuns.push({
                "cySysMenuId": element.value,
                "cySysMenuIsDelete": "1"
            });
            ids.push(element.pageid);
        });
        console.log("删除IDS:" + ids);
        this.optionservice.putHttp("/v1/menuDelete", meuns).subscribe(
            (data: any) => {
               // console.log("删除菜单:" + JSON.stringify(data));
                ids.forEach(element => {
                    console.log("element:" + element);
                    this.settestService.clearRight( element);
                });
                this.getMenu();
                this.handleEnd();

            });
    }
    dataSource = [];
    builtiInDataSource = [
        {
            label: '内置页面',
            value: '6666',
            disabled: false,
            state: '0',
            checked: false,
            isExpanded: true,
            icon: "qq",
            showoptionbtn: false,
            lock: true,
            children: []
        },
        {
            label: '弹框页面',
            value: '9999',
            disabled: false,
            state: '0',
            checked: false,
            isExpanded: true,
            icon: "qq",
            lock: true,
            showoptionbtn: false,
            children: []
        }
    ];


    //创建菜单
    autoPage = true;
    selectPageIndex;
    selectPage;//选中的页面
    pageDataSource;
    menuSort = 2;
    menuName = "";
    menuIcon = "";
    pageName = "";
    selectedFarther = '-1';
    selectMeun = this.dataSource;
    disableSubmit = true;
    initCreatMenu() {
        this.menuName = "";
        this.pageName = "";
        this.selectedFarther = "-1";
        this.selectPageIndex = this.pageDataSource[0]['cySysPageId'];
        this.disableSubmit = true;
        this.autoPage = true;
        this.selectMeun = this.dataSource;
        this.menuSort = 1;
        this.menuIcon = "";
        this.isEditMenu = false;
        this.isEditClick = false;
    }
    readMenu(menu) {

        this.menuName = menu['label'];
        this.pageName = menu['cySysPageName'];//暂无
        this.selectedFarther = "" + menu['fatherId'];
        this.selectPageIndex = menu['pageid'];
        this.disableSubmit = false;
        this.autoPage = false;
        console.log("menuChange:fatherId:" + this.selectedFarther);
        if (this.selectedFarther == "-1") {
            console.log("menuChange:fatherId-1:" + this.selectedFarther);
            this.selectMeun = this.dataSource;

        } else {
            console.log("selectedFarther:" + this.selectedFarther);
            this.selectMeun = this.dataSource[this.selectedFarther]['children'];
        }
        this.menuSort = menu['cySysMenuSort'];
        this.menuIcon = menu['icon'];
        this.isEditMenu = true;
        this.isEditClick = true;
        // console.log("updateMenu:" + this.menuSort);
        // console.log("updateMenu:" + menu['cySysPageName']);
    }
    getPages() {
        this.optionservice.getHttp("/v1/page/0").subscribe(
            (data: any) => {
                // console.log("页面0" + ":" + JSON.stringify(data.data));
                this.pageDataSource = data.data;
            });
    }
    menuChange(event) {
        if (event == "-1") {
            console.log(this.selectedFarther + ",menuChange:无" + event);
            this.selectMeun = this.dataSource;
            if (!this.isEditClick)
                this.menuSort = 1;
            else this.isEditClick = false;
        } else {
            console.log(this.selectedFarther + ",menuChange:" + event);
            this.selectMeun = this.dataSource[event]['children'];
            if (!this.isEditClick)
                this.menuSort = 1;
            else this.isEditClick = false;
        }

    }
    checkMeun(type?) {
        if (type == "1") {
            console.log("checkMeun:");
            this.pageName = this.menuName
        }
        if (this.menuName != "") {
            console.log("checkMeun:" + this.autoPage + ":" + (this.autoPage && this.pageName == ""));
            if (this.autoPage && this.pageName == "") {
                this.disableSubmit = true;
            } else {
                this.disableSubmit = false;
            }
        } else {
            this.disableSubmit = true;
        }

    }
    menuReturn(type) {
        console.log(type)
        if (type == "submit") {
            if (this.autoPage) {
                //创建页面
                const bodys = {
                    "cySysPageHtmlCode": "",
                    "cySysPageHtmlDropCode": "拖拽代码",
                    "cySysPageHtmlTsCode": "ts代码",
                    "cySysPageName": this.pageName,
                    "cySysPageSettingsJson": "[]",
                    "cySysPageSort": 1,
                    "cySysPageStatus": 0,
                    "cySysPageType": 0,
                }
                this.optionservice.postHttp("/v1/page", bodys).subscribe(
                    (data: any) => {
                        console.log("创建页面:" + JSON.stringify(data.data));
                        this.selectPage = data.data[0];
                        this.getPages();
                        this.insertMenu();
                    });

            } else {
                this.selectPage = this.pageDataSource[this.getPageIndex(this.selectPageIndex)];
                this.insertMenu();
            }
        }
        else if (type == "edit") {
            this.selectPage = this.pageDataSource[this.getPageIndex(this.selectPageIndex)];
            this.updateMenu();
        }

        this.showindex = true;
        this.showcreatemenu = false;
        this.showcreatepage = false;
    }
    getPageIndex(pageId): number {
        let index = 0;
        let isBraek = false;
        console.log("getPageIndex:" + JSON.stringify(this.pageDataSource));
        for (let index = 0; index < this.pageDataSource.length; index++) {
            const element = this.pageDataSource[index];
            if (element['cySysPageId'] + "" == pageId + "") {
                console.log('return=============');
                return index;
            }
        }
        console.log("index:" + index);
        return index;
    }
    updateMenu() {
        const bodys = {
            "cySysMenuId": this.selectMenuId,
            "cySysMenuName": this.menuName,
            "cySysMenuParentId": this.selectedFarther == '-1' ? '-1' : this.dataSource[this.selectedFarther]['value'],
            "cySysPageId": this.selectPage['cySysPageId'],
            "cySysMenuIsEnd": "0",
            "cySysMenuIsOutlink": "0",
            "cySysMenuSrc": this.selectPage['cySysPageRoutePath'],
            "cySysMenuIsNeedMark": "",
            "cySysMenuMeno": "",
            "cySysMenuWorkflowNoticeBlockId": "",
            "cySysWorkflowId": "",
            "cySysMenuIcon": this.menu_icon.value,
            "cySysMenuSort": this.menuSort
        }

        this.optionservice.putHttp("/v1/menu", bodys).subscribe(
            (data: any) => {
                // console.log("创建菜单" + ":" + JSON.stringify(data));
                this.getMenu();
                this.initCreatMenu();
            });
    }
    insertMenu() {
        const bodys = {
            "cySysMenuName": this.menuName,
            "cySysMenuParentId": this.selectedFarther == '-1' ? '-1' : this.dataSource[this.selectedFarther]['value'],
            "cySysPageId": this.selectPage['cySysPageId'],
            "cySysMenuIsEnd": "0",
            "cySysMenuIsOutlink": "0",
            "cySysMenuSrc": this.selectPage['cySysPageRoutePath'],
            "cySysMenuIsNeedMark": "",
            "cySysMenuMeno": "",
            "cySysMenuWorkflowNoticeBlockId": "",
            "cySysWorkflowId": "",
            "cySysMenuIcon": this.menu_icon.value,
            "cySysMenuSort": this.menuSort
        }
        this.optionservice.postHttp("/v1/menu", bodys).subscribe(
            (data: any) => {
                // console.log("创建菜单" + ":" + JSON.stringify(data));
                this.getMenu();
                this.initCreatMenu();
            });
    }
    createMenu() {
        this.initCreatMenu();
        this.showindex = false;
        this.showcreatemenu = true;
        this.showcreatepage = false;
    }

}
