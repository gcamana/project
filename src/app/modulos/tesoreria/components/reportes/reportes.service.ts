import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportesService{
	public url: string;

	constructor(
		public _http: Http
	){

	}
	
getTipoDeCronograma(){
        //console.log("envia http getTipoCronograma");
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.get('http://localhost:3978/reportes/getTipoDeCronograma',options).map(res => res.json());
        
}

getSede(){
        //console.log("envia http getTipoCronograma");
        let headers  = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers:headers});
       
        return this._http.get('http://localhost:3978/reportes/getSede',options).map(res => res.json());
        
}
getPensionesByFecha(obj) {
    //console.log(obj);
    let params = JSON.stringify(obj);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.post('http://localhost:3978/reportes/getPensionesByFecha',params,options).map(res => res.json());
}
getPensiones(obj) {
    //console.log(obj);
    let params = JSON.stringify(obj);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.post('http://localhost:3978/reportes/getpensiones',params,options).map(res => res.json());
}
getPagosPuntuales(obj){
    let params = JSON.stringify(obj);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    console.log("pagos puntuales");
    return this._http.post('http://localhost:3978/reportes/getPagosPuntuales',params,options).map(res => res.json());
}

getTipoCuotaById(id_cronograma){
	let obj = { val : id_cronograma }
    let param = JSON.stringify(obj);
    let headers  = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers:headers});
      
    return this._http.post('http://localhost:3978/reportes/getTipoCuotaById',param,options).map(res => res.json());
}

getGradoById(id_cronograma){
	let obj = { val : id_cronograma }
    let param = JSON.stringify(obj);
    let headers  = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers:headers});
      
    return this._http.post('http://localhost:3978/reportes/getGradoById',param,options).map(res => res.json());
}

getAulasByGradoCronograma(obj){
    let param = JSON.stringify(obj);
    let headers  = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers:headers});
      
    return this._http.post('http://localhost:3978/reportes/getAulasByGradoCronograma',param,options).map(res => res.json());
}

getDetalleEstudiante(_id_persona, _id_tipoCuota){
            let obj = { id_persona        : _id_persona,
                        id_tipoCuota   :  _id_tipoCuota};
                        console.log(obj);
    let param = JSON.stringify(obj);
    let headers  = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers:headers});
    
    return this._http.post('http://localhost:3978/reportes/getDetalleEstudiante',param,options).map(res => res.json());
}    

}

