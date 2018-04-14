import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { SharedConstants } from 'app/shared/shared.constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TsrReportsService {
    public url: string = '';

    constructor(
        public _http: Http
    ) { }
}