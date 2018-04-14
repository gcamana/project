import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "../../../core/base.service";
import { HeadersService } from "../../../core/headers.service";
import { CommonService } from "../../../core/common.service";
import { ConfigService } from "../../../core/config.service";
import { OwnerIdentityService } from "../../../core/providers/session/owner-identity.service";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

let END_POINT = 'api/apps';
@Injectable()

export class OwnerService extends BaseService<any>{
    constructor(
        private _http: HttpClient,
        private _headersSrv: HeadersService,
        private _commonSrv: CommonService,
        private _ownerIdentitySrv: OwnerIdentityService
    ) {
        super(END_POINT, _http, _headersSrv, _commonSrv);
    }

    getByDomainName(): Observable<any> {
        return super.getOne({ domainName: this._ownerIdentitySrv.user.domain }, 'web/owner');
    }
}
