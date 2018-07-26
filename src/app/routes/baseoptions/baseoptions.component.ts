import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '@core/httpService/http.service';
@Component({
  selector: 'app-baseoptions',
  templateUrl: './baseoptions.component.html',
  styles:[`.content__title{
    height: 58px;
    padding-left: 50px;
  }
  nz-card{
    margin-left:25px;
    margin-right:25px;
  }
  `]
})
export class BaseoptionsComponent implements OnInit {
  url = "http://szcyerp.com/SUCUCloudBlockTools/v1/project";
  projecturl = "/v1/project";
  form: FormGroup;
  type;
  id;
  userLoginCard = true;
  userIndexCard = true;
  userServerCard = true;
  userInstanceProject = true;
  userProject = true;
  projectId;


  loginFileList = [ ];
  loadlingFileList = [];
  backgroundFileList = [];
  data: any;
  info: any;
  previewImage = '';
  previewVisible = false;


  constructor(private msg: NzMessageService, private httpService: HttpService, private route: ActivatedRoute,@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      proj_name: [null, [Validators.required, Validators.minLength(3)]],
      database_address: [null, [Validators.required, Validators.minLength(5)]],
      server_address: [null, [Validators.required, Validators.minLength(5)]],
      database_account: [null, [Validators.required, Validators.minLength(4)]],
      server_account: [null, [Validators.required, Validators.minLength(5)]],
      database_password: [null, [Validators.required, Validators.minLength(4)]],
      server_password: [null, [Validators.required, Validators.minLength(5)]],
      server_domainName: [null, [Validators.required, Validators.minLength(5)]],
      proj_logo_bgcolor: [null],
      proj_top_bgcolor: [null],
      proj_nav_bgcolor: [null],
      proj_sus_bgcolor: [null],
      proj_mainmenu_bgcolor: [null],
      proj_submenu_bgcolor: [null]

    });
  }
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    this.loadlingFileList = fileList.filter(item => {
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }


  ngOnInit() {

    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');


    if (this.type == 0) {
      this.userLoginCard = false;
          this.userIndexCard = false;
          this.userInstanceProject = false;
      this.httpService.getHttpAllUrl(this.url + "/" + this.id + "").subscribe((res: any) => {
        this.data = res.data;
        if(this.id != 0){
          this.projectId = this.data[0].cySysProjectId;
          this.form.setValue({ 
            proj_name: this.data[0].cySysProjectName  || "",
            database_address: this.data[0].cySysProjectDbUrl  || "",
            server_address: this.data[0].cySysProjectServerUrl  || "",
            database_account: this.data[0].cySysProjectDbUsername  || "",
            server_account: this.data[0].cySysProjectServerUsername  || "",
            database_password: this.data[0].cySysProjectDbPassword  || "",
            server_password: this.data[0].cySysProjectServerPassword  || "",
            server_domainName: this.data[0].cySysProjectServerDomainName  || "",
            proj_logo_bgcolor: "",
            proj_top_bgcolor: "",
            proj_nav_bgcolor: "",
            proj_sus_bgcolor: "",
            proj_mainmenu_bgcolor: "",
            proj_submenu_bgcolor: ""
          });
        }
        });
        
    } else {
      this.userProject = false;
      this.userServerCard = false;
      this.httpService.getHttp(this.projecturl).subscribe((res: any) => {
        this.data = res.data;
        this.projectId = this.data[0].cySysProjectId;
        this.form.setValue({ 
          proj_name: this.data[0].cySysProjectName  || "",
          proj_logo_bgcolor: this.data[0].cySysProjectLogoBackground  || "",
          proj_top_bgcolor: this.data[0].cySysProjectTopBackground  || "",
          proj_nav_bgcolor: this.data[0].cySysProjectNavigationBackground  || "",
          proj_sus_bgcolor: this.data[0].cySysProjectSuspensionColor || "",
          proj_mainmenu_bgcolor: this.data[0].cySysProjectMainMenuBackground  || "",
          proj_submenu_bgcolor: this.data[0].cySysProjectSubMenuBackground  || "",
          database_address: "",
            server_address: "",
            database_account: "",
            server_account: "",
            database_password: "",
            server_password: "",
            server_domainName: ""
         });
        if (null != this.data[0].cySysProjectLoginLogo) {
          this.loginFileList = [ {
            uid: -1,
            name: 'xxx.png',
            thumbUrl: this.data[0].cySysProjectLoginLogo,
            status: 'done'
      
          }]
        }
        if (null != this.data[0].cySysProjectLoadingLogo) {
          this.loadlingFileList =[{
            uid: -2,
            name: 'xxx.png',
            thumbUrl: this.data[0].cySysProjectLoadingLogo,
            status: 'done'
      
          }]
        }
        if (null != this.data[0].cySysProjectBackground) {
          this.backgroundFileList = [{
            uid: -3,
            name: 'xxx.png',
            thumbUrl: this.data[0].cySysProjectBackground,
            status: 'done'
      
          }]
        }
        });
    }
  }




  get proj_name() { return this.form.controls.proj_name; }
  get database_address() { return this.form.controls.database_address; }
  get server_address() { return this.form.controls.server_address; }
  get database_account() { return this.form.controls.database_account; }
  get server_account() { return this.form.controls.server_account; }
  get database_password() { return this.form.controls.database_password; }
  get server_password() { return this.form.controls.server_password; }
  get server_domainName() { return this.form.controls.server_domainName; }
  get proj_logo_bgcolor() { return this.form.controls.proj_logo_bgcolor; }
  get proj_top_bgcolor() { return this.form.controls.proj_top_bgcolor; }
  get proj_nav_bgcolor() { return this.form.controls.proj_nav_bgcolor; }
  get proj_sus_bgcolor() { return this.form.controls.proj_sus_bgcolor; }
  get proj_mainmenu_bgcolor() { return this.form.controls.proj_mainmenu_bgcolor; }
  get proj_submenu_bgcolor() { return this.form.controls.proj_submenu_bgcolor; }

  get proj_login_logo() { return this.loginFileList[0].thumbUrl; }
  get proj_loading_logo() { return this.loadlingFileList[0].thumbUrl; }
  get proj_bg_img() { return this.backgroundFileList[0].thumbUrl; }





  submit() {
    if (this.type == 0) {
      this.database_address.markAsDirty();
      this.server_address.markAsDirty();
      this.database_account.markAsDirty();
      this.server_account.markAsDirty();
      this.database_password.markAsDirty();
      this.server_password.markAsDirty();
      this.server_domainName.markAsDirty();
      if (this.proj_name.invalid || this.database_address.invalid || this.server_address.invalid
        || this.database_account.invalid || this.server_account.invalid || this.database_password.invalid || this.server_password.invalid
        || this.server_domainName.invalid
      ) return;

      if (this.id != 0) {
        let params = {
          "cySysProjectId": this.id,
          "cySysProjectName": this.proj_name.value,
          "cySysProjectDbUrl": this.database_address.value,
          "cySysProjectDbUsername": this.database_account.value,
          "cySysProjectDbPassword": this.database_password.value,
          "cySysProjectServerUrl": this.server_address.value,
          "cySysProjectServerDomainName": this.server_domainName.value,
          "cySysProjectServerUsername": this.server_account.value,
          "cySysProjectServerPassword": this.server_password.value,
          "cySysBaseUserIsDelete": '0'

        }
        this.httpService.putHttpAllUrl(this.url, params).subscribe((data: any) => {
          this.msg.create("success", `保存成功！`);
        });
      } else {
        let params = {
          "cySysProjectName": this.proj_name.value,
          "cySysProjectDbUrl": this.database_address.value,
          "cySysProjectDbUsername": this.database_account.value,
          "cySysProjectDbPassword": this.database_password.value,
          "cySysProjectServerUrl": this.server_address.value,
          "cySysProjectServerDomainName": this.server_domainName.value,
          "cySysProjectServerUsername": this.server_account.value,
          "cySysProjectServerPassword": this.server_password.value
        }
        this.httpService.postHttpAllUrl(this.url, params).subscribe((data: any) => {
          this.msg.create("success", `保存成功！`);
        });
      }

    } else {
      let params = {
        "cySysProjectId": this.projectId,
        "cySysProjectName": this.proj_name.value,
        "cySysProjectLoginLogo": this.proj_login_logo,
        "cySysProjectLoadingLogo": this.proj_loading_logo,
        "cySysProjectBackground": this.proj_bg_img,
        "cySysProjectLogoBackground": this.proj_logo_bgcolor.value,
        "cySysProjectTopBackground": this.proj_top_bgcolor.value,
        "cySysProjectNavigationBackground": this.proj_nav_bgcolor.value,
        "cySysProjectSuspensionColor": this.proj_sus_bgcolor.value,
        "cySysProjectMainMenuBackground": this.proj_mainmenu_bgcolor.value,
        "cySysProjectSubMenuBackground": this.proj_submenu_bgcolor.value,
        "cySysProjectIsDelete": '0',

      }

      this.httpService.putHttp(this.projecturl, params).subscribe((data: any) => {
        this.msg.create("success", `更新成功！`);
      });
    }



  }




}
