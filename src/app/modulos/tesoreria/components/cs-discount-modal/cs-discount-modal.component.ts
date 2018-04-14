import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-discount-modal',
    templateUrl: 'cs-discount-modal.component.html',
    styleUrls: ['cs-discount-modal.component.scss']
})
export class CsDiscountComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    constructor(
        public dialogRef: MatDialogRef<CsDiscountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
