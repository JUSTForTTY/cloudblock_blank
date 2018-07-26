import { Router } from '@angular/router';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { CacheService } from '@delon/cache';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private cacheService:CacheService,
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector) { }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get('assets/json/baseoptions.json')
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            })
        ).subscribe(([appData]) => {

            // // application data
            // const res: any = appData;
            // // 应用信息：包括站点名、描述、年份
            // this.settingService.setApp(res.app);
            // // 用户信息：包括姓名、头像、邮箱地址
            // this.settingService.setUser(res.user);
            // // ACL：设置权限为全量
            // this.aclService.setFull(true);
            // // 初始化菜单
            // this.menuService.add([
            //     {
            //         text: '首页测试',
            //         group: true,
            //         children:res.data
            //     }]);
            // 设置页面标题的后缀
            
            this.titleService.suffix = appData.titleSuffix;
        },
        () => { },
        () => {
            resolve(null);
        });
    }

    private viaMock(resolve: any, reject: any) {
        
        // const tokenData = this.tokenService.get();
        // console.log(tokenData.token);
        // if (!tokenData.token) {
        //     this.injector.get(Router).navigateByUrl('/login');
        //     resolve({});
        //     return;
        // }
        
        
       


        const app: any = {
            name: `cloudBlock`,
            description: `cloudBlock v3`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/avatar.jpg',
            email: 'chuangyou@qq.com',
            token: '123456789'
        };

        
           
        

        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 初始化菜单
        
        this.menuService.add([
            {
                text: '首页测试',
                group: true,
                children: [{
                    text: '首页',
                    icon: 'fa fa-spinner fa-spin',
                    link: '/default/workplace',
                },
                {
                    text: '说明',
                    link: '/default/dashboard',
                    icon: 'icon-speedometer'
                },
                {
                    text: '兼容测试',
                    link: '/default/test/test',
                    icon: 'icon-speedometer'
                },{
                    text: '拖拽页面',
                    link: '/fullscreen/test/dragOptions',
                    icon: 'icon-speedometer'
                }]
            },
            
            {
                text: '数据积木',
                group: true,
                children: [
                    {
                        text: '纯数据积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "datatable轻量级",
                            "link": "/default/test/testdatatable"
                        },{
                            "text": "ag-grid重量级",
                            "link": "/default/test/testaggrid"
                        }]
                    },
                    {
                        text: '图文积木',
                        icon: 'icon-rocket',
                        link: '/test/test',
                        "children": [{
                            "text": "datatable图文",
                            "link": "/default/dashboard/v1"
                        }]
                    }
                ]
            },
            {
                text: '表单积木',
                group: true,
                children: [
                    {
                        text: '表单积木积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础表单积木",
                            "link": "/default/test/testform"
                        }]
                    }
                ]
            },
            {
                text: '图表积木',
                group: true,
                children: [
                    {
                        text: '柱状图积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "simple bar",
                            "link": "/default/test/testsbcharts"
                        },{
                            "text": "Rainfall and Evaporation bar",
                            "link": "/default/dashboard/v1"
                        },
                        {
                            "text": "Mixed Line and Bar",
                            "link": "/default/dashboard/v1"
                        }]
                    },
                    {
                        text: '饼图积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "Doughnut Chart",
                            "link": "/default/test/testpiecharts"
                        },{
                            "text": "Pie with Scrollable Legend",
                            "link": "/dashboard/v1"
                        }]
                    },
                    {
                        text: '折线积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "Basic Line Chart",
                            "link": "/default/test/testlinecharts"
                        },{
                            "text": "Basic area chart",
                            "link": "/dashboard/v1"
                        },{
                            "text": "Stacked Line Chart",
                            "link": "/dashboard/v1"
                        },{
                            "text": "Stacked area chart",
                            "link": "/dashboard/v1"
                        }]
                    },
                    {
                        text: '关系积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "Vertical Tree",
                            "link": "/default/test/testvtree"
                        },{
                            "text": "ZTree",
                            "link": "/default/test/testztree"
                        }]
                    },
                    {
                        text: '仪表盘积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础仪表积木",
                            "link": "/default/test/testgauge"
                        }]
                    }
                ]
            },
            {
                text: '控件积木',
                group: true,
                children: [
                    {
                        text: '输入框积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "普通文本框",
                            "link": "/default/test/testinput1"
                        },{
                            "text": "密码框",
                            "link": "/default/test/testinput2"
                        },{
                            "text": "数值框",
                            "link": "/default/test/testinput3"
                        },
                        {
                            "text": "邮箱校验框",
                            "link": "/default/test/testinput4"
                        },{
                            "text": "手机号校验框",
                            "link": "/default/test/testinput5"
                        },{
                            "text": "身份证校验框",
                            "link": "/default/test/testinput6"
                        }]
                    },
                    {
                        text: '下拉框积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "普通下拉框",
                            "link": "/default/test/testselect1"
                        },{
                            "text": "联级下拉框",
                            "link": "/default/test/testselect2"
                        },{
                            "text": "popselect下拉框",
                            "link": "/default/test/testselect3"
                        }]
                    },
                    {
                        text: '附件积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "单图上传",
                            "link": "/default/test/testenclosure1"
                        },{
                            "text": "文件上传",
                            "link": "/default/test/testenclosure2"
                        },{
                            "text": "身份证上传",
                            "link": "/default/dashboard/v1"
                        },{
                            "text": "银行卡上传",
                            "link": "/dashboard/v1"
                        },{
                            "text": "发票上传",
                            "link": "/dashboard/v1"
                        },{
                            "text": "营业执照上传",
                            "link": "/dashboard/v1"
                        },{
                            "text": "文字识别上传",
                            "link": "/dashboard/v1"
                        }]
                    },
                    {
                        text: '时间日期积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "单选日期",
                            "link": "/default/test/testdatetime1"
                        },{
                            "text": "时间框积木",
                            "link": "/default/test/testdatetime2"
                        },{
                            "text": "多选日期",
                            "link": "/default/test/testdatetime3"
                        },{
                            "text": "多选时间",
                            "link": "/default/test/testdatetime4"
                        }]
                    },
                    {
                        text: '计算积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "同表计算积木",
                            "link": "/dashboard/v1"
                        },{
                            "text": "跨表积木",
                            "link": "/dashboard/v1"
                        }]
                    },
                    {
                        text: '地图积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础地图积木",
                            "link": "/default/test/testmap1"
                        },{
                            "text": "测距地图积木",
                            "link": "/default/dashboard/v1"
                        }]
                    },
                    {
                        text: '文本区积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础文本积木",
                            "link": "/dashboard/v1"
                        }]
                    },
                    {
                        text: '富文本积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "轻量级富文本积木",
                            "link": "/default/test/testrichtext1"
                        },{
                            "text": "重量级富文本积木",
                            "link": "/dashboard/v1"
                        }]
                    }
                ]
            },
            {
                text: '按钮积木',
                group: true,
                children: [
                    {
                        text: '普通按钮积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "新增按钮积木",
                            "link": "/default/test/testbutton1"
                        },{
                            "text": "编辑按钮积木",
                            "link": "/default/test/testbutton2"
                        },{
                            "text": "删除按钮积木",
                            "link": "/default/test/testbutton3"
                        },{
                            "text": "批量按钮积木",
                            "link": "/default/test/testbutton4"
                        },{
                            "text": "保存按钮积木",
                            "link": "/default/test/testbutton5"
                        },{
                            "text": "刷新按钮积木",
                            "link": "/default/test/testbutton6"
                        },{
                            "text": "返回按钮积木",
                            "link": "/default/test/testbutton7"
                        },{
                            "text": "其他按钮积木",
                            "link": "/default/test/testbutton8"
                        }]
                    },{
                        text: '业务按钮积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "工作流审批积木",
                            "link": "/dashboard/v1"
                        },{
                            "text": "批量工作流审核积木",
                            "link": "/dashboard/v1"
                        },{
                            "text": "导入积木",
                            "link": "/default/test/testservicebt3"
                        },{
                            "text": "导出积木",
                            "link": "/default/test/testservicebt4" 
                        },{
                            "text": "匹配积木",
                            "link": "/dashboard/v1"
                        }]
                    },{
                        text: '自定义按钮积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "跳转积木",
                            "link": "/dashboard/v1"
                        },{
                            "text": "自定义存储过程积木",
                            "link": "/dashboard/v1"
                        }]
                    }
                ]
            },{
                text: '元素积木',
                group: true,
                children: [
                    {
                        text: '标题元素积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础标题积木",
                            "link": "/dashboard/v1"
                        }]
                    },{
                        text: '图标元素积木',
                        link: '/dashboard',
                        icon: 'icon-speedometer',
                        "children": [{
                            "text": "基础图标积木",
                            "link": "/dashboard/v1"
                        }]
                    }
                ]
            }
        ]);
        // 设置页面标题的后缀
        this.titleService.suffix = app.name;

        resolve({});
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            // this.viaHttp(resolve, reject);
            // mock
            this.viaMock(resolve, reject);
        });
    }
}
