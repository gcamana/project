import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'cs-return-expenses-modal',
    templateUrl: 'cs-return-expenses-modal.component.html',
    styleUrls: ['cs-return-expenses-modal.component.scss']
})
export class CsReturnExpensesComponent {
    @Output() saveReturn = new EventEmitter();
    idx: number;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    amountForm:FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CsReturnExpensesComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.idx = data.idx;
        this.amountForm = this._buildForm();
    }

    private _buildForm(){
        let form = this._formBuilder.group({
            amount: ['',Validators.required],
            observation: ['', Validators.required]
        });
        return form;
    }

    actionSaveReturn(): void{
        this.saveReturn.emit({values : this.amountForm.value, idx : this.idx});
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
