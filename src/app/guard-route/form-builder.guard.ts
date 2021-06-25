import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormBuilderGuard implements CanActivate {
  constructor(private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
      if (localStorage.getItem('token')) {
        return true;
      }

      this.router.navigateByUrl('/login');
      return false;
    }
}
