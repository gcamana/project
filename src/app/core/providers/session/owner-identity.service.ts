import { Injectable, EventEmitter } from '@angular/core';

//import { Owner } from './../../../shared/models/owner';
import { Persona } from './../../../shared/models/persona';

import { SharedConstants } from './../../../shared/shared.constants';
import { OwnerStorageService } from '../../../shared/providers/storage/owner-storage.service';

@Injectable()
export class OwnerIdentityService {

    //private _owner  : Owner;
    private _persona: Persona;
    private _token  : string;

    onChange: EventEmitter<any>;

    constructor(
        private _ownerStorageSrv: OwnerStorageService
    ) {
        this.onChange = new EventEmitter<any>();
    }

    set user(persona: any) {
        if (persona) this._ownerStorageSrv.setCurrentOwner(persona)
        else this._ownerStorageSrv.removeCurrentOwner();

        this._persona = persona;

        this.onChange.next(persona);
    }

    get user(): any {
        return this._persona;
    }

    /*getCompanyLogo(): string {
        return this._persona.company.logo || SharedConstants.PATHS.DEFAULT_LOGO;
    }*/

    getCurrentOwner(): Promise<any> {
        return this._ownerStorageSrv.getCurrentOwner();
    }

    isLoggedIn(): boolean {
        return this._persona !== undefined /*&& this._token !== undefined*/;
    }

    logout(): void {
        this._token = undefined;
        this._persona = undefined;

        this._ownerStorageSrv.clearAll();

        this.onChange.next(this._persona);
    }

}