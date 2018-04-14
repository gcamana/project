import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild } from '@angular/core';

import * as jsPDF from 'jspdf';
import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TsrMovementsService } from '../../pages/tsr-movements/tsr-movements.service';

@Component({
    selector: 'cs-vaucher-modal',
    templateUrl: 'cs-vaucher-modal.component.html',
    styleUrls: ['cs-vaucher-modal.component.scss'],
    providers : [TsrMovementsService]
})

export class CsVaucherModalComponent {
    @ViewChild('autoFocus') autoFocus :ElementRef
    date = new FormControl(new Date());
    users: any[] = [];
    newOption: FormGroup;
    titleType: string;
    numberBoleta: string ='0001501';
    numberRecibo: string ='0001589';
    number: string = '';
    hideType: boolean = false;
    isBoleta: boolean = false;
    isDelete: boolean = false;
    isActiveButton: boolean = false;
    isEdit: boolean = false;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    titleDelete:string = '';
    descDelete: string = '';

    id_move: any;
    documents = [];
    doc_selected:any;
    token = sessionStorage.getItem('token');
    fecha_emision = null;
    action_selected = null;
    idx = null;

    constructor(
        public dialogRef: MatDialogRef<CsVaucherModalComponent>,
        public _tsrMovementsServ: TsrMovementsService,
        public _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.id_move  = data.id_move;
        this.documents = data.documents;
    }

    ngOnInit() {
        this.newOption = this._builForm()
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChangeVaucher(event): void {
        console.log(event);
        if (event.value == "RECIBO") {
            //this.titleType = "Recibo";
            //this.number = this.numberRecibo;
            this.hideType    = true;
            this.descDelete  = "Al anular el documento se generará otro automáticamente.";
            this.titleDelete = "¿Deseas anular el recibo?";
            this.isBoleta    = false;
        } else if (event.value == "BOLETA") {
            this.descDelete  = "Al anular el documento se generará otro automáticamente con la fecha de emisión que selecciones.";
            this.titleDelete = "¿Deseas anular la boleta?";
            this.hideType    = true;
            this.isBoleta    = true;
            //this.number = this.numberBoleta;
            //this.titleType = "Boleta";
        } else if(event.value == "TICKET") {
            this.descDelete  = "Al anular el documento se generará otro automáticamente con la fecha de emisión que selecciones.";
            this.titleDelete = "¿Deseas anular el ticket?";
            this.hideType    = true;
            this.isBoleta    = true;
            //this.number = this.numberBoleta;
            //this.titleType = "Boleta";
        } else {
            this.hideType = false;
        }
    }

    onChangeAction(event) {
        if (event.value == "DELETE") {
            this.isDelete = true;
            this.isActiveButton = false;
            if(this.isDelete) {
                this.isActiveButton = true;
            }
        } else if (event.value == 'FILE_DOWNLOAD') {
            this.isActiveButton = true;
        }
    }

    done() {
        let optionTmp = this.newOption.value
        console.log(optionTmp);
    }
    edit() {
        this.isEdit = true;
        this.isActiveButton = false;
        this.setFocusInput();
    }
    backOne() {
        this.hideType = false;
        this.isActiveButton = false;
        this.action_selected = null;
    }
    backTwo() {
        this.isDelete = false;
        this.isActiveButton = true;
        this.action_selected = null;
        if(!this.isDelete) {
            this.isActiveButton = false;
        }
    }
    setFocusInput() {
        setTimeout(() => {
            this.autoFocus.nativeElement.focus();
        }, 100);
    }

    addChange(event) {
        if (event != null && event.keyCode == 13 && this.number.length > 0) {
            this.isEdit = false;
            this.isActiveButton = true;
            this.number =  event.currentTarget.value;
        }
    }

    private _builForm() {
        let form = new FormGroup({
            option: new FormControl('', Validators.required)
        });
        return form;
    }

    selectDocument(document, idx){
        this.doc_selected = document;
        this.idx          = idx;
    }

    actionDocument(){
        let obj = { token         : this.token,
                    id_move       : this.id_move,
                    tipo_documento: this.doc_selected.tipo_documento,
                    nro_documento : this.doc_selected.nro_documento,
                    fecha_emision : null };
        if(this.isDelete){
            obj.fecha_emision = this.fecha_emision;
            this._tsrMovementsServ.cancelDocumentByType(obj).subscribe(
                result => {
                    this.fecha_emision   = null;
                    this.backOne();
                    this.isDelete = false;
                    this.documents[this.idx].disabled = true;
                    this.documents[this.idx].info     = `${this.documents[this.idx].tipo_documento} (ANULADO)`;
                    this.documents.push(result.new_doc);
                    this._snackBar.open(result.msj, 'cerrar', {
                        duration: 2000,
                    });
                },
                error => {
                    console.log(error);
                }
            )
        } else{
            this._tsrMovementsServ.getDataDocumentPrint(obj).subscribe(
                result => {
                    console.log(result);
                    this.createTicketIngreso(result);
                },
                error => {
                    console.log(error);
                }
            )
        }
    }

    createTicketIngreso(arrayData){
        var cant  = "1";
        let datos = null;
        ///////////////PRIMERO
        const doc = new jsPDF({
            orientation : 'p', 
            unit        : 'cm',
            format      : [18, 8]});
        var chartHeight = 11;
        var currentdate = new Date(); 
        var datetime =    currentdate.getDate() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getFullYear() + " "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        console.log(arrayData);
        for(var i = 0 ; i< arrayData.length ; i++){
            console.log(arrayData[i]);
            doc.setFontSize(24);
            doc.setFont("courier");
            doc.setFontType('bold');
            var filaInicioDetalle = 1.2;
            var aumento 		  = 0.4;
            var filaInicio        = 3.5;
            // x | y
            //CAMBIAR POR PNG
            var datos1 = arrayData[i].nombre_comercial; 
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos1[0]) / 2.33);
            doc.text(xOffset, 1.1, '' + datos1[0]);
            filaInicioDetalle = filaInicioDetalle + aumento+0.2;
            for (var j = 1; j < datos1.length; j++) {
                var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos1[j]) / 2.33);
                doc.text(xOffset, filaInicioDetalle, ''+datos1[j]);
                filaInicioDetalle = filaInicioDetalle + aumento+0.2;
            }
            doc.setFontSize(11);
            var datos2 = arrayData[i].razon_social;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos2[0]) / 5.1);
            doc.text(xOffset, filaInicioDetalle, ''+datos2[0]);
            filaInicioDetalle = filaInicioDetalle + aumento;
            for (var j = 1; j < datos2.length; j++) {
                var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos2[j]) / 5.1);
                doc.text(xOffset, filaInicioDetalle, ''+datos2[j]);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }
            doc.text(0.5, filaInicioDetalle, '');
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.setFontSize(12);
            doc.setFont("helvetica");
            doc.setFontType("normal");
            datos = arrayData[i].direccion;
        
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos[0]) / 4.5);
            doc.text(xOffset, filaInicioDetalle, ''+datos[0]);
            filaInicioDetalle = filaInicioDetalle + aumento;
            
            for (var j = 1; j < datos.length; j++) {
                var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(datos[j]) / 4.5);
                doc.text(xOffset, filaInicioDetalle, ''+datos[j]);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }
        
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Telofono: '+arrayData[i].telefono) / 4.5);
            doc.text(xOffset, filaInicioDetalle, 'Tel\u00E9fono: '+arrayData[i].telefono);
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.setFontType('bold');
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('R.U.C. '+arrayData[i].ruc) / 4.5);
            doc.text(xOffset, filaInicioDetalle, 'R.U.C. '+arrayData[i].ruc);
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.setFontType("normal");
            doc.text(0.1, filaInicioDetalle, '------------------------------------------------------------');
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Nro de Autorizacion: ' + arrayData[i].nro_autorizacion) / 4.73);
            doc.text(xOffset, filaInicioDetalle, 'Nro de Autorizaci\u00f3n: ' + arrayData[i].nro_autorizacion);
            filaInicioDetalle = filaInicioDetalle + aumento+0.1;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Maq. Reg: Caja ' + arrayData[i].nro_caja) / 4.73);
            doc.text(xOffset, filaInicioDetalle, 'Maq. Reg: Caja ' + arrayData[i].nro_caja);
            filaInicioDetalle = filaInicioDetalle + aumento+0.2;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Tek: ' + arrayData[i].nro_serie+'-'+arrayData[i].nro_documento) / 4.73);
            doc.text(2, filaInicioDetalle, 'Tek: ' + arrayData[i].nro_serie+'-'+arrayData[i].nro_documento);
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.text(0.1, filaInicioDetalle, '------------------------------------------------------------');
            filaInicioDetalle = filaInicioDetalle + aumento;
            //traer correlativo
            doc.setFontSize(12);
            doc.setFontType('bold');        
            if(arrayData[i].flg_factura == 1){
                doc.text(1, filaInicioDetalle, 'Empresa: ' + arrayData[i].nombre_empresa);
                filaInicioDetalle = filaInicioDetalle + aumento;
            
                doc.text(1, filaInicioDetalle, 'RUC: ' + arrayData[i].ruc_empresa);
                filaInicioDetalle = filaInicioDetalle + aumento;
        
                datos = arrayData[i].direccion_empresa;
                doc.text(1, filaInicioDetalle, 'Direcci\u00f3n: '+datos[0]);
                filaInicioDetalle = filaInicioDetalle + aumento;
                
                for (var j = 1; j < datos.length; j++) {
                    doc.text(1, filaInicioDetalle, ''+datos[j]);
                    filaInicioDetalle = filaInicioDetalle + aumento;
                }
                
                doc.text(0.1, filaInicioDetalle, '------------------------------------------------------------');
                filaInicioDetalle = filaInicioDetalle + aumento;
            }
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Est. : ' + arrayData[i].estudiante) / 4.73);
            doc.text(xOffset , (filaInicioDetalle) , 'Est. : ' + arrayData[i].estudiante);
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Est. : ' + arrayData[i].segundo_nombre) / 4.73);
            doc.text(xOffset , (filaInicioDetalle) , '       ' + arrayData[i].segundo_nombre);
            filaInicioDetalle = filaInicioDetalle + aumento + aumento;
        
            doc.setFontSize(12);
            //CUOTA
            doc.setFontType('bold');
            var datos3 = arrayData[i].descripcion;
            doc.text(0, filaInicioDetalle, '' + datos3[0]);
            filaInicioDetalle = filaInicioDetalle + aumento;
            for (var j = 1; j < datos3.length; j++) {
                doc.text(0, filaInicioDetalle, ''+datos3[j]);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }
            var cantidad = (datos3.length == 1)?1:(datos3.length-1);
            filaInicioDetalle = filaInicioDetalle - (aumento*(cantidad));
            //doc.text(0  , (filaInicioDetalle) , arrayData[i].descripcion);
            doc.setFontType("normal");
            if(arrayData[i].tipo_pago == 'descuento'){
                doc.text(6.5 , (filaInicioDetalle) , arrayData[i].monto);
                filaInicioDetalle = filaInicioDetalle + aumento;
                filaInicioDetalle = filaInicioDetalle + aumento;
                doc.text(0.9  , (filaInicioDetalle)     , 'Descuento      S/.');
                doc.text(6.5  , (filaInicioDetalle)     , arrayData[i].descuento_acumulado);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }else if(arrayData[i].tipo_pago == 'mora'){
                doc.text(6.5 , (filaInicioDetalle) ,  arrayData[i].monto);
                filaInicioDetalle = filaInicioDetalle + aumento;
                filaInicioDetalle = filaInicioDetalle + aumento;
                doc.text(0.9  , (filaInicioDetalle)     , 'Mora      S/.');
                doc.text(6.5  , (filaInicioDetalle)     , arrayData[i].mora_acumulada);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }else if(arrayData[i].tipo_pago == 'no_pagado'){
                doc.text(6.5 , (filaInicioDetalle) , arrayData[i].monto_adelanto);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }else{
                doc.text(6.5 , (filaInicioDetalle) , arrayData[i].monto);
                filaInicioDetalle = filaInicioDetalle + aumento;
            }
            ///IGV
            doc.text(0.9  , (filaInicioDetalle)     , 'IGV      S/.');
            doc.text(6.5  , (filaInicioDetalle)     , '0.00');
            filaInicioDetalle = filaInicioDetalle + aumento;
            
            doc.text(0.1, filaInicioDetalle, '                                               ------------------------');
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.text(0.9  , (filaInicioDetalle)     , 'Total      S/.');
            //TOTAL
            doc.setFontSize(12);
            doc.setFontType('normal');
            if(arrayData[i].tipo_pago == 'no_pagado'){
                doc.text(6.5 , (filaInicioDetalle) , arrayData[i].monto_adelanto);
            }else{
                doc.text(6.5 , (filaInicioDetalle) , arrayData[i].monto_adelanto);
            }
            doc.setFontSize(12);
            
            filaInicioDetalle = filaInicioDetalle + aumento + aumento + aumento;
            doc.text(0.1, filaInicioDetalle, '------------------------------------------------------------');
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.text(0.7, filaInicioDetalle, 'Usuario Reg.: ');
            doc.setFontType('bold');
            doc.text(3.6, filaInicioDetalle, '' + arrayData[i].persona_usuario);
            doc.setFontType("normal");
            filaInicioDetalle = filaInicioDetalle + aumento + 0.1;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Fecha:' + arrayData[i].fecha +  '  Hora:' + arrayData[i].hora) / 4.73);
            doc.text(xOffset, filaInicioDetalle, 'Fecha:' + arrayData[i].fecha +  '  Hora:' + arrayData[i].hora);
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.setFontSize(13);
            doc.text(0.1, filaInicioDetalle, '----------------------------------------------------------');
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.text(1 , (filaInicioDetalle) , 'Ingresa a');
            doc.setFontType('bold');
            doc.text(3.1 , (filaInicioDetalle) , ''+arrayData[i].pagina);
            doc.setFontType("normal");
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('a ver las ultimas noticias.') / 4.4);
            doc.text(xOffset , (filaInicioDetalle) , 'a ver las \u00faltimas noticias.');
            filaInicioDetalle = filaInicioDetalle + aumento;
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('TIP: Puedes verificar este pago') / 4.4);
            doc.text(xOffset , (filaInicioDetalle) , 'TIP: Puedes verificar este pago');
            filaInicioDetalle = filaInicioDetalle + aumento;
            doc.text(1.1 , (filaInicioDetalle) , 'desde la plataforma');
            doc.setFontType('bold');
            doc.text(5.3 , (filaInicioDetalle) , 'smiledu');
            doc.setFontType("normal");
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('ingresando con tu usuario y') / 4.4);
            doc.text(xOffset, (filaInicioDetalle) , 'ingresando con tu usuario y');
            filaInicioDetalle = filaInicioDetalle + aumento;
            var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('contrasena.') / 4.4);
            doc.text(xOffset, (filaInicioDetalle) , 'contrase\u00F1a.');
            
            if(i < arrayData.length-1){
                doc.addPage([500,500]);
            }
        }
        doc.output('save','ticket_'+datetime+'.pdf');
    }
}
