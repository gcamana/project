import { Component, ViewChild } from '@angular/core';
import { PensionesService } from './pensiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'pensiones-tag',
    templateUrl: './pensiones.component.html',
    providers: [PensionesService],
    styleUrls: ['./pensiones.css']
})

export class PensionesComponent{
    @ViewChild('modalEditar') modalEditar;
    public pensiones;
    //public registrar;
    public actualizar;
    public nid_sede;

    public cuota_ingreso;
    public monto_cuota_ingreso;
    public monto_matricula;
    public monto_ratificacion;
    public monto_pension;

    public cuota_ingreso_g;
    public matricula_g;
    public ratificacion_g;
    public pension_g;
    public descuento_g; 

    public descuento_sede;
    public descuento_nivel;
    public descuento;
    public desc_sede;
    public desc_nivel;
    public desc_grado;
    public sedeModal;
    public sede;
    public tipoDeNivel;
    public anioPension;
    public year;
    public sede_sesion;
    public tipo_prog = 2;
    public obje;
    public proggres_pensiones = false;
    //public usuario_sesion;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _pensionesService: PensionesService,
        private snackBar: MatSnackBar
    ){
        this.pensiones = [];
        this.tipoDeNivel = [];
        var anioPension = new Date();
        this.year = anioPension.getFullYear();
        this.sede = "";
        this.obje = [];
    }

    ngOnInit(){
        this.MontoSede();

    }

    verDetallePensiones(){
        this._pensionesService.getPensiones(this.year).subscribe(
            result => {
                this.pensiones = [];           
                this.pensiones = result;
            }, 
            error => {
                console.log(<any>error);
            }
        )
    }

    mostrarForm(_nid_sede, _year, _sede, _cuota_ingreso, _monto_matricula, _monto_ratificacion){
        this.nid_sede=_nid_sede;
        this.year = _year;
        this.sede=_sede;
        this.cuota_ingreso = _cuota_ingreso;
        this.monto_matricula = _monto_matricula;
        this.monto_ratificacion = _monto_ratificacion;
        //console.log(this.cuota_ingreso );
    }
    tiposDeNivel(){
        this._pensionesService.getTipoDeNivel(this.nid_sede, this.year).subscribe(                                                          
            result => {
              
                    this.tipoDeNivel = result;
                    console.log(result);
                    //var obje = JSON.parse(this.tipoDeNivel);
                    //console.log(this.obje);

                 }, 
            error => {
                console.log(<any>error);
            }
        )
    }

    MontoSede() {
        this.proggres_pensiones = true;
        this._pensionesService.ObtenerMontoSede(this.year).subscribe(
            result => {
                this.pensiones = result;
                //console.log(this.pensiones);
                this.proggres_pensiones = false;
            }, 
            error => {
                console.log(<any>error);
            }
        )
    }

    cambiarAnioPorTipo(tipo) {
        if(tipo == 1) {
            this.year = (this.year - 1);
        } else {
            this.year = (this.year + 1);
        }
        //console.log(this.year);
        this.MontoSede();
            }

    editarMontoBySede(cuotaIngreso, montoMatricula, montoRatificacion, montoPension, descuentoSede, Descrip, nidSede, _year){        
        this.cuota_ingreso = cuotaIngreso;
        this.monto_matricula = montoMatricula;
        this.monto_ratificacion = montoRatificacion;
        this.monto_pension = montoPension;
        this.descuento_sede = descuentoSede;
        this.desc_sede  = Descrip;
        this.nid_sede = nidSede;
        this.year = _year;
    }

    editarMontoNivel(desc_nivel, cuotaIngreso, montoMatricula, montoRatificacion, montoPension, descuentoNivel){        
        this.monto_cuota_ingreso = cuotaIngreso;
        this.monto_matricula = montoMatricula;
        this.monto_ratificacion = montoRatificacion;
        this.monto_pension = montoPension;
        this.descuento_nivel = descuentoNivel;
        this.desc_nivel  = desc_nivel;
    }    

    editarMontoGrado(desc_grado, cuotaIngreso, montoMatricula, montoRatificacion, montoPension, descuentoGrado){        
        this.cuota_ingreso_g = cuotaIngreso;
        this.matricula_g = montoMatricula;
        this.ratificacion_g = montoRatificacion;
        this.pension_g = montoPension;
        this.descuento_g = descuentoGrado;
        this.desc_grado  = desc_grado;
    } 

    editarMontoPension(){
         let obj = {  nidSede            : this.nid_sede,
                      cuotaIngreso       : this.cuota_ingreso,
                      montoMatricula     : this.monto_matricula,
                      montoRatificacion  : this.monto_ratificacion,
                      montoPension       : this.monto_pension,
                      descuentoSede      : this.descuento_sede,
                      _year              : this.year,
                      tipo_prog          : this.tipo_prog };
       this._pensionesService.updateMontoPension(obj).subscribe(
            result => {
                console.log(result);
                if(result.error == 0){
                    this.pensiones.forEach( (val,i) => {
                        val.cuota_ingreso      = this.cuota_ingreso ;
                        val.monto_matricula    = this.monto_matricula;
                        val.monto_ratificacion = this.monto_ratificacion;
                        val.monto_pension      = this.monto_pension;
                        val.descuento_sede     = this.descuento_sede;
                    });

                    this.tipoDeNivel.forEach( (val,i) => {
                        val.monto_cuota_ingreso = this.cuota_ingreso ;
                        val.monto_matricula     = this.monto_matricula;
                        val.monto_ratificacion  = this.monto_ratificacion;
                        val.monto_pension       = this.monto_pension;
                        val.descuento_nivel     = this.descuento_sede;
                        (val.grados).forEach( (val2,i2) => {
                            console.log(val2);
                            val2.cuota_ingreso_g = this.cuota_ingreso ;
                            val2.matricula_g     = this.monto_matricula;
                            val2.ratificacion_g  = this.monto_ratificacion;
                            val2.pension_g       = this.monto_pension;
                            val2.descuento_g     = this.descuento_sede;
                        });
                    });
                    this.closeModalEditarMonto();
                }
                this.notificacion(result.msj, 'OK');
            }, 
            error => {
                console.log(<any>error);
            }
        )
    } 

    selectPrograma(){

    }

    notificacion(msj, accion){
        var duration = 2000;
        this.snackBar.open(msj,accion,{duration: duration});
    }
    
    openModalEditarMonto(){
        this.modalEditar.nativeElement.className = 'modal fade show in';
    }

    closeModalEditarMonto(){
        this.modalEditar.nativeElement.className = 'modal fade';
    }
}
