import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { SharedConstants } from '../../../shared/shared.constants';

@Injectable()
export class OwnerStorageService {

    constructor(
        private _localStorageSrv: LocalStorageService
    ) { }

    setCurrentOwner(data: Object): void {
        this._localStorageSrv.set(SharedConstants.STORAGE_KEYS.OWNER.DATA, JSON.stringify(data));
    }

    getCurrentOwner(): Promise<any> {
        return this._localStorageSrv.get(SharedConstants.STORAGE_KEYS.OWNER.DATA, false)
            .then(data => data ? JSON.parse(data) : undefined);
    }

    removeCurrentOwner(): void {
        return this._localStorageSrv.remove(SharedConstants.STORAGE_KEYS.OWNER.DATA);
    }

    clearAll() {
        return this._localStorageSrv.clear();
    }

    setToken(token: string): void {
        this._localStorageSrv.set(SharedConstants.STORAGE_KEYS.OWNER.TOKEN, token);
    }

    getToken(): Promise<string> {
        return this._localStorageSrv.get(SharedConstants.STORAGE_KEYS.OWNER.TOKEN, false)
            .then(token => token ? token : undefined);
    }

    removeToken(): void {
        return this._localStorageSrv.remove(SharedConstants.STORAGE_KEYS.OWNER.TOKEN);
    }
}