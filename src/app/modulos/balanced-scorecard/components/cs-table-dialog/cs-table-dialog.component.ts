import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
    selector: 'cs-table-dialog-component',
    templateUrl: './cs-table-dialog.component.html',
    styleUrls: ['cs-table-dialog.component.scss']
})

export class CsTableDialogComponent{
    isShowProgress: boolean = false;
    @Output() valuesGeneral = new EventEmitter();
    public errGoal     : ErrorStateMatcher;
    public errCurrent  : ErrorStateMatcher;
    public errTotal    : ErrorStateMatcher;
    public errAnterior : ErrorStateMatcher;
    public msj         : string  = 'Tienes  que llenar el campo.';
    public btnDisable  : boolean = true;

    constructor(
        public dialogRef: MatDialogRef<CsTableDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    guardarDato(){
        this.valuesGeneral.emit(this.data);
        this.dialogRef.close();
        this.isShowProgress = true;
    }

    activeErrorSpan(option:boolean) {
        return { isErrorState: (control: FormControl) => {
                 return option;
               }
        };
    }
    valideInput() {
        let retorno = this.valideInputForm();
        if(!retorno) {
            this.btnDisable = false;;
        }
    }
    valideInputForm() {
        let retorno = false;
        var RE = /^d*(.d*)?$/;
        this.msj        = '';
        this.btnDisable = false;
        this.errGoal = this.activeErrorSpan(false);
        this.errCurrent = this.activeErrorSpan(false);
        this.errTotal = this.activeErrorSpan(false);
        this.errAnterior = this.activeErrorSpan(false);
        if(this.data.goal == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errGoal    = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }else{
            if(RE.test(this.data.goal)) {
                this.msj        = 'Ingresa un decimal.';
                this.errGoal    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.data.goal > 100) {
                this.msj        = 'Numero ingresado no puede superar el 100%.';
                this.errGoal    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.data.goal <= 0) {
                this.msj        = 'Numero ingresado no puede ser menor o igual al 0%.';
                this.errGoal    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
        }
        if(this.data.current == '') {
            this.msj           = 'No puedes dejar el campo vacio.';
            this.errCurrent    = this.activeErrorSpan(true);
            retorno            = true;
            this.btnDisable    = true;
        }else{
            if(RE.test(this.data.current)) {
                this.msj           = 'Ingresa un decimal.';
                this.errCurrent    = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.data.tipo_calc == 'PORCENTAJE'){
                if(parseFloat(this.data.current) > parseFloat(this.data.total)) {
                    this.msj        = 'Numero ingresado no puede ser mayor ha '+this.data.total+'.';
                    this.errCurrent = this.activeErrorSpan(true);
                    retorno         = true;
                    this.btnDisable = true;
                }
            }
        }
        if(this.data.total == '') {
            this.msj        = 'No puedes dejar el campo vacio.';
            this.errTotal   = this.activeErrorSpan(true);
            retorno         = true;
            this.btnDisable = true;
        }else{
            if(RE.test(this.data.total)) {
                this.msj        = 'Ingresa un decimal.';
                this.errTotal   = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
        }
        if(this.data.anterior == '') {
            this.msj         = 'No puedes dejar el campo vacio.';
            this.errAnterior = this.activeErrorSpan(true);
            retorno          = true;
            this.btnDisable  = true;
        }else{
            if(RE.test(this.data.anterior)) {
                this.msj         = 'Ingresa un decimal.';
                this.errAnterior = this.activeErrorSpan(true);
                retorno          = true;
                this.btnDisable  = true;
            }
        }
        return retorno;
    }

    resetInput(param) {
        switch (param) {
            case 'errGoal':
                this.errGoal = this.activeErrorSpan(false);
                break;
            case 'errCurrent':
                this.errCurrent = this.activeErrorSpan(false);
                break;
            case 'errTotal':
                this.errTotal = this.activeErrorSpan(false);
                break;
            case 'errAnterior':
                this.errAnterior = this.activeErrorSpan(false);
                break;
        }
    }
}