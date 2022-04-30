import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    // Redirigir al login cuando el usuario no se ha logeado
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;
    // console.log(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser') != 'false') {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

}
