import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-eliminate-debt-modal',
    templateUrl: 'cs-eliminate-debt-modal.component.html',
    styleUrls: ['cs-eliminate-debt-modal.component.scss']
})
export class CsEliminateDebtModalComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor(
        public dialogRef: MatDialogRef<CsEliminateDebtModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
