import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class EgresoService{
    public url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.EGRESOS+'/';
    
    constructor(
        public _http: Http
    ){
    }
   
    getEgresos(obj) {
        let param   = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
		let options = new RequestOptions({headers:headers});
      
        return this._http.post(this.url+'getEgreso',param,options).map(res => res.json());
    }
    getConceptos(obj) {
        let param   = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        let options = new RequestOptions({headers:headers});
       
        return this._http.post(this.url+'getConcepto',param,options).map(res => res.json());
    }
    saveEgreso(obj){
       
        let param   = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        let options = new RequestOptions({headers:headers});
       
        return this._http.post(this.url+'saveEgreso',param,options).map(res => res.json());
    }
    updateEgreso(obj){
        
        let param   = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        let options = new RequestOptions({headers:headers});
       
        return this._http.post(this.url+'updateEgreso',param,options).map(res => res.json());
    }
  }
