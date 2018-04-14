import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmpresaService{
    public url: string;
    
    constructor(
        public _http: Http
    ){
      
    }

  /*conget  getClientes(){
        console.log(this.url+'getAllClients');
        return this._http.get('http://localhost:3978/smiledu/getAllClients').map(res => res.json());
    }
*/
 
    getAllInfoBanco(infoEmpresa){
        console.log(this.url+'getAllInfoBanco');
         let params=JSON.stringify(infoEmpresa);
         console.log(params);
                 let headers=new Headers({
            'Content-Type':'application/json'
        })
        return this._http.post('http://localhost:3978/empresa/getAllInfoBanco',params,{headers:headers}).map(res => res.json());
    }

        importarArchivo(infoBanco){
         let params=JSON.stringify(infoBanco);
         console.log(params);
                 let headers=new Headers({
            'Content-Type':'application/json',
        })
        return this._http.post('http://localhost:3978/empresa/importarArchivo',params,{headers:headers}).map(res => res.json());
    }
    insertEmpresa(nuevaEmpresa){
        console.log(this.url+'insertEmpresa');
        let params=JSON.stringify(nuevaEmpresa);
        console.log(nuevaEmpresa.nombre);
        let headers=new Headers({
            'Content-Type':'application/json'
        })

        return this._http.post('http://localhost:3978/empresa/insertEmpresa',params,{headers:headers}).map(res => res.json());
    }

    getAllSedexEmpresa(){
        let headers = new Headers({ 'Authorization': 'token'});
        let options = new RequestOptions({ headers: headers});
        return this._http.get('http://localhost:3978/empresa/getAllSedexEmpresa',options).map(res => res.json());
    }
}