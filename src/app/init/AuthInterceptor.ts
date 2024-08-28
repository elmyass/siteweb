import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { switchMap, from, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  return from(keycloakService.getToken()).pipe(
    switchMap(token => {
      if (token) {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Final Cloned Request with Auth Header:', clonedReq.headers.get('Authorization'));
        return next(clonedReq);
      } else {
        console.warn('No token available in Interceptor');
        return next(req);
      }
    }),
    catchError(error => {
      console.error('Error in AuthInterceptor:', error);
      return next(req);
    })
  );
};
