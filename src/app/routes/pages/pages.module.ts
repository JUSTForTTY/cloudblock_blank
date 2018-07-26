import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { TestComponent } from './test/test.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      TestComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PagesModule { }
