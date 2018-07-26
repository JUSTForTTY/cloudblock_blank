import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient ,SettingsService} from '@delon/theme';
import { environment } from '@env/environment';
import { HttpService } from '@core/httpService/http.service';
import { CacheService } from '@delon/cache';
const loginHttpUrl = "http://szcyerp.com/SUCUCloudBlockTools/v1/authlogin?refresh_time=";
/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private cacheService: CacheService,private settingService: SettingsService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private httpService: HttpService,private router:Router) { }

    get msg(): NzMessageService {
        return this.injector.get(NzMessageService);
    }

    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }


    private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
        // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
        this.injector.get(_HttpClient).end();
        // 业务处理：一些通用操作
        switch (event.status) {
            case 200:
           
                const body: any = event instanceof HttpResponse && event.body;
                if (body.errcode == 10005) {
                    console.log(event);
                    this.goTo('/login'); 
                    return;
                }
                if(body.errcode==0){
                   
                    if(body.access_token!=undefined && body.refresh_token!=undefined){
                        this.tokenService.set({
                            token:body.access_token,
                            refresh_token:body.refresh_token
                        });
                    }
                }
                break;
            case 401: // 未登录状态码
                this.goTo('/login');
                break;
            case 403:
                this.goTo(`/${event.status}`);
                break;
            case 404:
                this.goTo(`/${event.status}`);
                break;
            case 500:
                this.goTo(`/${event.status}`);
                break;
        }
        return of(event);
    }
   
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // 统一加上服务端前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = environment.SERVER_URL + url;//本地api不做拦截
        }
        
        let newReq;
            if(url!=loginHttpUrl){
                if(this.cacheService.getNone('userdata')==null){
                    this.goTo('/login');
                    console.log(newReq);
                }else{
                newReq = req.clone({
                    url: url,
                    headers: req.headers.set('access_token', this.tokenService.get().token).set('refresh_token',this.tokenService.get().refresh_token)
                });
                console.log(newReq.headers);
                }
            }else{
                newReq = req.clone({
                    url: url
                });
            }
        
        
        
        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                if (event instanceof HttpResponse && event.status === 200)
                    return this.handleData(event);
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err))
        );
    }
}