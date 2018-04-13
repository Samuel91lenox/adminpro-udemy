import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public router: Router,public _usuarioService: UsuarioService) {
    
  }


  canActivate(){

  // console.log('Paso por el login Guard');

   if(this._usuarioService.estaLogueado()){
    //  console.log('PASO EL GUARD');
     return true;
    }else{
      console.log('BLoqueado por el guard');
      this.router.navigate(['/login']);
      return false;
      
    }
  }
}
