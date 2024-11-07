import { inject, Injectable } from '@angular/core';
import { environment } from "../../Environments/environments"
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../Dtos/LoginDto/loginDto';
import { Observable } from 'rxjs';
import { TokenDto } from '../../Dtos/Token/tokenDto';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly _enpoint = environment.loginUrl;
  private readonly _httpClient = inject(HttpClient);

  public LoginValidate(loginData: LoginDto): Observable<TokenDto>{
    return this._httpClient.post<TokenDto>(`${this._enpoint}`, loginData);
  }

}
