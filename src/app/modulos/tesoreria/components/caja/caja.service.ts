import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../../../objetos/Usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CajaService {
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

    getCaja(usuario, fecha, sede) {
        let obj = {
            usuario: usuario,
            fecha: fecha,
            sede: sede
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        // console.log(this.url+'getAllClients');
        var resultado = this._http.post('http://localhost:3978/caja/getDataCaja', param, options)
            .map(res => res.json());
        return resultado;
    }

    getDetalleByAccion(usuario, accion, fecha, sede) {
        let obj = {
            usuario: usuario,
            accion: accion,
            fecha: fecha,
            sede: sede
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/getDetalleByAccion', param, options)
            .map(res => res.json());
        return resultado;
    }

    deleteAudi(idAudi, correlativo) {
        let obj = {
            audi: idAudi,
            correlativo: correlativo
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/deleteAudi', param, options)
            .map(res => res.json());
        return resultado;
    }

    getEstadoCaja(usuario, fecha, sede) {
        let obj = {
            usuario: usuario,
            fecha: fecha,
            sede: sede
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/getEstadoCaja', param, options)
            .map(res => res.json());
        return resultado;
    }

    getMontoInicioCaja(usuario, fecha, sede) {
        let obj = {
            usuario: usuario,
            fecha: fecha,
            sede: sede
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/getMontoInicioCaja', param, options)
            .map(res => res.json());
        return resultado;

    }

    aperturarCaja(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/aperturarCaja', param, options)
            .map(res => res.json());
        return resultado;
    }

    cerrarCaja(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/caja/cerrarCaja', param, options)
            .map(res => res.json());
        return resultado;
    }
}