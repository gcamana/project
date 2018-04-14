import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-pay-modal',
    templateUrl: 'cs-pay-modal.component.html',
    styleUrls: ['cs-pay-modal.component.scss']
})
export class CsPayModalComponent {
    UNKNOWN_USER_IMAGE:string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    VISA              :string = SharedConstants.ICONS.VISA;
    MASTERCARD        :string = SharedConstants.ICONS.MASTERCARD;
    isFactura         :boolean;
    user              :any    = {};
    concepts          :any    = [];
    total             :number = 0;
    constructor(
        public dialogRef: MatDialogRef<CsPayModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.user     = data.user;
        this.concepts = data.concepts;
        for(let elem in this.concepts){
            this.total +=  +this.concepts[elem].total;
        }
        this.total = parseFloat(this.total.toFixed(2));
    }
    isChange(event){
        this.isFactura = event.checked;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
