import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public token = localStorage.getItem('token');

  isAuth() {
    this.token = localStorage.getItem('token');
    return this.token!.length > 0
  }


}
