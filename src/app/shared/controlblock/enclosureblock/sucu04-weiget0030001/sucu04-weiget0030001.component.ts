import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-sucu04-weiget0030001',
  templateUrl: './sucu04-weiget0030001.component.html',
  styles: [
    `
  :host ::ng-deep i {
    font-size: 32px;
    color: #999;
  }
  :host ::ng-deep .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  `
  ]
})
export class Sucu04Weiget0030001Component implements OnInit {
    fileList = [
        {
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ];
      previewImage = '';
      previewVisible = false;
    
      handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
      }

     
    
    constructor(
        private http: _HttpClient,private msg: NzMessageService
    ) { }

    ngOnInit() {
    }

}
