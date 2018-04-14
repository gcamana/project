import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'cs-want-bill-modal',
    templateUrl: 'cs-want-bill-modal.component.html',
    styleUrls: ['cs-want-bill-modal.component.scss']
})
export class CsWantBillModelComponent {
    facturaForm:FormGroup;
    @Output() saveBill = new EventEmitter();
    document:string = null;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    data_user:any;
    constructor(
        public dialogRef: MatDialogRef<CsWantBillModelComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.document  = data.data_secretaria.document;
        this.data_user = data.data_user;
        this.facturaForm = this.__buildFormGroup();
    }
    
    __buildFormGroup(){
        let form = null;
        if(this.document == 'TICKET'){
            console.log(this.data_user.json_factura);
            form = this._formBuilder.group({
                ruc : [this.data_user.json_factura.ruc, Validators.compose([Validators.required, Validators.minLength(11)])],
                razonSocial : [this.data_user.json_factura.razonSocial, Validators.compose([Validators.required, Validators.maxLength(200)])],
                direction : [this.data_user.json_factura.direccion, Validators.compose([Validators.required, Validators.maxLength(200)])]
            });
            
        } else{
            form = this._formBuilder.group({
                ruc : [this.data_user.ruc, Validators.compose([Validators.required, Validators.minLength(11)])]
            });
        }
        return form;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveBillEstu(){
        this.saveBill.emit(this.facturaForm.value);
    }

}
