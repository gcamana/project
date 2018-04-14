import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-pass-credit-modal',
    templateUrl: 'cs-pass-credit-modal.component.html',
    styleUrls: ['cs-pass-credit-modal.component.scss']
})
export class CsPassCreditModalComponent {
    users: any[] = [];
    isFamiliar: boolean = false;
    isPersonal: boolean = false;
    isActiveButtom: boolean;
    hideToggle: boolean = false;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor(
        public dialogRef: MatDialogRef<CsPassCreditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.users = [
            {
                first_name: "Giovanni",
                last_name: "Camana",
                role: "Hermano",
                selected: ""
            },
            {
                first_name: "Juan",
                last_name: "Perez",
                role: "Hermano",
                selected: ""
            }
        ]

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onchangePersonal(event): void {
        if (event.value == 'id_pago') {
            this.isActiveButtom = true;
            this.isPersonal = true;
        }
    }

    onchangeFamiliar(event): void {
        console.log(event)
        if (event.value) {
            // this.isActiveButtom = true;
            this.isFamiliar = true;
            this.hideToggle = true;
            this.isPersonal = false;
        }
    }

    onChangeToggle(event): void {
        if (event.value == 'FAMILIAR') {
            this.isActiveButtom = false;
            this.isPersonal = false;
        } else if (event.value == 'PERSONAL') {
            this.isActiveButtom = false;
            this.isPersonal = false;
        }
    }
    toggleFamiliar() {
        this.isFamiliar = !this.isFamiliar;
        this.hideToggle = false;
    }
}
