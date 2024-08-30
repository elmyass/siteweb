import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { switchMap, from, catchError, throwError } from 'rxjs';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
 
  return from(keycloakService.getToken()).pipe(
    switchMap(token => {
      if (token) {
        // Clone the request and add the Authorization header
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Final Cloned Request with Auth Header:', clonedReq.headers.get('Authorization'));
        // Forward the cloned request with the Authorization header
        return next(clonedReq);
      } else {
        console.warn('No token available in Interceptor');
        // If no token, forward the original request
        return next(req);
      }
    }),
    catchError(error => {
      console.error('Error in AuthInterceptor:', error);
      // Handle the error and rethrow it for further processing
      return throwError(() => new Error('Error in Interceptor'));
    })
  );
};