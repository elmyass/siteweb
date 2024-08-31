import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  async get(url: string): Promise<Observable<any>> {
    const token = await this.keycloakService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers });
  }
// POST request
post(url: string, body: any): Observable<any> {
  return from(this.keycloakService.getToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(url, body, { headers });
    })
  );
}

// PUT request
put(url: string, body: any): Observable<any> {
  return from(this.keycloakService.getToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put(url, body, { headers });
    })
  );
}

// DELETE request
delete(url: string): Observable<any> {
  return from(this.keycloakService.getToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete(url, { headers });
    })
  );
}

}
