import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/init/AuthInterceptor';

const initializeKeycloak = (keycloak: KeycloakService) => () =>
  keycloak.init({
    config: {
      url: 'http://localhost:8080',
      realm: 'master',
      clientId: 'project2'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  });

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
