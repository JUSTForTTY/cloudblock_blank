import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '@core/setting/settest.service';
import { DragService } from '@core/dragservice/drag.service';
import { DndDropEvent,DropEffect } from 'ngx-drag-drop';
@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
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
export class Layout1Component implements OnInit {
    //布局id
    id

    constructor(
        private http: _HttpClient,
        public settestService: SettestService,
        public drag: DragService,
    ) { }

    ngOnInit() {
      this.id=this.settestService.getlayoutid();
      console.log("ngOnInit1:"+this.id);
      this.drag.reduction(this.id);
    }
    


}
