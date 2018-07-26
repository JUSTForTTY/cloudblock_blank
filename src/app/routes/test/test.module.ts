import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { TestdatatableComponent } from './testdatatable/testdatatable.component';
import { TestaggridComponent } from './testaggrid/testaggrid.component';
import { Testinput1Component } from './testinput1/testinput1.component';
import { Testinput2Component } from './testinput2/testinput2.component';
import { Testinput3Component } from './testinput3/testinput3.component';
import { Testinput4Component } from './testinput4/testinput4.component';
import { Testinput5Component } from './testinput5/testinput5.component';
import { Testinput6Component } from './testinput6/testinput6.component';
import { Testselect1Component } from './testselect1/testselect1.component';
import { Testselect2Component } from './testselect2/testselect2.component';
import { Testselect3Component } from './testselect3/testselect3.component';
import { Testenclosure1Component } from './testenclosure1/testenclosure1.component';
import { Testenclosure2Component } from './testenclosure2/testenclosure2.component';
import { Testservicebt3Component } from './testservicebt3/testservicebt3.component';
import { Testservicebt4Component } from './testservicebt4/testservicebt4.component';
import { TestformComponent } from './testform/testform.component';
import { TestsbchartsComponent } from './testsbcharts/testsbcharts.component';
import { TestpeichartsComponent } from './testpeicharts/testpeicharts.component';
import { Testdatetime1Component } from './testdatetime1/testdatetime1.component';
import { Testdatetime2Component } from './testdatetime2/testdatetime2.component';
import { Testdatetime3Component } from './testdatetime3/testdatetime3.component';
import { Testdatetime4Component } from './testdatetime4/testdatetime4.component';
import { Testrichtext1Component } from './testrichtext1/testrichtext1.component';
import { TestlinechartsComponent } from './testlinecharts/testlinecharts.component';
import { TestvtreeComponent } from './testvtree/testvtree.component';
import { TestztreeComponent } from './testztree/testztree.component';
import { TestgaugeComponent } from './testgauge/testgauge.component';
import { Testmap1Component } from './testmap1/testmap1.component';
import { Testmap2Component } from './testmap2/testmap2.component';
import { Testbutton1Component } from './testbutton1/testbutton1.component';
import { Testbutton2Component } from './testbutton2/testbutton2.component';
import { Testbutton3Component } from './testbutton3/testbutton3.component';
import { Testbutton4Component } from './testbutton4/testbutton4.component';
import { Testbutton5Component } from './testbutton5/testbutton5.component';
import { Testbutton6Component } from './testbutton6/testbutton6.component';
import { Testbutton7Component } from './testbutton7/testbutton7.component';
import { Testbutton8Component } from './testbutton8/testbutton8.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    TestRoutingModule
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      TestComponent,
      TestdatatableComponent,
      TestaggridComponent,
      Testinput1Component,
      Testinput2Component,
      Testinput3Component,
      Testinput4Component,
      Testinput5Component,
      Testinput6Component,
      Testselect1Component,
      Testselect2Component,
      Testselect3Component,
      Testenclosure1Component,
      Testenclosure2Component,
      Testservicebt3Component,
      Testservicebt4Component,
      TestformComponent,
      TestsbchartsComponent,
      TestpeichartsComponent,
      Testdatetime1Component,
      Testdatetime2Component,
      Testdatetime3Component,
      Testdatetime4Component,
      Testrichtext1Component,
      TestlinechartsComponent,
      TestvtreeComponent,
      TestztreeComponent,
      TestgaugeComponent,
      Testmap1Component,
      Testmap2Component,
      Testbutton1Component,
      Testbutton2Component,
      Testbutton3Component,
      Testbutton4Component,
      Testbutton5Component,
      Testbutton6Component,
      Testbutton7Component,
      Testbutton8Component
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class TestModule { }
