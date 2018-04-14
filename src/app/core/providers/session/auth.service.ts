import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


let END_POINT = 'https://store_api.smiledu.pe/Service';
@Injectable()
export class AuthService {
    constructor(
        private _http: HttpClient,

    ) { }

    getDomain(domain) {
        let headers = new Headers({ 'Authorization': 'token' });
        let options = new RequestOptions({ headers: headers });
        let requestUrl = `${END_POINT}/getParamsByCole?dominio=${domain}`;

        return this._http.get(requestUrl)
            .map(response => {
                if (response["code"] == 200) return response["response"];
            });
    }

    validateUsername(username: string): Observable<boolean> {

        let query = 'https://api.github.com/users/gcamana';

        return this._http.get<boolean>(query)
            .map((data: any) => {
                if (data) return data;
                else throw data;
            });
    }



    getModules() {
        let requestUrl = 'https://store_api.smiledu.pe/service/getSistemas?bd=avantgard'
        return this._http.get(requestUrl)
            .map(response => {
                if (response["code"] == 200) return response["response"];
            });
    }

    login() {
        let requestUrl = 'https://store_api.smiledu.pe/service/getDatosLogin?bd=avantgard&user=mfloresg&pass=Marco123'
        return this._http.get(requestUrl)
            .map(response => {
                if (response["code"] == 200) return response["response"];
            });
    }
}