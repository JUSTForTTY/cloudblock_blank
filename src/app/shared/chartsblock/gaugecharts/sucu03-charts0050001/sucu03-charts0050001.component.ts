import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu03-charts0050001',
  templateUrl: './sucu03-charts0050001.component.html',
})
export class Sucu03Charts0050001Component implements OnInit {
    mergeData = null;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
        this.chartOption.series[0].data[0].value = Math.floor((Math.random() * 100));
        this.mergeData = {
            series: this.chartOption.series
          };
    }

    chartOption = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 50, name: '完成率'}]
            }
        ]
    };

}
