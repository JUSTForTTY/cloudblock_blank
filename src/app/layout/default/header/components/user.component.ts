import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CacheService } from '@delon/cache';

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
        <nz-avatar class="mr-sm" nzSize="default" [nzText]="settings.user.realname" style="background-color:#87d068;"></nz-avatar>
            {{settings.user.username}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent implements OnInit {
    constructor(
        public settings: SettingsService,
        private router: Router,
        private cacheService:CacheService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {}

    ngOnInit(): void {
        this.cacheService.get('userdata').subscribe((data:any)=>{
            //处理姓名
            let realname=data.realname;
            
            if(realname.length>=3){
                //取姓名后两位
                data.realname=realname.substring(realname.length-2,realname.length);
              
            }else{

            }    

            this.settings.setUser(data);
        })

        // this.tokenService.change().subscribe((res: any) => {
        //     this.settings.setUser(res);
        // });
        // // mock
        // const token = this.tokenService.get() || {
        //     token: 'nothing',
        //     name: 'Admin',
        //     avatar: './assets/img/zorro.svg',
        //     email: 'cipchk@qq.com'
        // };
        // this.tokenService.set(token);
    }

    logout() {
        this.tokenService.clear();
        this.cacheService.clear();
        this.router.navigateByUrl(this.tokenService.login_url);
    }
}
