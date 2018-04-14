import { Component, ViewChild } from '@angular/core';
import { EgresoService } from './egresos.service';
import { CajaService } from '../caja/caja.service';
import { MovimientosComponent } from '../movimientos/movimientos.component';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as jsPDF from 'jspdf';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export interface ElementEgreso {
    audi_nomb_regi      : any;
    desc_concepto       : any;
    fecha_registro      : any;
    id_movimiento       : any;
    monto               : any;
    nom_persona         : any;
    observacion         : any;
}

@Component({
    selector: 'egresos-tag',
    templateUrl: './egresos.component.html',
    providers: [EgresoService, CajaService],
    styleUrls: ['./egresos.css']
})

export class EgresoComponent {
    displayedColumnsEgresos = ['desc_concepto', 'fecha_registro','nom_persona','audi_nomb_regi','monto','observacion','accion'];
    dataSourceEgreso = new MatTableDataSource<ElementEgreso>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild('modalIngresar') modalIngresar;
    @ViewChild('IngresarEgreso') IngresarEgreso;
    @ViewChild('AnularEgreso') AnularEgreso;
    public token = sessionStorage.getItem('token');
    matcher      = new MyErrorStateMatcher();

    //public montoRegex = /^[0-9]+([.][0-9]+)?$/;
    public montoRegex = /^\d+(\.\d{1,2})?$/;

    montoFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(this.montoRegex)]);//el pattern sirve para controlar el input dependiendo del parametro, en este caso el REGEX

    public egresos;
    public contador;
    public ticket;

    public concepto;
    public datosEgresos;
    public progress_registrar = false;
    public result;

    conceptoFormControl = new FormControl('', [
        Validators.required]);
    selectFormControl = new FormControl('', [
        Validators.required]);
    observacionFormControl = new FormControl('', [
        Validators.required]);
    observacionAFormControl = new FormControl('', [
        Validators.required]);

    //Fecha - - -
    public fechaHoy;
    public Mes;
    public Dia;
    public Año;
    public hora;
    public minuto;
    public segundo;
    public FechaCompleta;
    public FechaComparar;
    //Fecha - - -

    public conceptos;
    public nomColaborador;
    public ColaboradorRegistro;
    public monto;
    public observacion;
    public observacionA = null;
    public datosEgreso;
    public datosAudi;
    public datosDoc;
    public datosAnular;
    public datosguardado;
    public TraerEgresos;
    public id_persona;
    public m_id_movimiento;
    public id_Sede;
    public colaborador;
    public egreso_id;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _egresoService: EgresoService,
        private _CajaService: CajaService,
        private snackBar: MatSnackBar,
        private _userService: UserService
    ) {

        this.contador = 1;
        this.egresos = [];
        this.ticket = [];
        this.concepto = [];
        this.ticket = [];
        this.TraerEgresos = [];


        this.colaborador = 270;
        //this.id_Sede = 6;
        //this.id_persona = 15; //la persona por default en el pdf

        this.conceptos = null;
        this.nomColaborador = null;
        this.ColaboradorRegistro = null;
        this.monto = null;
        this.observacion = null;
        this.datosEgresos = [];
        this.egreso_id = 0;
        var root = this;
        setTimeout(function () {
            root.id_Sede = _userService.usuario.sede;
            root.id_persona = _userService.usuario.persona;
        }, 1000);

    }
    ngOnInit() {

        this._route.params.forEach(params => {
            this.egreso_id = +params['id'];
            console.log('id de colaborador que llega: ' + this.egreso_id);
        });
        this.calcularFecha();
        this.ver();
        this.verConcepto();
        //this.Mostrar();
    }

    calcularFecha() {
        this.fechaHoy = new Date();

        this.Mes = (this.fechaHoy).getMonth() + 1;
        this.Dia = (this.fechaHoy).getDate();
        this.Año = (this.fechaHoy).getFullYear();

        this.hora = (this.fechaHoy).getHours();
        this.minuto = (this.fechaHoy).getMinutes();
        this.segundo = (this.fechaHoy).getSeconds();

        this.FechaCompleta = this.Año + '-' + this.Mes + '-' + this.Dia;
        this.FechaComparar = this.Dia + '/' + this.Mes + '/' + this.Año;
    }

    ver() {
        this.TraerEgresos = {
            colaborador: this.colaborador,
            egreso_id  : this.egreso_id,
            token      : this.token
        };
        this._egresoService.getEgresos(this.TraerEgresos).subscribe(

            result => {
                if (result.length != 0) {

                    this.dataSourceEgreso = new MatTableDataSource<ElementEgreso>(result);
                    console.log(this.dataSourceEgreso);
                    this.dataSourceEgreso.paginator = this.paginator;
                    console.log(this.dataSourceEgreso);
                    this.egresos = result;
                    //this.egresos = [];
                    //this.egresos = result;
                    //console.log(result);
                }
                else {
                    console.log('Ocurrio un problema trayendo egresos');
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    verConcepto() {
        var obj = { tipo_movimiento: 'EGRESO',
                    token          : this.token};
        this._egresoService.getConceptos(obj).subscribe(
            result => {
                this.concepto = [];
                this.concepto = result;
                console.log(result);
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    mostrarFormulario() {
        this.conceptoFormControl.reset();
        this.observacionFormControl.reset();
        this.montoFormControl.reset();
        this.openModalIngresarEgreso();
        this.progress_registrar = false;
    }

    openModalIngresarEgreso() {
        this.IngresarEgreso.nativeElement.className = 'modal fade show in';
    }

    closeModalIngresarEgreso() {
        this.IngresarEgreso.nativeElement.className = 'modal fade';
    }

    openModalAnularEgreso() {
        this.AnularEgreso.nativeElement.className = 'modal fade show in';
    }

    closeModalAnularEgreso() {
        this.AnularEgreso.nativeElement.className = 'modal fade';
    }

    validacionesGuardarEgreso(tipoConcepto) {
        //(MAT-ERROR)
        if (this.montoFormControl.hasError('required') ||
            (this.montoFormControl.hasError('pattern') && !this.montoFormControl.hasError('required')) ||
            tipoConcepto == undefined || this.observacionFormControl.hasError('required'))
            return true;
        else return false;
    }

    notificacion(msj, accion) {
        var duration = 3000;
        this.snackBar.open(msj, accion, { duration: duration });
    }

    insertarEgreso(tipoConcepto) {
        this.progress_registrar = true;
        if (this.validacionesGuardarEgreso(tipoConcepto)) {
            this.result = 'Ingrese datos Validos y/o complete Campos';
            console.log("error en tipo de egreso");
            //(MAT-ERROR) El markAsDirty hace que el input se sombree de rojo, esto sirve para que puedas controlarlo desde botones en el component.
            //            ya que si hay algun error y el usuario no manipula el input, el input no se sombrea. Por eso se hace manualmente.

            this.montoFormControl.markAsDirty();
            this.conceptoFormControl.markAsDirty();
            this.observacionFormControl.markAsDirty();
            this.progress_registrar = false;

            return;
        }
        this.datosEgreso = {
            id_concepto  : tipoConcepto,
            FechaCompleta: this.FechaCompleta,
            monto        : this.monto,
            observacion  : this.observacion,
            id_persona   : this.id_persona,
            egreso_id    : this.egreso_id,
            id_Sede      : this.id_Sede,
            token        : this.token
        };
        console.log(this.datosEgreso);
        this._egresoService.saveEgreso(this.datosEgreso).subscribe(
            result => {

                console.log(result);
                if (result.error == 0) {
                    this.closeModalIngresarEgreso();
                    this.ticket = result;
                    this.ver();
                    this.crearTicket();
                    this.notificacion(this.result, 'Hecho');
                }
                this.progress_registrar = false;
                this.notificacion(result.msj, 'Hecho');


            },
            error => {
                console.log(<any>error);
            }
        );
    }

    validacionesAnularEgreso() {
        //(MAT-ERROR)
        if (this.observacionAFormControl.hasError('required'))
            return true;
        else return false;
    }

    mostrarFormularioAnular(id_movimiento, indice, fecha_registro, monto) {

        this.observacionAFormControl.reset();
        this.datosguardado = {
            id_movimiento: id_movimiento,
            fecha_registro: fecha_registro,
            FechaComparar: this.FechaComparar,
            monto: monto,
            id_persona: this.id_persona,
            id_Sede: this.id_Sede,
            egreso_id: this.egreso_id, //idcolaborador
            i: indice
        }

        this.openModalAnularEgreso();
        this.progress_registrar = false;
    }

    anularEgreso(datosguardado) {
        this.progress_registrar = true;
        this.result = 'Ingrese datos Validos y/o complete Campo';

        if (this.validacionesAnularEgreso()) {
            console.log("Error en observacion anulacion de Egreso");
            this.observacionAFormControl.markAsDirty();
            return;
        }
        this.datosguardado.observacionA = this.observacionA;
        this.datosguardado.token        = this.token;

        this._egresoService.updateEgreso(this.datosguardado).subscribe(
            result => {
                console.log(result);
                if (result.error == 0) {
                    this.closeModalAnularEgreso();
                    this.egresos.splice(this.datosguardado.i, 1);
                    this.dataSourceEgreso = new MatTableDataSource<ElementEgreso>(this.egresos);
                    this.dataSourceEgreso.paginator = this.paginator;
                    this.notificacion(this.result, 'Hecho');
                }
                this.progress_registrar = false;
                this.notificacion(result.msj, 'Hecho');

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    crearTicket() {
        const doc = new jsPDF();
        //Horizontal,Vertical
        doc.text('SEDE: ' + this.ticket.sede, 80, 50);
        doc.text('RUC: ' + this.ticket.ruc, 40, 60);
        doc.text('Fecha: ' + this.ticket.fecha, 40, 70);
        doc.text('Hora: ' + this.ticket.hora, 40, 80);
        doc.text('Usu. Reg: ' + this.ticket.usu_reg, 40, 90);
        //doc.text('Num. Ope: '   +this.m_id_movimiento      ,40,90); 
        doc.text('' + this.ticket.desc_concepto, 40, 100);
        doc.text('' + this.ticket.monto, 170, 100);
        doc.text('TOTAL: ', 40, 120);
        doc.text('' + this.ticket.monto, 170, 120);
        doc.text('Colaborador: ' + this.ticket.nombre, 40, 150);

        doc.save('ticket.pdf');
    }
}
