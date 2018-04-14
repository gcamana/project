import { Component, ElementRef, AfterViewInit, VERSION, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../modulos/services/login.service';
import { UserService } from '../modulos/services/user.service';
import { Usuario } from '../objetos/Usuario';
import { MatSnackBar } from '@angular/material';
declare const gapi: any;
declare const FB: any;

@Component({
  selector: 'login',
  styleUrls: ['login.scss'],
  templateUrl: './login.component.html',
  providers : [ LoginService ]
})
export class LoginComponent {
    username = null;
    password : String;
    public usuario : Usuario;
    private googleClientId:string = '468871290267-39ahcght2lhnmbcvmanqd3akac5bj0j6.apps.googleusercontent.com';
    private fbClientId:string = '731548190304462';
    zoneImpl: NgZone;

    private scope = [
      'profile',
      'email',
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/contacts.readonly',
      'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');
  
    public auth2: any;
    
    public googleInit() {
        //https://developers.google.com/identity/sign-in/web/build-button
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.googleClientId,
                cookiepolicy: 'single_host_origin',
                scope: this.scope
            });
            this.attachSignin(this.element.nativeElement.querySelector('#btnGoogle'));
        });
    }

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            let profile = googleUser.getBasicProfile();
            console.log('Token: ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            let obs = Observable.of(new Usuario(profile.getName(), profile.getEmail(), null, null,null,null,false,null));
            this._userService.setValores(obs);
            this.zoneImpl.run(() => this._router.navigate(['/base', { outlets : { mod : ['modulo'] } } ]) );
          }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
          });
    }

    public facebookInit() {
        FB.init({
            appId            : this.fbClientId,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.5'
        });
    }

    onFacebookLogin() {
        //https://developers.facebook.com/docs/facebook-login/web
        FB.login((response) => {
            console.log(response);
            if(response.status === 'connected') {
                this.getDataFBUser();
            }
        }, {scope: 'public_profile,email,user_friends'});
    }

    getDataFBUser() {
        FB.api('/me', (response) => {
            let obs = Observable.of(new Usuario(response.name, response.id, null, null,null,null,false,null));
            this._userService.setValores(obs);
            this.zoneImpl.run(() => this._router.navigate(['/base', { outlets : { mod : ['modulo'] } } ]) );
        });
    }

    constructor(
        private element: ElementRef,
        private _router : Router,
        private _loginService : LoginService,
        public  _userService  : UserService,
        zone: NgZone,
        private user:UserService,
        private snackBar: MatSnackBar
    ){
        if(this.user.getUserLoggedIn()){
            this._router.navigate(['/base', { outlets : { mod : ['modulo'] } } ]);
        }
        this.zoneImpl = zone;
    }

    logear() {
        var obj = {usuario: this.username, pass : this.password};
        this._loginService.loginUsuario(obj).subscribe(
            result => {
                if(result.error != 1){
                    this.user.setUserLoggedIn(result);
                    sessionStorage.persona   = result.nid_persona;
                    sessionStorage.flg_padre = result.flg_padre;
                    this._router.navigate(['/base']);
                } else{
                    this.snackBar.open(result.msj,'OK',{duration: 2000});  
                }

            },
            error => {
                console.log(<any>error);
            }
        );
    }

    statusChangeCallback(resp) {
        if(resp.status === 'conected') {
            console.log('conectado a fb');
        } else if(resp.status === 'not_authorized') {
            console.log('no autorizado a conectar a fb');
        } else {
            console.log('else fb');
        }
    }

    ngOnInit() {
        sessionStorage.removeItem('persona');
        sessionStorage.removeItem('flg_padre');
        /*FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });*/
    }

    ngAfterViewInit() {
        //this.googleInit();
        //this.facebookInit();
    }
 
    
}