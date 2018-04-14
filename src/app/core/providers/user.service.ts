import { CommonService } from "../common.service";
import { HeadersService } from "../headers.service";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../base.service";
import { OwnerIdentityService } from "./session/owner-identity.service";

import { Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

let nextId = 1;
let END_POINT = 'api/users/';
export class UserServiceConfig {
    userName = "John Doe";
}

@Injectable()
export class UserService extends BaseService<any>{
    id = nextId++;

    private _userName = "Sherlock Holmes";

    constructor(
        @Optional() config: UserServiceConfig,
        private _http: HttpClient,
        private _headerSrv: HeadersService,
        private _commonSrv: CommonService
    ) {
        super(END_POINT, _http, _headerSrv, _commonSrv)
        if (config) { this._userName = config.userName };
    }

    get userName() {
        const suffix = this.id > 1 ? ` times ${this.id}` : '';
        return this._userName + suffix;
    }

    getUserById(_id: string): Observable<any> {
        let requestUrl = this._commonSrv_.buildApiUrl(END_POINT, _id);

        return this._http_.get(requestUrl)
            .map((data: any) => {
                if (data.success) return data.result;
                else throw data.error;
            });
    }

    getProfessionalTeam(userId: string): Observable<any[]> {
        let requestUrl = this._commonSrv_.buildApiUrl(END_POINT, 'connected', userId);

        return this._http_.get(requestUrl)
            .map((data: any) => {
                if (data.success) return data.result;
                else throw data.error;
            })
    }

}