import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PensionesService {
    public url: string;

    constructor(
        public _http: Http
    ) {

    }

    getPensiones(year) {
        let obj = { year: year };
        let param = JSON.stringify(obj);
        let headers = new Headers({ 'Contenxt-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/pensiones/getPensionesBySede', param, options).map(res => res.json());
        return resultado;

    }
    getTipoDeNivel(_nid_sede, _year) {
        //console.log("llega "+_year);
        let obj = {
            nid_sede: _nid_sede,
            year: _year
        };
        let param = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:3978/pensiones/getTipoDeNivel', param, options).map(res => res.json());

    }

    ObtenerMontoSede(_year) {
        let obj = { year: _year };
        let param = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        //console.log(this.url+'getDatosMonto');
        var resultado = this._http.post('http://localhost:3978/pensiones/getDataMonto', param, options).map(res => res.json());

        return resultado;
    }

    updateMontoPension(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/pensiones/updateMontoPension', param, options).map(res => res.json());
        return resultado;
    }

}