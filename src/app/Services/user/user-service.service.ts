import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environments';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto } from '../../Dtos/UserDto/userDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly _endPoint = environment.userUrl;
  private readonly _httpClient = inject(HttpClient);

  public CreateUser(dataUser: CreateUserDto): Observable<any>{
    const body = {
      username: dataUser.username,
      email: dataUser.email,
      password: dataUser.password
    };

    return this._httpClient.post<void>(`${this._endPoint}`, body);
  }
}
