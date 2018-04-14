import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'cs-cancel-commitment-modal',
    templateUrl: 'cs-cancel-commitment-modal.component.html',
    styleUrls: ['cs-cancel-commitment-modal.component.scss']
})
export class CsCancelCommitmentModalComponent {
    @Output() saveCancel = new EventEmitter;
    cancelForm: FormGroup;
    data_mov:any;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    constructor(
        public dialogRef: MatDialogRef<CsCancelCommitmentModalComponent>,
        public _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.data_mov = data.element;
        this.cancelForm = this.__buildForm();
        console.log(this.data_mov);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    __buildForm(){
         let form = this._formBuilder.group({
            observation: ['', Validators.required]
        });
        return form;
    }

    saveCancelComp(){
        this.data_mov.observation = this.cancelForm.controls.observation.value;
        this.saveCancel.emit(this.data_mov);
    }
}
