import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ControlAnchor, ScaleControlOptions,MapOptions, NavigationControlOptions, NavigationControlType, Point } from 'angular2-baidu-map';
@Component({
  selector: 'app-sucu04-weiget0060001',
  templateUrl: './sucu04-weiget0060001.component.html',
  styles       : [
    `
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    baidu-map {
        display: block;
        width: 550px;
        height: 350px;
    }

  `
    ]
})
export class Sucu04Weiget0060001Component implements OnInit {
    title = 'angular5 Baidu-Map example';

    options: MapOptions;
    point: Point;
    navOptions: NavigationControlOptions;
    sacle:ScaleControlOptions;
    constructor(
        private http: _HttpClient
    ) { 
        this.options = {
            centerAndZoom: {
              lat: 39.920116,
              lng: 116.403703,
              zoom: 16
            },
            enableKeyboard: true,
            enableScrollWheelZoom:true
          };
      
          this.point = {
            lat: 39.920109,
            lng: 116.403705
          };
      
          this.navOptions = {
            anchor: ControlAnchor.BMAP_ANCHOR_TOP_RIGHT,
            type: NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN
          };
          this.sacle={
              
          }
        
    }

    ngOnInit() {
    }

}
