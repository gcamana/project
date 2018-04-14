import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import { SharedConstants } from 'app/shared/shared.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TsrMigrationService {
    public url: string = 'http://' + SharedConstants.api.HOST + '/' + SharedConstants.modulos.TESORERIA.name + '/' + SharedConstants.modulos.TESORERIA.pages.MIGRACION + '/';
    constructor(public _http: Http) { }

    getDataBank(obj) {
        let params  = JSON.stringify(obj),
            headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDataBanco', params, { headers: headers }).map(res => res.json());
    }

    fileTxtChangeEvent(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'uploadTxtBanco', params, { headers: headers }).map(res => res.json());
    }

    downloadFileExportBank(data_req:any, obj):Observable<Blob> {
        let body    = {data_req:data_req, token : obj.token},
            headers = new Headers({'Content-Type' : 'application/json', 'Authorization': obj.token}),
            options = new RequestOptions({
          headers: headers, 
          responseType: ResponseContentType.Blob
        });
        return this._http.post(this.url+'downloadFileExportBank',body,options).map(
            (res) => {
                return <Blob>res.blob()
            }
        );
    }

    uploadPayments(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'uploadPayments', params, { headers: headers }).map(res => res.json());
    }

    companyByBank(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'companyByBank', params, { headers: headers }).map(res => res.json());
    }

    yearByDocumentos(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'yearByDocumentos', params, { headers: headers }).map(res => res.json());
    }

    getMonthByYear(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'getMonthByYear', params, { headers: headers }).map(res => res.json());
    }

    exportTXTSiscont(obj) {
        let params = JSON.stringify(obj),
            headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': obj.token }),
            options = new RequestOptions({
                headers: headers,
                responseType: ResponseContentType.Blob
            });
        return this._http.post(this.url + 'exportTXTSiscont', params, options).map((res) => {
            return <Blob>res.blob()
        });
    }

    lastInfoMigracion(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'lastInfoMigracion', params, { headers: headers }).map(res => res.json());
    }

    infoMigratioLast(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'infoMigratioLast', params, { headers: headers }).map(res => res.json());
    }

    getEmpresasByMonth(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url + 'getEmpresasByMonth', params, { headers: headers }).map(res => res.json());
    }
}