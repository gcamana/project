import { Component, OnInit, Input, Inject, Output , EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA }               from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators}      from '@angular/forms';
import {ErrorStateMatcher}                                        from '@angular/material/core';


@Component({
    selector    : 'cs-history-table-modal',
    templateUrl : 'cs-history-table-modal.component.html',
    styleUrls   : ['cs-history-table-modal.component.scss'],
})

export class CsHistoryTableModalComponent {
    @Output() valuesHist          = new EventEmitter();
    private meta_visible :boolean = true;
    public  msj          :string  = 'Tienes  que llenar el campo.';
    public errReal       :ErrorStateMatcher;
    public errMeta       :ErrorStateMatcher;
    public errVerde      :ErrorStateMatcher;
    public errRojo       :ErrorStateMatcher;
    public btnDisable    : boolean = true;

    isShowProgress: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CsHistoryTableModalComponent>,
        @Inject(MAT_DIALOG_DATA) public dataGauge: any
    ) {
        this.meta_visible = dataGauge.meta_visible;
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    guardarValuesDash() {
        let retorno = this.valideInputForm();
        if(retorno) return;
        this.valuesHist.emit(this.dataGauge);
        this.isShowProgress = true;
        this.dialogRef.close();
    }

    activeErrorSpan(option:boolean) {
        return { isErrorState: (control: FormControl) => {
                 return option;
               }
        };
    }

    valideInputForm() {
        let retorno = false;
        if(this.dataGauge.real == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errReal    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(isNaN(this.dataGauge.real)) {
            this.msj        = 'Ingresa un entero.';
            this.errReal    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(this.dataGauge.goal == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errMeta    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(isNaN(this.dataGauge.goal)) {
            this.msj        = 'Ingresa un entero.';
            this.errMeta    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(this.dataGauge.green == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errVerde   = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(isNaN(this.dataGauge.green)) {
            this.msj        = 'Ingresa un entero.';
            this.errVerde   = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(this.dataGauge.red == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errRojo    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        if(isNaN(this.dataGauge.red)) {
            this.msj        = 'Ingresa un entero.';
            this.errRojo    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }
        return retorno;
    }

    resetInput(param) {
        switch (param) {
            case 'errReal':
                this.errReal = this.activeErrorSpan(false);
                break;
            case 'errMeta':
                this.errMeta = this.activeErrorSpan(false);
                break;
            case 'errVerde':
                this.errVerde = this.activeErrorSpan(false);
                break;
            case 'errRojo':
                this.errRojo = this.activeErrorSpan(false);
                break;
        }
    }

    valideInput() {
        let retorno = this.valideInputForm();
        if(!retorno) { this.btnDisable = false; }
    }
}