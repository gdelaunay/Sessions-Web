import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import {routes} from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAnimations(),
    provideToastr()
  ]
};

registerLocaleData(localeFr);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

