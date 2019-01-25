import { Component } from '@angular/core';
import { LayoutService } from 'ngx-block-core';
@Component({
  selector: 'layout-fullscreen',
  templateUrl: './fullscreen.component.html',
  host: {
    '[class.alain-fullscreen]': 'true',
  },
})
export class LayoutFullScreenComponent {
  constructor(public layoutService: LayoutService, 
    ) {}

    handleCancel(): void {
     
      this.layoutService.isVisible = false;
    }
   
}
