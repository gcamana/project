import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { HeadersService } from "./headers.service";
import { CommonService } from "./common.service";
// import { IdentityService } from './providers/session/identity.service';

export const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

export class BaseService<T>{
    private _accessToken: string;
    constructor(
        protected _endPoint_: string,
        protected _http_: HttpClient,
        protected _headersSrv_: HeadersService,
        protected _commonSrv_: CommonService
    ) { }

    query(criteria: any = {}, lastRoute: string = ''): Observable<T[]> {
        let url = this._commonSrv_.normalizeQuery(this._endPoint_ + lastRoute, criteria);
        return this.request(url, METHODS.GET);
    }

    getById(_id: string): Observable<T> {
        let url = this._commonSrv_.buildApiUrl(this._endPoint_, _id);
        return this.request(url, METHODS.GET);
    }

    getOne(criteria: any = {}, lastRoute: string = 'one'): Observable<T> {
        let url = this._commonSrv_.normalizeQuery(this._endPoint_ + lastRoute, criteria);
        return this.request(url, METHODS.GET);
    }


    count(criteria: any = {}, lastRoute: string = ''): Observable<number> {
        let url = this._commonSrv_.normalizeQuery(this._endPoint_ + lastRoute, criteria);
        return this.request(url, METHODS.GET);
    };

    save(item: any): Observable<T> {
        if (!item._id) return this.create(item);
        return this._update(item);
    }

    private create(item: any): Observable<T> {
        let url = this._commonSrv_.buildApiUrl(this._endPoint_);
        return this.request(url, METHODS.POST, item);
    }

    private _update(item: any): Observable<T> {
        let url = this._commonSrv_.buildApiUrl(this._endPoint_, item._id);
        return this.request(url, METHODS.PUT, item);
    }

    remove(_id: string): Observable<T> {
        let url = this._commonSrv_.buildApiUrl(this._endPoint_, _id);
        return this.request(url, METHODS.DELETE);
    }

    setAccessToken(accessToken: string): void {
        this._accessToken = accessToken;
    }

    request(url: string, method: string = METHODS.GET, item: any = {}): Observable<any> {
        let options = {
            headers: this._getHeaders()
        };

        let httpMethod = this._http_[method](url, options);

        if (method === METHODS.POST || method === METHODS.PUT) {
            httpMethod = this._http_[method](url, item, options);
        }

        return httpMethod.map(data => {
            if (data.success) return data.result;
            else throw data.error;
        });
    }

    private _getHeaders() {
        return this._headersSrv_.build({
            accessToken: this._accessToken
        });
    }
}

