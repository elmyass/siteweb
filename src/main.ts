import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app/app.routes';

import { appConfig } from './app/app.config';



bootstrapApplication(AppComponent, appConfig
).catch(err => console.error(err));