import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CronogramaService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
        this.url = GLOBAL.url;
    }

    getSedes(dato)
    {
        console.log("envia http");
        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        return this._http.post('http://localhost:3978/cronograma/getAllSedes',param,options).map(res => res.json());
    }
    getCronograma(dato){
        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/cronograma/getCronograma',param,options).map(res => res.json());
    }
    
    getTipoDeCronograma(){
       
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.get('http://localhost:3978/cronograma/getTipoDeCronograma',options).map(res => res.json());
        
    }
    getPlantillaCronograma(){
        
         let headers  = new Headers({'Content-Type' : 'application/json'});
         let options = new RequestOptions({headers:headers});
        
         return this._http.get('http://localhost:3978/cronograma/getPlantillaCronograma',options).map(res => res.json());
         
     }
    saveCronograma(obj){
       console.log("Llega al Query SERVICE");
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/cronograma/saveCronograma',param,options).map(res => res.json());
    }
    deleteCronograma(_id_cronograma){
        let obj = {val : _id_cronograma}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/cronograma/deleteCronograma',param,options).map(res => res.json());
    }
    saveCronogramaP(obj){
        console.log("Llega al Query SERVICE 2");
         let param = JSON.stringify(obj);
         let headers  = new Headers({'Content-Type' : 'application/json'});
         let options = new RequestOptions({headers:headers});
        
         return this._http.post('http://localhost:3978/cronograma/saveCronogramaP',param,options).map(res => res.json());
     }


}