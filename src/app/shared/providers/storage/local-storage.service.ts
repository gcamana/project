import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    set(key: string, data: any): void {
        if (typeof data !== 'object') localStorage.setItem(key, data);
        else localStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string, isClear: boolean = false) {
        let JSONStr = localStorage.getItem(key);
        let isJSONValid = JSONStr && JSONStr != 'undefined';

        if (isClear) this.remove(key);

        try {
            return isJSONValid ? JSON.parse(JSONStr) : undefined;
        } catch (e) {
            return JSONStr;
        }
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

}