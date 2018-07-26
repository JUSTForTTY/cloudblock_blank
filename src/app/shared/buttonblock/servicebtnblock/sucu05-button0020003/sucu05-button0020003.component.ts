import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, XlsxService } from '@delon/abc';

@Component({
  selector: 'app-sucu05-button0020003',
  templateUrl: './sucu05-button0020003.component.html',
})
export class Sucu05Button0020003Component implements OnInit {
    filename='filename';
    constructor(
        private http: _HttpClient,
        private xlsx: XlsxService
    ) { }

    data: any;
    url() {
        this.xlsx.import(`./assets/demo.xlsx`).then(res => this.data = res);
    }

    change(e: Event) {
        const file = (e.target as HTMLInputElement).files[0];
        this.xlsx.import(file).then(res => this.data = res);
    }

    ngOnInit() {
    }

}
