import { SettingsService, TitleService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { HttpService } from '@core/httpService/http.service';
import { CacheService } from '@delon/cache';
import { MenuService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { HttpClient } from '@angular/common/http';


const loginhttpurl = "" + environment.SERVER_URL + "/v1/authlogin";
const aclhttpurl = "" + environment.SERVER_URL + "/cysysbaseuserrole/condition";
const menuhttpurl = "" + environment.SERVER_URL + "/usermenu/condition";


@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService]
})
export class UserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        private cacheService: CacheService,
        private httpService: HttpService,
        private titleService: TitleService,
        private menuService: MenuService,
        private aclService: ACLService,
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private httpClient: HttpClient,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/)]],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });


    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0)
                clearInterval(this.interval$);
        }, 1000);
    }

    // endregion

    goPages = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            this.submit();
        } else {


        }
        event.preventDefault();
    };

    submit() {
        this.error = '';

        if (this.type === 0) {
            this.userName.markAsDirty();
            this.password.markAsDirty();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.captcha.markAsDirty();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }




        let params = {
            "cySysBaseUserUsername": this.userName.value,
            "cySysBaseUserPassword": this.password.value
        }
        this.loading = true;
        this.httpService.postHttpAllUrl(loginhttpurl, params).subscribe(
            (data: any) => {
                this.loading = false;
                if (data.errcode == "10001") {
                    this.error = `账户或密码错误`;
                    return;
                }
                if (data.errcode == "10005") {
                    this.error = `登录异常`;
                    return;
                }

                // 清空路由复用信息
                this.reuseTabService.clear();
                this.tokenService.set({
                    refresh_token: data.data.cySysBaseUserRefreshToken,
                    token: data.data.cySysBaseUserAccessToken
                })
                let userdata = {
                    "userid": data.data.cySysBaseUserId,
                    "username": data.data.cySysBaseUserUsername,
                    "realname": data.data.cySysBaseUserRealname,
                    "meno": data.data.cySysBaseUserMeno

                }
                //设置缓存
                this.cacheService.set('userdata', userdata, { type: 's', expire: 24 * 60 * 60 });
                this.router.navigate(['/default/dashboard']);


                let aclparams = {
                    "cySysBaseUserId": data.data.cySysBaseUserId
                }
                this.httpService.postHttpAllUrl(aclhttpurl, aclparams).subscribe(
                    (data: any) => {

                        // ACL：设置权限为全量
                        let roleArray = [];
                        data.data.forEach(element => {
                            roleArray.push(element.cySysRoleId);
                        });
                        console.log("用户权限", roleArray)
                        this.aclService.set({ role: roleArray, mode: 'oneOf' });

                        this.httpClient.get('assets/json/menu-data.json').subscribe(
                            (data: any) => {
                                
                                data.data.forEach(element => {
                                    element.acl = eval('(' + element.acl + ')');
                                });
                                console.log("菜单数据", data.data)
                                this.menuService.add([
                                    {
                                        text: '利华Mes系统-东南大学',
                                        group: true,
                                        children: data.data
                                    }]);

                            });

                    });





            }, (err) => {
                this.loading = false;
                let errstr = err + "";
                if (errstr.indexOf("400") >= 0) {
                    this.error = `账户或密码错误`;
                    return;

                } else {
                    this.error = '接口异常';
                    return;

                }


            });


    }



    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
