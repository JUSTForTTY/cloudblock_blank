import { Router } from '@angular/router';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { environment } from '@env/environment';
import { CacheService } from '@delon/cache';

const menuhttpurl = "" + environment.SERVER_URL + "/usermenu/condition";
const aclhttpurl = "" + environment.SERVER_URL + "/cysysbaseuserrole/condition";
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private cacheService: CacheService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector) { }

  private viaHttp(resolve: any, reject: any) {
    if (this.cacheService.getNone('userdata') != null) {
      zip(
        this.httpClient.get('assets/json/menu-data.json')
      ).pipe(
        // 接收其他拦截器后产生的异常消息
        catchError(([appData]) => {
          resolve(null);
          return [appData];
        })
      ).subscribe(([appData]) => {

        // application data
        const res: any = appData;

        this.cacheService.get('userdata').subscribe((data: any) => {

          //设置权限
          let aclparams = {
            "cySysBaseUserId": data.userid
          }
          this.httpClient.post(aclhttpurl, aclparams).subscribe(
            (data: any) => {

              // ACL：设置权限为用户角色
              let roleArray = [];
              data.data.forEach(element => {
                roleArray.push(element.cySysRoleId);
              });
              console.log("用户权限", roleArray)
              this.aclService.set({ role: roleArray, mode: 'oneOf' });

              res.data.forEach(element => {
                element.acl = eval('(' + element.acl + ')');
              });
              console.log("菜单数据", res.data)
              this.menuService.add([
                {
                  text: '利华Mes系统-东南大学',
                  group: true,
                  children: res.data
                }]);

            });
        });
      },
        () => { },
        () => {
          resolve(null);
        });
    }

    const app: any = {
      name: `cloudBlock`,
      description: `cloudBlock v3`
    };
    // const user: any = {
    //   name: 'Admin',
    //   avatar: './assets/img/avatar.jpg',
    //   email: 'chuangyou@qq.com',
    //   token: '123456789'
    // };

    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    //this.settingService.setUser(user);

    //设置页面标题的后缀
    this.titleService.suffix = "利华Mes";

    resolve({});
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //     this.injector.get(Router).navigateByUrl('/passport/login');
    //     resolve({});
    //     return;
    // }
    // mock
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
    this.aclService.set({ role: ['1'] });
    // 初始化菜单
    this.menuService.add([
      {
        text: '首页测试',
        group: true,
        children: [
          {
            text: '首页',
            icon: 'icon-rocket',
            link: '/default/workplace',
            acl: { role: ['1'], mode: 'oneOf ' }
          },
          {
            text: '说明',
            link: '/default/dashboard',
            icon: 'icon-speedometer',
            acl: { role: ['2'] }
          },
          {
            text: '兼容测试',
            link: '/default/test/test',
            icon: 'icon-speedometer',
            acl: { role: ['1'] }
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
      this.viaHttp(resolve, reject);
      // mock
      // this.viaMock(resolve, reject);
    });
  }
}
