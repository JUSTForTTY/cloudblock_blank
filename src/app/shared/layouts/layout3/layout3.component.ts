import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '@core/setting/settest.service';
import { DragService } from '@core/dragservice/drag.service';
import { DndDropEvent,DropEffect } from 'ngx-drag-drop';
@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styles: [`
  .dndList {
    
    transition: all 300ms ease;
  
    &.dndDragover {
  
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  .dndDragging {

    border: 1px solid green;
  }
  
  .dndDraggingSource {
  
    display: none;
  }
  li{
    margin: 2px;
  border: 1px solid gray;
  }
  .dndPlaceholder {

    min-height: 72px;
    border: 1px dashed green;
    background-color: rgba(0, 0, 0, 0.1);
  }
  li {list-style-type:none;}
  `]
})
export class Layout3Component implements OnInit {

    constructor(
        private http: _HttpClient,
        public settestService: SettestService,
        public drag: DragService
    ) { }
    id
    ngOnInit() {
        this.id=this.settestService.getlayoutid();
        console.log("ngOnInit3:"+this.id);
        console.log("blocksort:"+JSON.stringify(this.settestService.blocksort[this.id]) );
        this.drag.reduction(this.id);
        
    }

}
