import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'testdatatable', component: TestdatatableComponent },
  { path: 'testaggrid', component: TestaggridComponent },
  { path: 'testinput1', component: Testinput1Component },
  { path: 'testinput2', component: Testinput2Component },
  { path: 'testinput3', component: Testinput3Component },
  { path: 'testinput4', component: Testinput4Component },
  { path: 'testinput5', component: Testinput5Component },
  { path: 'testinput6', component: Testinput6Component },
  { path: 'testselect1', component: Testselect1Component },
  { path: 'testselect2', component: Testselect2Component },
  { path: 'testselect3', component: Testselect3Component },
  { path: 'testenclosure1', component: Testenclosure1Component },
  { path: 'testenclosure2', component: Testenclosure2Component },
  { path: 'testservicebt3', component: Testservicebt3Component },
  { path: 'testservicebt4', component: Testservicebt4Component },
  { path: 'testform', component: TestformComponent },
  { path: 'testsbcharts', component: TestsbchartsComponent },
  { path: 'testpiecharts', component: TestpeichartsComponent },
  { path: 'testdatetime1', component: Testdatetime1Component },
  { path: 'testdatetime2', component: Testdatetime2Component },
  { path: 'testdatetime3', component: Testdatetime3Component },
  { path: 'testdatetime4', component: Testdatetime4Component },
  { path: 'testrichtext1', component: Testrichtext1Component },
  { path: 'testlinecharts', component: TestlinechartsComponent },
  { path: 'testvtree', component: TestvtreeComponent },
  { path: 'testztree', component: TestztreeComponent },
  { path: 'testgauge', component: TestgaugeComponent },
  { path: 'testmap1', component: Testmap1Component },
  { path: 'testmap2', component: Testmap2Component },
  { path: 'testbutton1', component: Testbutton1Component },
  { path: 'testbutton2', component: Testbutton2Component },
  { path: 'testbutton3', component: Testbutton3Component },
  { path: 'testbutton4', component: Testbutton4Component },
  { path: 'testbutton5', component: Testbutton5Component },
  { path: 'testbutton6', component: Testbutton6Component },
  { path: 'testbutton7', component: Testbutton7Component },
  { path: 'testbutton8', component: Testbutton8Component },
  
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
