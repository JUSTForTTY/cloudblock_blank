import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SimpleTableColumn, XlsxService } from '@delon/abc';

@Component({
  selector: 'app-sucu05-button0020004',
  templateUrl: './sucu05-button0020004.component.html',
})
export class Sucu05Button0020004Component implements OnInit {

    constructor(
        private xlsx: XlsxService,
        private http: _HttpClient
    ) { }

    users: any[] = Array(100).fill({}).map((item: any, idx: number) => {
        return {
            id: idx + 1,
            name: `name ${idx + 1}`,
            age: Math.ceil(Math.random() * 10) + 20
        };
    });
    columns: SimpleTableColumn[] = [
        { title: '编号', index: 'id', type: 'checkbox' },
        { title: '姓名', index: 'name' },
        { title: '年龄', index: 'age' }
    ];

    download() {
        const data = [ this.columns.map(i => i.title) ];
        this.users.forEach(i => data.push(this.columns.map(c => i[c.index as string])));
        this.xlsx.export({
            sheets: [
                {
                    data: data,
                    name: 'sheet name'
                }
            ]
        });
    }
    ngOnInit() {
    }

}
