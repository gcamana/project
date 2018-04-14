import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { TsrBankService } from '../../pages/tsr-bank/tsr-bank.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


@Component({
    selector: 'cs-share-cash-modal',
    templateUrl: 'cs-share-cash-modal.component.html',
    styleUrls: ['cs-share-cash-modal.component.scss'],
    providers: [TsrBankService]
})
export class CsShareCashModalComponent {
    token = sessionStorage.getItem('token');
    @Output() shareCash = new EventEmitter();
    private _userQueryListener: () => void;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    isAdd: boolean = false;
    isSearch: boolean;

    value: string;
    user: any;
    user_selected: any;
    users: any[] = [];
    isActiveButtom: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public _tsrBankService: TsrBankService,
        public _matSnackBar: MatSnackBar,
        public dialogRef: MatDialogRef<CsShareCashModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.user = data.caja_share;
        this.isAdd = this.user.user != null ? true : false;
    }

    onchange(event) {
        this.user_selected = event.value;
        if (event) this.isActiveButtom = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openSearch() {
        this.isSearch = !this.isSearch;
    }

    selectUser() {
        if (this.isActiveButtom) {
            this.user = this.user_selected;
            this.isAdd = true;
            this.openSearch();
        }
    }

    usersShareCash(event) {
        if (event.keyCode == 13 && this.value.length >= 3) {
            var obj = {
                token: this.token,
                filtro: this.value
            };
            this._tsrBankService.usersShareCash(obj).subscribe(
                result => {
                    this.isActiveButtom = false;
                    this.users = result.usuarios;
                },
                error => {

                }
            )
        }
    }

    shareCashUser(flg) {
        let user_id = flg == 1 ? this.user_selected.user : this.user.user;
        var obj = {
            token: this.token,
            id_share: user_id,
            flg: flg
        };

        this._tsrBankService.saveCajaUser(obj).subscribe(
            result => {
                this.user = (flg == 1) ? this.user_selected : { name: null, user: null, foto: null };
                this.isAdd = true;
                this.openSearch();
                this.shareCash.emit(this.user);
                this._matSnackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
                this.dialogRef.close();
            },
            error => {
                error = JSON.parse(error._body);
                this._matSnackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        )
    }


}
