import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardWorkplaceComponent } from './workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { IndexComponent } from './index/index.component';
import { AddProjComponent } from './add-proj/add-proj.component';
import { BaseoptionsComponent } from './baseoptions/baseoptions.component';
import { PagedragComponent } from './pagedrag/pagedrag.component';
import { DragOptionsComponent } from './pagedrag/drag-options/drag-options.component';


@NgModule({
    imports: [ SharedModule, RouteRoutingModule ],
    declarations: [
        DashboardComponent,
        DashboardWorkplaceComponent,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component,
        IndexComponent,
        AddProjComponent,
        BaseoptionsComponent,
        PagedragComponent,
        DragOptionsComponent
    ]
})
export class RoutesModule {}
