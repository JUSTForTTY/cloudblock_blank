import { Component, OnInit,Injector } from '@angular/core';
import { _HttpClient,SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { HttpService } from '@core/httpService/http.service';
import { CacheService } from '@delon/cache';
@Component({
  selector: 'app-add-proj',
  templateUrl: './add-proj.component.html',
  styles  : [`:host ::ng-deep .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 450px;
  }
  :host ::ng-deep .demo-loading {
    position: absolute;
    bottom: -40px;
    left: 50%;
  }
  

  `]
})
export class AddProjComponent implements OnInit {

    data: any[] = [];
    loading = false;
    hasMore = true;
    url = "http://szcyerp.com/SUCUCloudBlockTools/v1/project";
  
    constructor(private http: _HttpClient, private msg: NzMessageService,private router:Router,private injector:Injector,
    private httpService:HttpService,private cacheService:CacheService,private settingsService:SettingsService
    ) {}
  
    
    ngOnInit(): void {
          this.getData((res: any) =>{
            this.data = res.data;
            console.log(res);
          });
    }

    getData(callback: (res: any) => void): void {
      this.httpService.getHttpAllUrl(this.url).subscribe(
        (res: any) => (callback(res)));
    }

    getDomain(domain){
      this.cacheService.set('domain',domain,{type:'s',expire:24*60*60});
      console.log(this.cacheService.getNone('domain'));
      this.router.navigate(['/options/index']);
    }
    
    edit(item){

      this.router.navigate(['/options/baseOptions/0/'+item.cySysProjectId+'']);

    }

    delete(item){

      console.log(item)
      let params={
        "cySysProjectId":item.cySysProjectId,
        "cySysProjectName":item.cySysProjectName,
        "cySysProjectDbUrl":item.cySysProjectDbUrl,
        "cySysProjectDbUsername":item.cySysProjectDbUsername,
        "cySysProjectDbPassword":item.cySysProjectDbPassword,
        "cySysProjectServerUrl":item.cySysProjectServerUrl,
        "cySysProjectServerDomainName":item.cySysProjectServerDomainName,
        "cySysProjectServerUsername":item.cySysProjectServerUsername,
        "cySysProjectServerPassword":item.cySysProjectServerPassword,
        "cySysProjectIsDelete":'1'
      }
      this.httpService.putHttpAllUrl(this.url,params).subscribe((data:any)=>{
        console.log(data);
        
        this.msg.create("success", `删除成功！`);
       
        this.getData((res: any) =>{
          this.data = res.data;
        });

      });




    }

  
    

    creatNewProj(){
      this.router.navigate(['/options/baseOptions/0/0']);
    }

 
}
