import { Component, OnInit ,Inject} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettestService } from '@core/setting/settest.service';
@Component({
  selector: 'pzsucu05-button0010002',
  templateUrl: './pzsucu05-button0010002.component.html',
})
export class Pzsucu05Button0010002Component implements OnInit {
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
            button_jumptype:[null, Validators.required],
            button_bindingPage:[null, Validators.required],
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
        if(this.settestService.blocksort[this.settestService.rightid].sets['style']['page']==''){
            this.settestService.blocksort[this.settestService.rightid].sets['style']['page']=
            this.settestService.builtiInDataSource[1]['children'].length > 0 ? this.settestService.builtiInDataSource[1]['children'][0].value: '';
        }
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
