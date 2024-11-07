import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../Services/user/user-service.service';
import { CreateUserDto } from '../../Dtos/UserDto/userDto';
import swal from 'sweetalert';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export default class UserComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _userService = inject(UserServiceService);
  private readonly _router = inject(Router);

  formGroup: FormGroup = this._formBuilder.group({
    username: '',
    email: '',
    password: ''
  });

  CreateUser(): void {
    const username: string = this.formGroup.get('username')?.value;
    const email: string = this.formGroup.get('email')?.value;
    const password: string = this.formGroup.get('password')?.value;

    const userData: CreateUserDto = {
      username,
      email,
      password
    };
    console.log(userData);

    this._userService.CreateUser(userData).subscribe(
      response => {
        swal('!EXITO', 'Usuario creado con exito', 'success');
        this.formGroup.reset();
        this._router.navigate(['/login']);
      },
      error => {
        swal('!Error', 'Error al crear el usuario', 'error');
        console.log(`Error al crear el usuario: ${error.message}`);
        this.formGroup.reset();
      }
    );
  }
}
