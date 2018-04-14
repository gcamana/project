import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class Detalle_CronogramaService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
    }
   
    getDetalleCronograma(dato) {
        console.log("envia http "+dato);

        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/detalle_cronograma/getDetalleCronograma',param,options).map(res => res.json());
    }
    getTipoCuota(dato) {
        console.log("envia http "+dato);

        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/detalle_cronograma/getTipoCuota',param,options).map(res => res.json());
    }
    getCuotaXMes(dato) {
        console.log("envia http "+dato);

        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/detalle_cronograma/getCuotaXMes',param,options).map(res => res.json());
    }
    deleteDetalleCronograma(dato) {
        
        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/detalle_cronograma/deleteDetalleCronograma',param,options).map(res => res.json());
    }
    createDetalleCronograma(json) {
        
        let param = JSON.stringify(json);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post('http://localhost:3978/detalle_cronograma/createDetalleCronograma',param,options).map(res => res.json());
    }
    updateDetalleCronograma(json) {
        
        let param = JSON.stringify(json);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post('http://localhost:3978/detalle_cronograma/updateDetalleCronograma',param,options).map(res => res.json());
    }
    updateFlagCronograma(json) {
        
        let param = JSON.stringify(json);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post('http://localhost:3978/detalle_cronograma/updateFlagCronograma',param,options).map(res => res.json());
    }
    updateCuotaXMes(json) {
        
        let param = JSON.stringify(json);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post('http://localhost:3978/detalle_cronograma/updateDetalleCronograma',param,options).map(res => res.json());
    }
    verificarDetalleMovimiento(dato) {
        console.log("envia http "+dato);

        let obj = {val : dato}
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.post('http://localhost:3978/detalle_cronograma/verificarDetalleMovimiento',param,options).map(res => res.json());
    }

    updateBecaDetalleCronograma(flgB,idDC) {
        let obj = {flg_beca: flgB,
                   id_detalle_cronograma: idDC};
        let param = JSON.stringify(obj);
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post('http://localhost:3978/detalle_cronograma/updateBecaDetalleCronograma',param,options).map(res => res.json());
    }
  }