import { Component, OnInit,Inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-pzsucu04-weiget0040001',
  templateUrl: './pzsucu04-weiget0040001.component.html',
})
export class Pzsucu04Weiget0040001Component implements OnInit {
    listOfOption = [];
    multipleValue = [ 'a10', 'c12' ];
    weiget_options:FormGroup;
    constructor(
        private http: _HttpClient,
        @Inject(FormBuilder) fb: FormBuilder,
    ) {
        this.weiget_options = fb.group({
            weiget_datatables:[null, Validators.required],
            weiget_bingcolumns:[null, Validators.required],
            weiget_datenumber:[null, Validators.required],
            weiget_datetype:[null, Validators.required],
            weiget_texttitle:[null, Validators.required],
            weiget_textcolor:[null, Validators.required],
            weiget_position:[null, Validators.required],
            weiget_inputsize:[null, Validators.required],
            weiget_dateformat:[null, Validators.required],
            weiget_earlydate:[null, Validators.required],
            weiget_lastestdate:[null, Validators.required],
        })
     }

    ngOnInit() {
        const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
  

}
