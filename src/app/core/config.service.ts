import { Injectable } from "@angular/core";

let ENV = 'local';
let IP = '192.168.0.12';
let PORT = 3000;

@Injectable()

export class ConfigService {
    BASE_URL: string;
    constructor() {
        this.BASE_URL = this._getBaseUrl();
    }

    private _getBaseUrl(): string {
        let urls = {
            local: `http://${IP}:${PORT}/`,
            dev: '',
            production: ''
        };

        return urls[ENV];
    }
}