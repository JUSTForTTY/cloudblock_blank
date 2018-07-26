import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles:[`
  .gutter-box {
    background: #00A0E9;
    padding: 5px 0;
    text-align: center;
  }
  `]
})
export class TestComponent implements OnInit {

    

    constructor(private http: _HttpClient) {
        
      }



    ngOnInit() {
    }
    
    dsa(){
        console.log("dsadsa");
    }
    dataSource=[
      { id:'1001', label: '字段一', value: 'Apple', checked: true, eyeshow:true },
      { id:'1002', label: '字段二', value: 'Pear', checked: false, eyeshow:false },
      { id:'1003', label: '字段三', value: 'Orange', checked: false, eyeshow:false },
      { id:'1004', label: '字', value: 'Orange', checked: false, eyeshow:false }
        ];
        editclick(event){
          console.log(event);
        }
}
