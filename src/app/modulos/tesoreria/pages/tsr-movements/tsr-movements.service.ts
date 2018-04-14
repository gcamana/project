import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class TsrMovementsService{
    public urlMOV: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.MOVIMIENTOS+'/';
    public urlING: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.INGRESOS+'/';
    public urlEGR: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.EGRESOS+'/';

    constructor(
        public _http: Http
    ){

    }

    getUsersFilter(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'getUsersFilter',params,{headers:headers})
                    .map(res => res.json());
    }

    getHistoricBySecretary(obj){
        console.log(obj);
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'getLastMovements',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataMovements(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'getMovementsByUser',params,{headers:headers})
                    .map(res => res.json());
    }

    personalInfoUser(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'personalInfoUser',params,{headers:headers})
                    .map(res => res.json());
    }

    filterMovimientosByFlg(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'filterMovimientosByFlg',params,{headers:headers})
                    .map(res => res.json());
    }

    saveComp(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'saveCompromiso',params,{headers:headers})
                    .map(res => res.json());
    }

    anularEgreso(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'anularEgreso',params,{headers:headers})
                    .map(res => res.json());
    }

    actionCaja(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'actionCaja',params,{headers:headers})
                    .map(res => res.json());
    }

    saveReturnMoney(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'saveReturnMoney',params,{headers:headers})
                    .map(res => res.json());
    }

    cancelCommitment(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlMOV+'cancelCommitment',params,{headers:headers})
                    .map(res => res.json());
    }
    
    getDocumentsByMovement(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'getDocumentsByMovement',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataDocumentPrint(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'downloadDocumentByTipo',params,{headers:headers})
                    .map(res => res.json());
    }

    cancelDocumentByType(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'cancelDocumentByType',params,{headers:headers})
                    .map(res => res.json());
    }

    getInfoMovement(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'getInfoMovement',params,{headers:headers})
                    .map(res => res.json());
    }

    assingRemovePromotion(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'assingRemovePromotion',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataBeca(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        console.log(obj);
        console.log(this.urlING+'getDataBeca');
        return this._http.post(this.urlING+'getDataBeca',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataConceptos(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'getDataConceptos',params,{headers:headers})
                    .map(res => res.json());
    }

    insertConcept(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'insertConcept',params,{headers:headers})
                    .map(res => res.json());
    }

    getProvidersData(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlEGR+'getProveedoresData',params,{headers:headers})
                    .map(res => res.json());
    }

    saveFactura(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.urlING+'saveFactura',params,{headers:headers})
                    .map(res => res.json());
    }
}