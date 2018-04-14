import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-family-modal',
    templateUrl: 'cs-family-modal.component.html',
    styleUrls: ['cs-family-modal.component.scss']
})
export class CsFamilyModalComponent {
    private _userQueryListener: () => void;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    isSelect: boolean = false;
    value:string;
    user:any = {};
    users: any[] = [];
    title: string = "Familiares";
    isActiveButtom :boolean = false;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CsFamilyModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.users = data.users;
        console.log(this.users)
    }

    onchange(event) {
        if(event) {
            this.isActiveButtom = true;
            this.user = event.value;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    selectUser() {
        console.log(this.user);
        this.isSelect = true;
    }

    toggle() {
        this.isSelect = !this.isSelect;
    }
}
