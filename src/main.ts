import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import {routes} from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {timeoutInterceptor} from './app/utils';


const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([timeoutInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAnimations(),
    provideToastr({positionClass: 'toast-bottom-right'})
  ]
};

registerLocaleData(localeFr);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

