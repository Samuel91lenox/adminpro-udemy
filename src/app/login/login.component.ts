import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugin();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean = false;
  email:string;
  auth2:any;

  constructor(
    public router:Router,
    public _servicioUsuario: UsuarioService
  ) { }

  ngOnInit() {
    init_plugin();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if(this.email.length>0){
      this.recuerdame=true;
    }
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '869511205827-8m5ftpi5v0q9di18nt453j8ir7l7sa84.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      
        this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);
      let token = googleUser.getAuthResponse().id_token;
       console.log(token);
       this._servicioUsuario.loginGoogle(token)
         .subscribe(()=>window.location.href='#/dashboard');

      
    });
  }


  ingresar(forma:NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null,forma.value.email,forma.value.password);

    this._servicioUsuario.login(usuario, forma.value.recuerdame)
    .subscribe(correcto => this.router.navigate(['/dashboard']));
  }
}
