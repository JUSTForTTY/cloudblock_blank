import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { HttpService } from '@core/httpService/http.service';
import { SettestService } from '@core/setting/settest.service';
import { DragService } from '@core/dragservice/drag.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { SimpleInterceptor } from '@delon/auth';
// angular i18n
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import { DecimalPipe } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);

// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}



@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        JsonSchemaModule,
        RoutesModule
        
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        StartupService,HttpService,DragService,SettestService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        DecimalPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
