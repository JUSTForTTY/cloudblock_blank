import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sucu03-charts0040001',
  templateUrl: './sucu03-charts0040001.component.html',
  styles  : [
    `.demo-chart {
      height: 400px;
    }`
]
})
export class Sucu03Charts0040001Component implements OnInit {
    
  mergeData = null;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
        this.chartOption.series[0].data = [this.TREE_DATA_1];
        this.mergeData = {
            series: this.chartOption.series
          };
    }
    chartOption = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          legend: {
            top: '2%',
            left: '3%',
            orient: 'vertical',
            data: [{
              name: 'tree',
              icon: 'rectangle'
            }],
            borderColor: '#c23531'
          },
          series: [
            {
              type: 'tree',
              name: 'tree',
              data: [],
              top: '5%',
              left: '7%',
              bottom: '2%',
              right: '60%',
        
              symbolSize: 7,
        
              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right'
                }
              },
        
              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },
        
              expandAndCollapse: true,
        
              animationDuration: 550,
              animationDurationUpdate: 750
        
            }
          ]
      }



      TREE_DATA_1 = {
        "name": "flare",
    "children": [
        {
            "name": "flex",
            "children": [
                {"name": "FlareVis", "value": 4116}
            ]
        },
        {
            "name": "scale",
            "children": [
                {"name": "IScaleMap", "value": 2105},
                {"name": "LinearScale", "value": 1316},
                {"name": "LogScale", "value": 3151},
                {"name": "OrdinalScale", "value": 3770},
                {"name": "QuantileScale", "value": 2435},
                {"name": "QuantitativeScale", "value": 4839},
                {"name": "RootScale", "value": 1756},
                {"name": "Scale", "value": 4268},
                {"name": "ScaleType", "value": 1821},
                {"name": "TimeScale", "value": 5833}
           ]
        },
        {
            "name": "display",
            "children": [
                {"name": "DirtySprite", "value": 8833}
           ]
        }
    ]
      };
    


      
}
