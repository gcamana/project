import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'cs-cancel-expenses-modal',
    templateUrl: 'cs-cancel-expenses-modal.component.html',
    styleUrls: ['cs-cancel-expenses-modal.component.scss']
})
export class CsCancelExpenseComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    element_mov :any;
    cancelForm:FormGroup;
    @Output() cancelExpense = new EventEmitter;
    constructor(
        public dialogRef: MatDialogRef<CsCancelExpenseComponent>,
        public _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.element_mov = data.element;
        this.cancelForm = this._buildForm();
    }

    _buildForm(){
        let form = this._formBuilder.group({
            observation: ['', Validators.required]
        });
        return form;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveCancelExpense(){
        this.element_mov.observation = this.cancelForm.controls.observation.value;
        this.cancelExpense.emit(this.element_mov);
    }
}
