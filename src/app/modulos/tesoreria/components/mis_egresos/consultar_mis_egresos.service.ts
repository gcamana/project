import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConsultarMisEgresosService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
        
    }
    
    getEgresos(dato, dato2, dato3)
    {
        let obj  = {p_nid_persona : dato, fecha_inicio : dato2, fecha_fin : dato3};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/consultar_mis_egresos/getEgresos',params,{headers:headers})
                    .map(res => res.json());
    }
    
    getTicket(dato,dato2)
    {
        let obj = {id_persona : dato, id_movimiento: dato2};

        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        return this._http.post('http://localhost:3978/consultar_mis_egresos/getTicket',params,{headers:headers})
                    .map(res => res.json());
    }
    
}