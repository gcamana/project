import { Component, OnInit, Input, Inject, Output , EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-gauge-modal',
    templateUrl: 'cs-gauge-modal.component.html',
    styleUrls: ['cs-gauge-modal.component.scss'],
})


export class CsGaugeModalComponent {
    @Output() valuesDash    = new EventEmitter();
    @Output() valuesObj     = new EventEmitter();
    @Output() valuesGeneral = new EventEmitter();

    ZONA_CRITICIDAD: string = SharedConstants.LEGEND.ZONA_CRITICIDAD
    COLOR_VERDE: string = SharedConstants.LEGEND.COLOR_VERDE
    ZONA_OPTIMA: string = SharedConstants.LEGEND.ZONA_OPTIMA
    ZONA_INICIAL: string = SharedConstants.LEGEND.VALOR_INICIAL
    ZONA_FINAL: string = SharedConstants.LEGEND.VALOR_FINAL
    private meta_visible : boolean = true;
    public errRiesgo     : ErrorStateMatcher;
    public errVulnerable : ErrorStateMatcher;
    public errMeta       : ErrorStateMatcher;
    public errFinal      : ErrorStateMatcher;
    public errInicial    : ErrorStateMatcher;
    public msj           : string  = 'Tienes  que llenar el campo.';

    isShowProgress : boolean = false;
    public btnDisable    : boolean = true;
    constructor(
        public dialogRef: MatDialogRef<CsGaugeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public dataGauge: any
    ) {
        this.meta_visible = dataGauge.meta_visible;
    }

    activeErrorSpan(option:boolean) {
        return { isErrorState: (control: FormControl) => {
                 return option;
               }
        };
    }

    valideInputForm() {
        let retorno = false;
        var RE = /^d*(.d*)?$/;
        this.msj        = '';
        this.btnDisable = false;
        this.errRiesgo = this.activeErrorSpan(false);
        this.errVulnerable = this.activeErrorSpan(false);
        this.errMeta = this.activeErrorSpan(false);
        this.errInicial = this.activeErrorSpan(false);
        this.errFinal = this.activeErrorSpan(false);
        if(this.dataGauge.tipo_indi == 'C'){
            if(this.dataGauge.zona_riesgo == '') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errRiesgo  = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.zona_riesgo)) {
                this.msj        = 'Ingresa un decimal.';
                this.errRiesgo  = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_amarillo < this.dataGauge.zona_riesgo){
                this.msj           = 'Zona de criticidad no puede ser mayor a la zona optima.';
                this.errRiesgo = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_amarillo == '') {
                this.msj           = 'No puedes dejar el campo vacio.';
                this.errVulnerable = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(RE.test(this.dataGauge.valor_amarillo)) {
                this.msj           = 'Ingresa un decimal.';
                this.errVulnerable = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_amarillo < this.dataGauge.zona_riesgo){
                this.msj           = 'Zona optima no puede ser menor a la zona de criticidad.';
                this.errVulnerable = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_meta == '') {
                this.msj        = 'No puedes dejar el campo vacio.1';
                this.errMeta    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_meta)) {
                this.msj        = 'Ingresa un decimal.';
                this.errMeta    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_meta < this.dataGauge.valor_inicial){
                this.msj           = 'Valor meta no puede ser menor al valor inicial.';
                this.errMeta = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_meta > this.dataGauge.valor_final){
                this.msj           = 'Valor meta no puede ser mayor al valor final.';
                this.errMeta       = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_inicial == '' && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errInicial = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_inicial) && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'Ingresa un decimal.';
                this.errInicial = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.zona_riesgo < this.dataGauge.valor_inicial && this.dataGauge.tipo_calculo != 'PORCENTAJE'){
                this.msj           = 'Valor inicial no puede ser mayor a la zona de criticidad.';
                this.errInicial = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(this.dataGauge.valor_final == '' && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errFinal   = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_final) && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'Ingresa un decimal.';
                this.errFinal   = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_final < this.dataGauge.valor_meta && this.dataGauge.tipo_calculo != 'PORCENTAJE'){
                this.msj           = 'Valor final no puede ser menor al valor meta.';
                this.errFinal = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
        }else{
            if(this.dataGauge.valor_inicial == '' && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errInicial = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_inicial) && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'Ingresa un decimal.';
                this.errInicial = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_final == '' && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errFinal   = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_final) && this.dataGauge.tipo_calculo != 'PORCENTAJE') {
                this.msj        = 'Ingresa un decimal.';
                this.errFinal   = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_meta == '') {
                this.msj        = 'No puedes dejar el campo vacio.1';
                this.errMeta    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.valor_meta)) {
                this.msj        = 'Ingresa un decimal.';
                this.errMeta    = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.zona_riesgo == '') {
                this.msj        = 'No puedes dejar el campo vacio.';
                this.errRiesgo  = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(RE.test(this.dataGauge.zona_riesgo)) {
                this.msj        = 'Ingresa un decimal.';
                this.errRiesgo  = this.activeErrorSpan(true);
                retorno         = true;
                this.btnDisable = true;
            }
            if(this.dataGauge.valor_amarillo == '') {
                this.msj           = 'No puedes dejar el campo vacio.';
                this.errVulnerable = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
            if(RE.test(this.dataGauge.valor_amarillo)) {
                this.msj           = 'Ingresa un decimal.';
                this.errVulnerable = this.activeErrorSpan(true);
                retorno            = true;
                this.btnDisable    = true;
            }
        }
        return retorno;
    }

    resetInput(param) {
        switch (param) {
            case 'errRiesgo':
                this.errRiesgo = this.activeErrorSpan(false);
                break;
            case 'errVulnerable':
                this.errVulnerable = this.activeErrorSpan(false);
                break;
            case 'errMeta':
                this.errMeta = this.activeErrorSpan(false);
                break;
            case 'errInicial':
                this.errInicial = this.activeErrorSpan(false);
                break;
            case 'errFinal':
                this.errFinal = this.activeErrorSpan(false);
                break;
        }
    }

    valideInput() {
        let retorno = this.valideInputForm();
        if(!retorno) {
            this.btnDisable = false;;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
        this.isShowProgress = false;
    }

    guardarDataGauge() {
        let retorno = this.valideInputForm();
        if(retorno) { return;}
        this.dialogRef.close(this.dataGauge);

        this.isShowProgress = true;
    }

    guardarValuesDash() {
        this.valuesDash.emit(this.dataGauge);
        this.isShowProgress = true;
    }

    guardarValuesObj() {
        this.valuesObj.emit(this.dataGauge);
        this.isShowProgress = true;
    }

    guardarValuesGeneral() {
        this.valuesGeneral.emit(this.dataGauge);
        this.isShowProgress = true;
    }
}