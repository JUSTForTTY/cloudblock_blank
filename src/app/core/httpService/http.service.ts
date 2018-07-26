import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { HttpHeaders,HttpClient,HttpParams } from '@angular/common/http';
import { catchError,repeat, map, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
import { valid } from 'mockjs';
import { Output } from '@angular/core/src/metadata/directives';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor(private message: NzMessageService,private http:_HttpClient,
    private cacheService: CacheService) { }

  get ip() { return "http://"+this.cacheService.getNone("domain"); }

  //get 动态ip
  getHttp(url:string,params?:any): Observable<any[]> {
    return this.http.get(this.ip+url,params,httpOptions).pipe(
      catchError(this.handleError<any>('getHttp'))
    );
  }
  //get 完整url
  getHttpAllUrl(url:string,params?:any): Observable<any[]> {
    return this.http.get(url,params,httpOptions).pipe(
      catchError(this.handleError<any>('getHttpAllUrl'))
    );
  }

  //put 动态ip
  putHttp(url:string,body?:any,params?:any):Observable<any[]>{
    return this.http.put(this.ip+url,body,params).pipe(
     catchError(this.handleError<any>('putHttp'))
   );
 }
  //put 完整url
  putHttpAllUrl(url:string,body?:any,params?:any):Observable<any[]>{
     return this.http.put(url,body,params).pipe(
      catchError(this.handleError<any>('putHttpAllUrl'))
    );
  }


  //post 动态ip
  postHttp(url:string,body?:any,params?:any):Observable<any[]>{
    return this.http.post(this.ip+url,body,params,httpOptions).pipe(
      catchError(this.handleError<any>('postHttp'))
    );
  }

  //post 完整url
  postHttpAllUrl(url:string,body?:any,params?:any):Observable<any[]>{
    return this.http.post(url,body,params,httpOptions).pipe(
      catchError(this.handleError<any>('postHttpAllUrl'))
    );
  }



  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.log("tuichu")
  
      // TODO: 给用户呈现错误信息
      //this.log(`${operation} failed: ${error.message}`);
      this.log("无权限访问！请重新登录！");
      // 让应用程序继续运行，返回一个空结果。
      return of(result as T);
    };
  }

  private log(messageinform: string) {
    this.message.error(messageinform);
  }

}
