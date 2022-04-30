import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from '../interfaces/user';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'http://localhost:3000/';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || "[]"));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    // TODO: rebuild user from validated token here to avoid localstorage tampering
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.httpClient.post(this.baseURL + 'users', user);
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(this.baseURL + 'login', { email, password })
      .pipe(map(response => {
        let user = {} as User;
        // login exitoso si hay a jwt token en el response
        // and if that token is valid y si el token es valido
        if (response && response.accessToken) {
          let decodedToken = helper.decodeToken(response.accessToken);
          // Build up a user
          user.token = response.accessToken;
          user.email = decodedToken.email;
          user.id = Number(decodedToken.sub);

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser','false');  
    // this.currentUserSubject.next(null);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    
    console.log('out');
    return this.currentUser

  }
}
