import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import { SharedConstants } from 'app/shared/shared.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TsrSettingsService {
    public url: string = 'http://' + SharedConstants.api.HOST + '/' + SharedConstants.modulos.TESORERIA.name + '/' + SharedConstants.modulos.TESORERIA.pages.CONFIGURACION + '/';
    constructor(public _http: Http) { }

    changeStatePartialPayment(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'changeStatePartialPayment', params, { headers: headers }).map(res => res.json());
    }

    changeStateCreditCard(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'changeStateCreditCard', params, { headers: headers }).map(res => res.json());
    }
}