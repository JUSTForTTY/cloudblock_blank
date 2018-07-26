import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '../../../../core/setting/settest.service';

@Component({
  selector: 'app-layoutright',
  templateUrl: './layoutright.component.html',
})
export class LayoutrightComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        private settestService:SettestService
    ) { }

    ngOnInit() {
    }
    onClick(): void { 
        console.log("blocksort[id]:"+this.settestService.id);
      const index = this.settestService.draggableListRight.indexOf( this.settestService.blocksort[this.settestService.id] );
      console.log("blocksort[id]3:"+index);
      this.settestService.draggableListRight.splice( index, 1 );
      this.settestService.rightid=0;
    }

}
