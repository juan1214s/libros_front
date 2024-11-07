import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginServiceService } from '../../Services/login/login-service.service';
import { LoginDto } from '../../Dtos/LoginDto/loginDto';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export default class LoginComponent {
  private readonly _loginService = inject(LoginServiceService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _route = inject(Router);

  formGroup: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required] 
  });

  LoginValidator(): void {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;

      const loginData: LoginDto = {
        email,
        password
      };

      this._loginService.LoginValidate(loginData).subscribe(
        token => {
          localStorage.setItem('token', token.accessToken);
          localStorage.setItem('idUser', token.idUsuario.toString());

          swal({
            title: "¡Éxito!",
            text: "Usuario autenticado",
            icon: "success",
            buttons: { confirm: { text: "Aceptar", value: true } }
          }).then(value => {
            if (value) {
              setTimeout(() => {
                this._route.navigate(['books'], { replaceUrl: true });
              }, 1000);
            }
          });
        },
        error => {
          console.error(error); 
          swal("¡Error!", "La Contraseña o Email son incorrectos", "error");
          this.formGroup.reset();
        }
      );
    } else {
      swal("¡Error!", "Por favor, complete todos los campos correctamente", "error");
    }
  }
}
