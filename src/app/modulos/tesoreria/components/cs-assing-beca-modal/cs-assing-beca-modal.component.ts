import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'cs-assing-beca-modal',
    templateUrl: 'cs-assing-beca-modal.component.html',
    styleUrls: ['cs-assing-beca-modal.component.scss']
})

export class CsAssingBecaComponent {
    @Output() assingRemoveProm = new EventEmitter;
    public element = {has_prom : false, beca : {year_condicion : null}};
    public title:string   = null;
    public info_button:string = null;
    public dataCombo = {};
    formBeca:FormGroup;
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor(
        public dialogRef: MatDialogRef<CsAssingBecaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _formBuilder : FormBuilder
    ) {
        this.element     = data.element;
        this.dataCombo   = data.dataCombo;
        this.title       = this.element.has_prom ? 'Desasignar beca' : 'Asignar beca';
        this.info_button = this.element.has_prom ? 'DESASIGNAR' : 'ASIGNAR';
        this.formBeca    = this._buildForm();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    acceptProm(){
        let flg_prom = this.element.has_prom ? '2' : '1';
        let year     = this.element.has_prom ? this.element.beca.year_condicion : this.formBeca.value.year;
        this.assingRemoveProm.emit({beca : this.formBeca.value.beca, flg_prom : flg_prom, year : year});
    }

    _buildForm(){
        let form = null;
        if(!this.element.has_prom){
            form = this._formBuilder.group({
                beca : ['', Validators.required],
                year : ['', Validators.required]
            });
        } else{
            form = this._formBuilder.group({
            });
        }
        return form;
    }
}
