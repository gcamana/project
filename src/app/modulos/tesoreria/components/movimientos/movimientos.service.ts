import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class MovimientosService{
    public url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.MOVIMIENTOS+'/';

    constructor(
        public _http: Http
    ){
        console.log(this.url);
    }

    getEstudiantes(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });

        return this._http.post(this.url+'getEstudiantes',params,{headers:headers})
                    .map(res => res.json());
    }

    getColaboradores(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });

        return this._http.post(this.url+'getColaboradores',params,{headers:headers})
                    .map(res => res.json());
    }
    getYears(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getYears',params,{headers:headers})
                    .map(res => res.json());
    }
    //-------------------NUEVO DISEÑO
    getUsersFilter(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getUsersFilter',params,{headers:headers})
                    .map(res => res.json());
    }
}