import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GestionarConceptosService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
        
    }


    getConceptos(){
        let obj = {};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/gestionar_conceptos/getConceptos',params,{headers:headers})
                    .map(res => res.json());
    }

    editConceptos(_id_concepto, _monto_referencia)
    {
        let obj  = {id_concepto : _id_concepto, monto_referencia : _monto_referencia};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        var resultado = this._http.post('http://localhost:3978/gestionar_conceptos/editConceptos',params,{headers:headers})
                    .map(res => res.json());
        return resultado;
    }

    setConceptos(_desc_concepto, _monto_referencia, _tipo_concepto)
    {
        let obj  = { desc_concepto : _desc_concepto, monto_referencia : _monto_referencia, tipo_concepto : _tipo_concepto};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/gestionar_conceptos/setConceptos',params,{headers:headers})
                    .map(res => res.json());
    }

    getListTipos()
    {
        let obj  = {};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/gestionar_conceptos/getListTipos',params,{headers:headers})
                    .map(res => res.json());
    }

    deleteConceptos(_id_concepto)
    {
        let obj  = {id_concepto : _id_concepto};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/gestionar_conceptos/deleteConceptos',params,{headers:headers})
                    .map(res => res.json());
    }

}