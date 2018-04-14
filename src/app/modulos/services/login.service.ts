import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class LoginService {
    public url : string;
    
    constructor(private _http : Http) {
        this.url = 'https://randomuser.me/api/';
    }

    getUsuarios() {
        return this._http.get(this.url).map(res => res.json());
    }

    loginUsuario(obj){
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/usuario/loginUsuario',param,options).map(res => res.json());
    }

    reloadSession(obj){
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/usuario/reloadSession',param,options).map(res => res.json());
    }
}