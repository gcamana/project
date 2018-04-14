import { Injectable } from "@angular/core";

export interface IAccessParams {
    accessToken?: string;
}
const TOKEN_NAMES = {
    ACCESS: 'access-auth',
};

@Injectable()
export class HeadersService {
    build(params?: IAccessParams) {
        let headers = {
            'Content-Type': 'Application/json'
        };
        if (params.accessToken) headers[TOKEN_NAMES.ACCESS] = params.accessToken;
        return headers;
    }
}