import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Usuario } from '../../objetos/Usuario';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    public usuario : Usuario;
    _usuario : Observable<any> = null;
    public url : string;
    public sedeTrabajo = null;
    public persona     = null;
    constructor(private _http : Http) {
        this.url = 'https://randomuser.me/api/';
        this.isUserLoggedIn = false;
        
    }
  
    setValores(user) {
        this._usuario = user;
    }

    __getUserData(__id_user) {
        if(!this._usuario) {
            this._usuario = this._http.get(this.url).map(res => res.json());
        }
        return this._usuario;
    }

    setUserLoggedIn(session){
        this.isUserLoggedIn  = true;
        this.usuario = new Usuario(session.nombre_abvr, session.correo_admi, session.id_sede_control, session.nid_persona, session.desc_cargo, session.id_cargo, session.flg_padre, session.cod_familia);
    }

    getUserLoggedIn(){
        return this.isUserLoggedIn;
    }   

    reloadSession(obj){
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/usuario/reloadSession',param,options).map(res => res.json());
    }
}