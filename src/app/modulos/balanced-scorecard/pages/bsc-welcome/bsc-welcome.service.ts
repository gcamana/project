import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class BscWelcomeService {
    public url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.BSC.name+'/'+SharedConstants.modulos.BSC.pages.MAIN+'/';

    constructor(
        public _http: Http
    ) { }

    validateToken(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'validateToken',params,{headers:headers})
                    .map(res => res.json());
    }
}