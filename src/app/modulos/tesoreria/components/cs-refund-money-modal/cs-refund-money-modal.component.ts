import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-refund-money-modal',
    templateUrl: 'cs-refund-money-modal.component.html',
    styleUrls: ['cs-refund-money-modal.component.scss']
})
export class CsRefundMoneyModalComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    constructor(
        public dialogRef: MatDialogRef<CsRefundMoneyModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
