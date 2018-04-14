import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';
import 'rxjs/add/operator/map';


@Injectable()
export class BscSelfIndicatorService {
    private url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.BSC.name+'/'+SharedConstants.modulos.BSC.pages.DASHBOARD+'/';
    constructor(private _http: Http) {

    }

    getDashResp(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDashResp',params,{headers: headers})
                         .map(res => res.json());
    }

    firstLoadPage(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'onInitView',params,{headers: headers})
                         .map(res => res.json());
    }

    getYearsByPEI(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getYearsPEI',params,{headers: headers})
                         .map(res => res.json());
    }
    
    getTiposBSC(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getTiposBSC',params,{headers: headers})
                         .map(res => res.json());
    }

    getSedesTipo(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getSedesTipo',params,{headers: headers})
                         .map(res => res.json());
    }

    getSedesArea(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getSedesArea',params,{headers: headers})
                         .map(res => res.json());
    }

    setValuePersp(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'setValuePersp',params,{headers: headers})
                         .map(res => res.json());
    }
    
    setValueObj(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'setValueObj',params,{headers: headers})
                         .map(res => res.json());
    }

    setValueBSC(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'setValueBSC',params,{headers: headers})
                         .map(res => res.json());
    }
    
    getRespInd(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getRespInd',params,{headers: headers})
                         .map(res => res.json());
    }

    saveRespIndi(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'saveRespIndi',params,{headers: headers})
                         .map(res => res.json());
    }

    savePesoPersp(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'savePesoPersp',params,{headers: headers})
                         .map(res => res.json());
    }

    savePesoObj(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'savePesoObj',params,{headers: headers})
                         .map(res => res.json());
    }

    savePesoInd(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'savePesoInd',params,{headers: headers})
                         .map(res => res.json());
    }

    removeResp(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'removeResp',params,{headers: headers})
                         .map(res => res.json());
    }
}