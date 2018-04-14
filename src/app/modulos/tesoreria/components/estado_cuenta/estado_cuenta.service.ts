import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EstadoCuentaService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
        
    }
    

    getDeudas(dato, dato2)
    {
        let obj  = {id_hijo : dato, ano : dato2};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/estado_cuenta/getDeudas',params,{headers:headers})
                    .map(res => res.json());
    }

    getHijos(dato)
    {
        let obj  = {cod_familia : dato};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/estado_cuenta/getAllHijos',params,{headers:headers})
                    .map(res => res.json());
    }

    getDetalleHijos (dato, dato2){
        let obj  = {id_hijo : dato, ano : dato2};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/estado_cuenta/getDetalleHijos',params,{headers:headers})
                    .map(res => res.json());
    }
   
}