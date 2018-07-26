import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { GeneralPipe } from '@core/pipe/general.pipe';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { BaiduMapModule } from 'angular2-baidu-map';

// import { NzSchemaFormModule } from 'nz-schema-form';

// echarts
import { NgxEchartsModule } from 'ngx-echarts';


import { importcomps,pzcomps } from './importcomps';
import { importlayoutcomps } from './layoutcomps';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {AgGridModule} from "ag-grid-angular";
import { DndModule } from 'ngx-drag-drop';


const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    
    // NzSchemaFormModule
    
];
// endregion

// region: your componets & directives
const COMPONENTS = [
    
    
];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
     //   UEditorModule.forRoot({
            // 指定ueditor.js路径目录
    //        path: '/assets/ueditor/',
            // 默认全局配置项
    //        options: {
  //              themePath: '/assets/ueditor/themes/'
    //        }
    //    }),
        BaiduMapModule.forRoot({ak: 'your ak'}),
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        DelonACLModule,
        NgxEchartsModule,
        // third libs
        ...THIRDMODULES,
        DndModule,
        InfiniteScrollModule,
        AgGridModule.withComponents([/*optional Angular Components to be used in the grid*/]),
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...importcomps,
        ...pzcomps,
        ...importlayoutcomps,
        GeneralPipe
    ],
    exports: [
        DndModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        DelonACLModule,
        InfiniteScrollModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...importcomps,
        ...pzcomps,
        ...importlayoutcomps,
    ],
    entryComponents:[
        ...importcomps,
        ...pzcomps,
        ...importlayoutcomps,
    ],
    providers: [
      ],
})
export class SharedModule { }

