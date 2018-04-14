import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cs-payment-commitment',
    templateUrl: 'cs-payment-commitment.component.html',
    styleUrls: ['cs-payment-commitment.component.scss']
})
export class CsPaymentCommitmentModalComponent {
    //monto = new FormControl('', [Validators.required]);
    filteredStates: Observable<any[]>;
    concepto: FormControl;
    newConceptFrom: FormGroup;
    @Output() registerComp = new EventEmitter();
    conceptos = [];
    titleSelect: string;
    public role = null;
    public ESTUDIANTE = SharedConstants.ROLES.ESTUDIANTE;
    public UNKNOWN_USER_IMAGE = null;
    public first_name = null;
    public last_name = null;
    public last_name2 = null;
    public concepto_selected = null;
    public observacion: string = null;
    isReadonly:boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CsPaymentCommitmentModalComponent>,
        public _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.conceptos = data.conceptos;
        this.role = data.role;
        this.UNKNOWN_USER_IMAGE = data.profile_image;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.last_name2 = data.last_name2;

        this.newConceptFrom = this._buildConceptForm();

        this.filteredStates = this.concepto.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterStates(state) : this.conceptos.slice())
            );
    }

    filterStates(name: string) {
        return this.conceptos.filter(state =>
            state.desc_concepto.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    ngOnInit() {
    }

    close() {
        this.titleSelect = '';
        this.isReadonly = false;
    }

    onSelectChange(event) {
        console.log(event.option._element.nativeElement.innerText);
        this.titleSelect = event.option._element.nativeElement.innerText;
        this.isReadonly = true;
    }

    private _buildConceptForm() {
        this.concepto = new FormControl('', Validators.required);

        let form = null;
        if (this.role == this.ESTUDIANTE) {
            form = this._formBuilder.group({
                monto: ['', Validators.required],
                concepto: this.concepto
            });
        } else {
            form = this._formBuilder.group({
                monto: ['', Validators.required],
                observacion: ['', Validators.required],
                concepto: this.concepto
            });
        }
        return form;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /*getErrorMessage() {
        this.newConceptFrom.controls.observacion.hasError('required') ? 'Ingresa una observación' : '';
        this.newConceptFrom.controls.monto.hasError('required') ? 'Ingresa un monto' : '';
        return;
    }*/

    saveComp() {
        this.registerComp.emit(this.newConceptFrom.value);
    }
}
