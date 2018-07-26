import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { OptionLayoutComponent } from '../layout/option-layout/option-layout.component';
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


import { AddProjComponent } from './add-proj/add-proj.component';
import { IndexComponent } from './index/index.component';
import { BaseoptionsComponent } from './baseoptions/baseoptions.component';
import { PagedragComponent } from './pagedrag/pagedrag.component';
const routes: Routes = [
    {
        path: 'default',
        component: LayoutDefaultComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
            { path: 'workplace', component: DashboardWorkplaceComponent },
            { path: 'test', loadChildren: './test/test.module#TestModule' }//test测试页面
            // 业务子模块
            // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
        ]
    },
    // 全屏布局
    {
        path: 'fullscreen',
        component: LayoutFullScreenComponent,
        children: [
            { path: 'test', loadChildren: './test/test.module#TestModule' },
            { path: 'pageDrag', component: PagedragComponent,data: { title: '页面拖拽配置' } }
        ]
    },
    //配置布局
    {
        path:'options',
        component:OptionLayoutComponent,
        children:[
            { path: 'addproj', component: AddProjComponent,data: { title: '项目列表' } },
            { path: 'index', component: IndexComponent,data: { title: '首页' } },
            { path: 'baseOptions/:type/:id', component: BaseoptionsComponent,data: { title: '基础配置' } }
        ]
    },
    
    // passport
    {
        path: '',
        component: LayoutPassportComponent,
        children: [
            { path: '', redirectTo: 'login',pathMatch:'full' },
            { path: 'login', component: UserLoginComponent ,data: { title: '登录' }},
            { path: 'register', component: UserRegisterComponent },
            { path: 'register-result', component: UserRegisterResultComponent }
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'login',pathMatch:'full' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
  })
export class RouteRoutingModule { }
