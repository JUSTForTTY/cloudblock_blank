import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { HttpHeaders } from '@angular/common/http';
import { catchError,map} from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor(private message: NzMessageService,private http:_HttpClient,
    private cacheService: CacheService) { }

  get ip() { return "http://"+this.cacheService.getNone("domain"); }

  //get 动态ip
  getHttp(url:string,params?:any): Observable<any> {
    return this.http.get(this.ip+url,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  }
  //get 完整url
  getHttpAllUrl(url:string,params?:any): Observable<any> {
    return this.http.get(url,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  }

  //put 动态ip
  putHttp(url:string,body={},params?:any):Observable<any>{
    return this.http.put(this.ip+url,body,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  }
  //put 完整url
  putHttpAllUrl(url:string,body={},params?:any):Observable<any>{
     return this.http.put(url,body,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  
  }


  //post 动态ip
  postHttp(url:string,body={},params?:any):Observable<any>{
    return this.http.post(this.ip+url,body,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  }


  //post 完整url
  postHttpAllUrl(url:string,body={},params?:any):Observable<any[]>{
    return this.http.post(url,body,params,httpOptions).pipe(
      map(res => {
        if(res['code']===200){
          return res;
        }
        else{
          throw new Error(res['code']);
        }
      }),
      catchError(err => {
        this.errorEvent(err,url);
        throw new Error(err);
      })
    );
  }



  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
  
      this.log("无权限访问！请重新登录！");
      // 让应用程序继续运行，返回一个空结果。
      return of(result as T);
    };
  }
  private errorEvent(err:string,url?){
    err=err+'';
    if(err.indexOf("400")){
      this.log(url+"调用失败:\n"+"此接口不存在");
    }
    else if(err.indexOf("500")){
      this.log(url+"调用失败:\n"+"系统繁忙,请稍后再试");
    }
    else if(err.indexOf("10000")){
      this.log(url+"调用失败:\n"+"参数错误");
    }
    
    
  } 

  private log(messageinform: string) {
    this.message.error(messageinform);
  }

}
