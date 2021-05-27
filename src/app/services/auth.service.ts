import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponse, User } from 'app/interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.baseUrl}/users/register`, user);
  }

  public login(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.baseUrl}/login`, user);
  }
}
