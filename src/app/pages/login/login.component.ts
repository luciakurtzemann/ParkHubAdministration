import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../interfaces/login';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],                    /*para importar*/
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /**Router para movernos entre partes de la aplicación */
  router = inject(Router);
  auth = inject(AuthService);

  visible:boolean = false;

  datosLogin:Login = {
    username:"",
    password:""
  }

  /**Inicia sesión */
  login(){
    this.auth.login(this.datosLogin)
    .then( ok => {
      if(ok){
        this.router.navigate(["/estado-cocheras"]);
      }else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrectos",
        });
      }
    });
  }

  cambiarVisibilidad(){
      this.visible = !this.visible;
  }
}
