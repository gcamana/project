import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { SharedConstants } from 'app/shared/shared.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TsrBankService {
    public url: string = 'http://'+SharedConstants.api.HOST+'/'+SharedConstants.modulos.TESORERIA.name+'/'+SharedConstants.modulos.TESORERIA.pages.CAJA+'/';

    constructor(
        public _http: Http
    ) { }

    getDataCaja(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDataCaja',params,{headers:headers})
                    .map(res => res.json());
    }

    usersShareCash(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
        'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'usersShareCash',params,{headers:headers})
                    .map(res => res.json());
    }

    getChartDataCaja(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getChartDataCaja',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataExcel(obj):Observable<Blob> {
        let params  = JSON.stringify(obj),
            headers = new Headers({
                        'Content-Type'  : 'application/json',
                        'Authorization' : obj.token
                      }),
            options = new RequestOptions({
                        headers: headers,
                        responseType: ResponseContentType.Blob
                      });

        return this._http.post(this.url+'getDataExcel',params,options)
                    .map((res) => {
                        return <Blob>res.blob()
                    });
    }

    getDataPdf(obj):Observable<Blob> {
        let params  = JSON.stringify(obj),
            headers = new Headers({
                        'Content-Type'  : 'application/json',
                        'Authorization' : obj.token
                      }),
            options = new RequestOptions({
                        headers: headers,
                        responseType: ResponseContentType.Blob
                      });

        return this._http.post(this.url+'getDataPdf',params,options)
                    .map((res) => {
                        return <Blob>res.blob()
                    });
    }

    saveCajaUser(obj){
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'shareCajaUser',params,{headers:headers})
                    .map(res => res.json());
    }

    getDataCajaGeneral(obj) {
        let params = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': obj.token
        });
        return this._http.post(this.url+'getDataCajaGeneral',params,{headers:headers})
                    .map(res => res.json());
    }
}