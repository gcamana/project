import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class IndicadorDetalleService {
    private url = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.BSC.name+'/'+SharedConstants.modulos.BSC.pages.DETALLE_INDICADOR+'/';
    private url_gen = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.GENERAL+'/';
    constructor(private _http: Http) {

    }

    getDataTable(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDataTable', obj, {headers : headers}).map(res => res.json());
    }

    editMedicionJSON(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'editMedicionJSON', params, {headers : headers}).map(res => res.json());
    }

    getDataYears(datos){
        let params = JSON.stringify(datos);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': datos.token
        });
        return this._http.post(this.url+'getDataYears', params, {headers : headers}).map(res => res.json());
    }

    getSedesFromYear(datos){
        let params = JSON.stringify(datos);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': datos.token
        });
        return this._http.post(this.url+'getSedesFromYear', params, {headers : headers}).map(res => res.json());
    }

    filtrarComponentes(datos){
        let params = JSON.stringify(datos);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': datos.token
        });
        return this._http.post(this.url+'filtrarComponentes', params, {headers : headers}).map(res => res.json());
    }
    updateFreqMedi(datos) {
        let params = JSON.stringify(datos);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': datos.token
        });
        return this._http.post(this.url+'updateFreqMedi', params, {headers : headers}).map(res => res.json());
    }

    getDataIndi(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDataIndi', params, {headers : headers}).map(res => res.json());
    }

    decryptIndicador(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'decryptIndicador', params, {headers : headers}).map(res => res.json());
    }

    getDataHistoricoMedicion(data){
        let params = JSON.stringify(data);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': data.token
        });
        return this._http.post(this.url+'getDataHistoricoMedicion', params, {headers : headers}).map(res => res.json());
    }

    editHistoryTable(data){
        let params = JSON.stringify(data);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': data.token
        });
        return this._http.post(this.url+'editHistoryTable', params, {headers : headers}).map(res => res.json());
    }

    getAllSedes(data){
        let params = JSON.stringify(data);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': data.token
        });
        return this._http.post(this.url_gen+'getAllSedes', params, {headers : headers}).map(res => res.json());
    }

    getDataChartArea(data){
        let params = JSON.stringify(data);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': data.token
        });
        return this._http.post(this.url+'getDataChartArea', params, {headers : headers}).map(res => res.json());
    }

    getDataComparativa(data){
        let params = JSON.stringify(data);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': data.token
        });
        return this._http.post(this.url+'getDataComparativa', params, {headers : headers}).map(res => res.json());
    }
}