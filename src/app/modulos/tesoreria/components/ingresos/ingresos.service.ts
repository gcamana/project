import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class IngresosService{
    public url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.INGRESOS+'/';

    constructor(
        public _http: Http
    ){
        
    }

    getCompromisos(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });

        return this._http.post(this.url+'getCompromisos',params,{headers:headers})
                    .map(res => res.json());
    }

    getFamiliaresByEstu(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        console.log(obj);
        return this._http.post(this.url+'getFamiliaresByEstu',params,{headers:headers})
                    .map(res => res.json());
    }

    pagarCompromisos(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });

        return this._http.post(this.url+'pagarCompromisos',params,{headers:headers})
                    .map(res => res.json());
    }

    saveCompromiso(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        
        return this._http.post(this.url+'saveCompromiso',params,{headers:headers})
                    .map(res => res.json());
    }

    anularCompromiso(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        
        return this._http.post(this.url+'anularCompromiso',params,{headers:headers})
                    .map(res => res.json());
    }
    
}