import { Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { UserService } from '../../../services/user.service';
import { IngresosService } from '../ingresos/ingresos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EgresoService } from '../egresos/egresos.service';
import {MatSnackBar,  MatPaginator, MatTableDataSource} from '@angular/material';
import * as jsPDF from 'jspdf';

export interface ElementCompromisos {
    estado: boolean;
    desc_cuota: string;
    monto: string;
    fecha_descuento: string;
    descuento_acumulado: number;
    fec_vencimiento: number;
    mora_acumulada: string;
    monto_final: string;
    monto_adelanto: string;
    lugar_pago: string;
    tooltip: string;
    class_estado: string;
    id_movimiento: string;
    accion: string;
    checked: boolean;
    flg_crono: boolean;
    disabled: boolean;
    fecha_pago: string;
}

@Component({
  selector: 'ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['ingresos.component.css'],
  providers: [IngresosService, EgresoService]
})

export class IngresosComponent{
    @ViewChild('modalPagar') modalPagar;
    @ViewChild('modalRegistrarCompromiso') modalRegistrarCompromiso;
    @ViewChild('modalAnularCompromiso') modalAnularCompromiso;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public token = sessionStorage.getItem('token');
    /**PROGRESS BAR*/
    public progress_pagar = false;
    /**DATA ESTUDIANTE*/
    displayedColumnsCompromisos = ['estado', 'desc_cuota','monto','fecha_descuento','descuento_acumulado','fec_vencimiento','mora_acumulada','monto_final','monto_adelanto','fecha_pago','tooltip','class_estado','accion'];
    dataSourceCompromisos = new MatTableDataSource<ElementCompromisos>();
    public nombre_estu = null;
    public info_estu   = null;
    public familiares  = [];
    public compromisos = [];
    public flg_tipo    = 2;
    public estu        = null;
    /*NUEVO COMPROMISO */
    public conceptos   = [];
    public monto_comp  = null;
    public cbConceptos = null;
    /**PAGAR**/
    public monto_total: number  = 0;
    public monto_desc: number   = 0;
    public monto_cobrar: number = 0 ;
    public arr_pagar    = [];
    public arr_idx      = [];
    public cb_pagar     = null;
    public sede_caja;
    public secretaria;
    public nom_secre;
    /**ANULAR**/
    public id_mov_anular = null;
    public desc_cuota    = null;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _ingresosService: IngresosService,
        private _egresosService: EgresoService,
        private snackBar: MatSnackBar,
        private _userService : UserService
    ){
        var root = this;
        setTimeout(function(){
            root.sede_caja  = _userService.usuario.sede;
            root.secretaria = _userService.usuario.persona;
            root.nom_secre  = _userService.usuario.nombre;
        },1000);
    }

    ngOnInit(){
        this._route.params.forEach(params => {
              this.estu = +params['estu'];
        });
        console.log(this.estu);
        this.getFamiliaresByEstu();
        this.getCompromisosEstu(this.estu);
        this.verConceptosIngresos();
    }

    getCompromisosEstu(estudiante){
        this.estu = estudiante;
        var obj = {idEstu   : estudiante,
                   flg_tipo : this.flg_tipo,
                   token    : this.token};
        this._ingresosService.getCompromisos(obj).subscribe(
            result => {
                this.dataSourceCompromisos = new MatTableDataSource<ElementCompromisos>(result);
                console.log(result);
                this.dataSourceCompromisos.paginator = this.paginator;
                this.refreshVariables();
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }

    getFamiliaresByEstu(){
        var obj = {idEstu : this.estu,
                   token  : this.token};
        this._ingresosService.getFamiliaresByEstu(obj).subscribe(
            result => {
                console.log(result);
                this.familiares = result;
                this.nombre_estu = this.familiares[0].nom_persona;
                this.setInfoEstu(this.familiares[0].cant_deuda, this.familiares[0].deuda_total);
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }
    
    activeDesactiveComp(compromiso,monto,idx,event,flg_crono){
        if(event){
            this.arr_pagar.push(compromiso);
            this.arr_idx.push(idx);
            this.monto_total += Number(monto);
        } else{
            this.removeFromArray(compromiso);
            this.monto_total -= Number(monto);
        }
        if(flg_crono){
            try {
                /*for(var i = 0; i < ){

                }*/
                this.dataSourceCompromisos.data.forEach( (val,i) => {
                    if(i == idx && event){
                        val.checked = true;
                    } else if(i == idx && !event){
                        val.checked = false;
                    }
                    if(i > idx && val.flg_crono){
                        if(val.checked){
                            this.removeFromArray(val.id_movimiento);
                            this.monto_total -= Number(val.monto_final);
                        }
                        val.disabled = !event;
                        val.checked = false;
                        if(event){
                            throw '';
                        }
                    }
                });
            } catch (error) {
            }
        }
    }

    removeFromArray(element){
        for(var i = 0; i < this.arr_pagar.length; i++){
            if(element == this.arr_pagar[i]){
                this.arr_pagar.splice(i,1);
                this.arr_idx.splice(i,1);
                break;
            }
        }
    }

    getCompromisosByTipo(flg_tipo){
        this.flg_tipo = flg_tipo;
        this.getCompromisosEstu(this.estu);
    }
    
    selectChipEstu(estudiante, nom_persona, cant_deudas, deuda_total){
        this.flg_tipo = 2;
        this.getCompromisosEstu(estudiante);
        this.nombre_estu = nom_persona;
        this.setInfoEstu(cant_deudas, deuda_total);
    }
    
    setInfoEstu(cant_deudas, deuda_total){
        if(cant_deudas == 0){
            this.info_estu = 'Al dí­a';
        } else{
            this.info_estu = cant_deudas + ' cuota(s) vencida(s) (Deuda total: S/.' + deuda_total + ')';
        }
    }
    
    openModalPagar(){
        this.modalPagar.nativeElement.className = 'modal fade show in';
    }

    closeModalPagar(){
        this.modalPagar.nativeElement.className = 'modal fade';
    }

    pagarCompromisos(){
        this.progress_pagar = true;
        var obj = {arr_pagar  : this.arr_pagar,
                   sede       : this.sede_caja,
                   secretaria : this.secretaria,
                   estudiante : this.estu,
                   nom_secre  : this.nom_secre,
                   token      : this.token}
        this._ingresosService.pagarCompromisos(obj).subscribe(
            result => {
                if(result.error == 0){
                    this.closeModalPagar();
                    this.dataSourceCompromisos = new MatTableDataSource<ElementCompromisos>(result.compromisos);
                    this.dataSourceCompromisos.paginator = this.paginator;
                    this.buildPdfTickets(result.data_ticket);
                    this.refreshVariables();
                }
                this.progress_pagar = false;
                this.notificacion(result.msj,'Hecho');
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }

    refreshVariables(){
        this.arr_pagar    = [];
        this.arr_idx      = [];
        this.monto_cobrar = 0;
        this.monto_desc   = 0;
        this.monto_total  = 0;
    }

    notificacion(msj, accion){
        var duration = 2000;
        this.snackBar.open(msj,accion,{duration: duration});
    }

    buildPdfTickets(arrayData){
        var cant = '1';
        var doc = new jsPDF('l', 'mm', '225', 139.35); 
        for(var i = 0 ; i< arrayData.length ; i++){
            doc.setFontSize(9);
            
            doc.text(16, 27, arrayData[i].estudiante);

            doc.setFontSize(8);
            doc.text(7, 34, arrayData[i].desc_nivel);
            
            doc.text(30, 34, arrayData[i].desc_grado);
            
            doc.text(55, 34, arrayData[i].desc_aula);

            doc.text(90,34, arrayData[i].fecha_pago);
            
            doc.setFontSize(9);
            
            doc.text(16, 49, cant);
            
            doc.text(29, 49, arrayData[i].concepto);
            
            doc.text(93, 49, arrayData[i].importe);
            
            doc.text(0.05, 49, arrayData[i].nro_documento);
            
            doc.text(30, 116, arrayData[i].usuario);
            
            doc.text(93, 116, arrayData[i].importe);
            
            ///////////////SEGUNDO
            
            doc.text(143, 27,arrayData[i].estudiante);
            
            doc.setFontSize(8);
            doc.text(127, 34, arrayData[i].desc_nivel);
            
            doc.text(150, 34, arrayData[i].desc_grado);
            
            doc.text(165, 34, arrayData[i].desc_aula);
            
            doc.text(200, 34, arrayData[i].fecha_pago);
            
            doc.setFontSize(9);
            doc.text(140, 49, cant);
            
            doc.text(150, 49, arrayData[i].concepto);
            
            doc.text(202, 49, arrayData[i].importe);
            
            doc.text(155, 116, arrayData[i].usuario);
            
            doc.text(202, 116, arrayData[i].importe);
            
            doc.text(122.005, 49, arrayData[i].nro_documento);
            
            if(i < arrayData.length-1){
                doc.addPage([225,139.35]);
            }
        }
        doc.output('save', 'recibo_');
    }
    
    verConceptosIngresos(){
        var obj = {tipo_movimiento : 'INGRESO',
                   token           : this.token};
        this._egresosService.getConceptos(obj).subscribe(
            result => {
                this.conceptos = result;  
                }, 
            error => {
                console.log(<any>error);
            }
        );
    }

    openModalRegistrar(){
        this.modalRegistrarCompromiso.nativeElement.className = 'modal fade show in';
    }

    closeModalRegistrar(){
        this.modalRegistrarCompromiso.nativeElement.className = 'modal fade';
    }

    saveCompromiso(){
        var obj = { concepto   : this.cbConceptos,
                    monto      : this.monto_comp,
                    secretaria : this.secretaria,
                    nom_secre  : this.nom_secre,
                    sede_caja  : this.sede_caja,
                    estudiante : this.estu,
                    token      : this.token};
        this._ingresosService.saveCompromiso(obj).subscribe(
            result => {
                if(result.error == 0){
                    this.dataSourceCompromisos = new MatTableDataSource<ElementCompromisos>(result.compromisos);
                    this.dataSourceCompromisos.paginator = this.paginator;
                    this.refreshVariables();
                    this.closeModalRegistrar();
                }
                this.notificacion(result.msj,'Hecho');
                
            }, 
            error => {
                console.log(<any>error);
            }
        );
        
    }

    openModalAnularMovimiento(id_movimiento, desc_cuota){
        this.id_mov_anular = id_movimiento;
        this.desc_cuota    = desc_cuota;
        this.modalAnularCompromiso.nativeElement.className = 'modal fade show in';
    }

    anularCompromiso(){
        var obj = { id_movimiento : this.id_mov_anular ,
                    id_sede       : this.sede_caja,
                    id_secretaria : this.secretaria,
                    nom_secre     : this.nom_secre,
                    token         : this.token};
        this._ingresosService.anularCompromiso(obj).subscribe(
            result => {
                if(result.error == 0){
                    this.closeModalAnular();
                    this.dataSourceCompromisos = new MatTableDataSource<ElementCompromisos>(result.compromisos);
                    this.dataSourceCompromisos.paginator = this.paginator;
                    this.refreshVariables();
                } 
                this.notificacion(result.msj,'Hecho');
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }
    closeModalAnular(){
        this.modalAnularCompromiso.nativeElement.className = 'modal fade';
    }
}
