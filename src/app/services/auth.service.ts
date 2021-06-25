import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'environments/environment';

import { AuthResponse, User } from 'app/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public register(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.baseUrl}/users/register`, user);
  }

  public login(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.baseUrl}/login`, user);
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
