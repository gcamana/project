import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../../../objetos/Usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DevolucionService {
    public usuario: Usuario;
    _usuario: Observable<any> = null;
    public url: string;

    constructor(private _http: Http) {
        this.url = 'https://randomuser.me/api/';
    }

    setValores(user) {
        this._usuario = user;
    }

    __getUserData(__id_user) {
        if (!this._usuario) {
            this._usuario = this._http.get(this.url).map(res => res.json());
        }
        return this._usuario;
    }

    getDetalleColaborador(usuario, sede) {
        let obj = {
            usuario: usuario,
            sede: sede
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        // console.log(this.url+'getAllClients');
        var resultado = this._http.post('http://localhost:3978/devolucion/getDetalleColaborador', param, options)
            .map(res => res.json());
        return resultado;
    }

    registrarDevolucion(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        // console.log(this.url+'getAllClients');
        var resultado = this._http.post('http://localhost:3978/devolucion/registrarDevolucion', param, options)
            .map(res => res.json());
        return resultado;

    }

}
