import { Component, OnInit ,Inject} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'pzsucu05-button0010006',
  templateUrl: './pzsucu05-button0010006.component.html',
})
export class Pzsucu05Button0010006Component implements OnInit {
    button_options: FormGroup;
    constructor(
        private http: _HttpClient,
        @Inject(FormBuilder) fb: FormBuilder,
    ) {
        this.button_options = fb.group({
            table_name: [null, Validators.required],
            button_name: [null, Validators.required],
            button_operatetype:[null, Validators.required],
            button_bgcolor:[null, Validators.required],
            button_size:[null, Validators.required],
        })
     }

    ngOnInit() {
    }

}
