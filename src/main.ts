import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';



import {LicenseManager} from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until__2_June_2018__MTUyNzg5NDAwMDAwMA==a955ee2667cbe5f9f5a2d59bff6ad561");



import { preloaderFinished } from '@delon/theme';
preloaderFinished();

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(AppModule, {
        defaultEncapsulation: ViewEncapsulation.Emulated,
        preserveWhitespaces: false
    });
};

if (environment.hmr) {
  if (module['hot']) {
      hmrBootstrap(module, bootstrap);
  } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().then(() => {
    if ((<any>window).appBootstrap) {
      (<any>window).appBootstrap();
    }
  });
}
