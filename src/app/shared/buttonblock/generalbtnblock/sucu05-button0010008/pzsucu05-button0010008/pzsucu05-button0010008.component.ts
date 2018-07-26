import { Component, OnInit ,Inject} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettestService } from '@core/setting/settest.service';
@Component({
  selector: 'pzsucu05-button0010008',
  templateUrl: './pzsucu05-button0010008.component.html',
})
export class Pzsucu05Button0010008Component implements OnInit {
    button_options: FormGroup;
    firstId;//第一次init的id
    id;
    constructor(
        private http: _HttpClient,
        public settestService: SettestService,
        @Inject(FormBuilder) fb: FormBuilder,
    ) {
        this.button_options = fb.group({
            table_name: [null, Validators.required],
            button_name: [null, Validators.required],
            button_bgcolor:[null, Validators.required],
            button_size:[null, Validators.required],
        })
     }
     ngDoCheck() {
        if (this.firstId != this.settestService.rightid) {
            this.init();
        }
    }
    init(){
        this.id = this.settestService.rightid;
        this.firstId = this.settestService.rightid;
        if ( this.settestService.blocksort[this.settestService.rightid].sets['style']['table'] == '' && this.settestService.linkInfo['table'].length > 0 ) {
            this.settestService.blocksort[this.settestService.rightid].sets['style']['table'] = this.settestService.linkInfo['table'][0]['value'];
        }
    }

    ngOnInit() {
       this.init(); 
    }

    autoSetValue(key, event, log) {
        if (typeof event != "undefined" && event != "") {
          console.log(log + JSON.stringify(event));
          this.setvalue(key, event)
        }
      }
      setvalue(key, event) {
        this.settestService.blocksort[this.settestService.rightid].sets['style'][key] = event;
      }
      onClick(){

      }

}
