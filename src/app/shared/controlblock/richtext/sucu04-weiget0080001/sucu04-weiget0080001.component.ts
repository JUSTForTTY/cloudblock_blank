import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';
import { _HttpClient } from '@delon/theme';

declare const UE: any;
@Component({
  selector: 'app-sucu04-weiget0080001',
  templateUrl: './sucu04-weiget0080001.component.html',
  encapsulation: ViewEncapsulation.None
})
export class Sucu04Weiget0080001Component implements OnInit {
    @ViewChild('full') full: UEditorComponent;
    getAllHtml() {
        // 通过 `this.full.Instance` 访问ueditor实例对象
        alert(this.full.Instance.getAllHtml())
    }
    
    constructor(
        private el: ElementRef,
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }
}
