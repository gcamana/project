import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BecaService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
    }
   
    getBecas() {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/beca/getBecas','{}',options).map(res => res.json());
    }

    getEstudiantes(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this._http.post('http://localhost:3978/beca/getEstudiantes',params,options).map(res => res.json());
    }

    getAnhios() {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this._http.post('http://localhost:3978/beca/getAnhios','{}',options).map(res => res.json());
    }
    RegistrarBeca(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this._http.post('http://localhost:3978/beca/RegistrarBeca',params,options).map(res => res.json());
    }
    AnularBeca(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this._http.post('http://localhost:3978/beca/AnularBeca',params,options).map(res => res.json());
    }
  }