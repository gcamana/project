import { Component, ViewChild } from '@angular/core';
import { GestionarConceptosService } from '../gestionar_conceptos/gestionar_conceptos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export interface ElementConceptos {
    id_concepto: any;
    tipo_movimiento: any;
    desc_concepto: any;
    fecha_registro: any;
    monto_referencia: any;
    flg: any;
    cuenta_movimientos: any;
}

@Component({
    selector: 'gestionar_conceptos-tag',
    templateUrl: './gestionar_conceptos.component.html',
    styleUrls: ['gestionar_conceptos.component.css'],
    providers: [GestionarConceptosService]
})

export class GestionarConceptosComponent {
    public usuario: Usuario;
    public sede_sesion;
    public usuario_sesion;
    public nombre_usuario;
    //DATOS GESTIONAR
    public conceptos;
    public disabled;
    public id_concepto;
    public desc_concepto;
    public monto_referencia;
    public desc_concepto2;
    public monto_referencia2;
    public listaTipos;
    public tipo_concepto;
    public eliminar_desc_concepto;
    public eliminar_tipo_movimiento;
    public eliminar_fecha_registro;
    public eliminar_monto_referencia;
    public eliminar_cuenta_movimientos;
    public eliminar_id_concepto;
    public editar_posicion;
    public eliminar_posicion;

    displayedColumnsConceptos = ['desc_concepto', 'tipo_movimiento', 'fecha_registro', 'monto_referencia',/* 'estado',*/ 'acciones'];
    dataSourceConceptos = new MatTableDataSource<ElementConceptos>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    /*
    //CONTROL DEL FORMULARIO
    matcher = new MyErrorStateMatcher();
    public montoRegex = /^[0-9]+([.][0-9]+)?$/;
    montoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.montoRegex)]);//el pattern sirve para controlar el input dependiendo del parametro, en este caso el REGEX
        
    
    //conceptoFormControl = new FormControl('', [Validators.required]);
    //selectFormControl = new FormControl('', [Validators.required]);
    //observacionFormControl = new FormControl('', [Validators.required]);
    //observacionAFormControl = new FormControl('', [Validators.required]);
    */

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _gestionarConceptosService: GestionarConceptosService,
        private _snackBar: MatSnackBar,
        private _userService: UserService
    ) {
        var root = this;
        setTimeout(function () {
            root.sede_sesion = _userService.usuario.sede;
            root.usuario_sesion = _userService.usuario.persona;
            root.nombre_usuario = _userService.usuario.nombre;
        }, 1000);

        this.conceptos = [];
        this.disabled = [];
        this.listaTipos = [];

        this.id_concepto = null;
        this.desc_concepto = null;
        this.monto_referencia = null;
        this.desc_concepto2 = null;
        this.monto_referencia2 = null;
        this.tipo_concepto = null;
        this.editar_posicion = null;

        this.eliminar_desc_concepto = null;
        this.eliminar_tipo_movimiento = null;
        this.eliminar_fecha_registro = null;
        this.eliminar_monto_referencia = null;
        this.eliminar_id_concepto = null;
        this.eliminar_cuenta_movimientos = null;
        this.eliminar_posicion = null;

    }
    ngOnInit() {
        var root = this;
        setTimeout(function () {
            root.mostrar();
            root.getListTipos();
        }, 1000);
    }
    mostrar() {
        this._gestionarConceptosService.getConceptos().subscribe(
            result => {
                console.log(result);
                this.conceptos = result;
                this.dataSourceConceptos = new MatTableDataSource<ElementConceptos>(result);
                this.dataSourceConceptos.paginator = this.paginator;

            },
            error => {
                console.log(<any>error);
            }
        );
    }

    editarConceptos(_id_concepto, _desc_concepto, _monto_referencia, i) {
        //Al hacer click en el lapiz, obtiene los atributos actuales del concepto.
        this.id_concepto = _id_concepto;
        this.desc_concepto = _desc_concepto;
        this.monto_referencia = _monto_referencia;
        this.editar_posicion = i;
    }

    editarConceptosAux() {
        //VALIDACIONES
        var regex = new RegExp("^\\d+(\\.\\d{2,2})?$|^\\d+(\\,\\d{2,2})?$");


        if (regex.test(this.monto_referencia) == false) {
            this.notificacion("Error, numero incorrecto, ingrese un número positivo entero o con 2 decimales.", "CERRAR");
        }
        else if (this.monto_referencia > 999999.99) {
            this.notificacion("Error, número máximo permitido: 999999.99", "CERRAR");
        }
        else if (this.desc_concepto == "" || this.desc_concepto == null) {
            this.notificacion("Error, seleccione un tipo de concepto válido.", "CERRAR");
        }
        else {
            //Cambia el concepto en la base de datos.
            this._gestionarConceptosService.editConceptos(this.id_concepto, this.monto_referencia).subscribe(
                result => {
                    this.notificacion("Se ha actualizado el concepto.", "CERRAR");
                    this.conceptos[this.editar_posicion].monto_referencia = parseFloat(this.monto_referencia).toFixed(2);
                    this.dataSourceConceptos = new MatTableDataSource<ElementConceptos>(this.conceptos);
                    this.dataSourceConceptos.paginator = this.paginator;
                },
                error => {
                    console.log(<any>error);
                }
            );
            //this.mostrar();
        }

    }

    registrarConcepto() {
        var regex = new RegExp("^\\d+(\\.\\d{2,2})?$|^\\d+(\\,\\d{2,2})?$");


        if (this.desc_concepto2 == null) {
            this.notificacion("Error, la descripción del concepto no puede estar en blanco.", "CERRAR");
        }
        else if (this.desc_concepto2.length > 100) {
            this.notificacion("Error, la longitud del concepto no debe superar los 100 caracteres.", "CERRAR");
        }
        else if (regex.test(this.monto_referencia2) == false) {
            this.notificacion("Error, numero incorrecto, ingrese un número positivo entero o con 2 decimales.", "CERRAR");
        }
        else if (this.monto_referencia2 > 999999.99) {
            this.notificacion("Error, número máximo permitido: 999999.99", "CERRAR");
        }
        else if (this.tipo_concepto == "" || this.tipo_concepto == null) {
            this.notificacion("Error, seleccione un tipo de concepto válido.", "CERRAR");
        }
        else {
            //REGISTRA el concepto en la base de datos.
            this._gestionarConceptosService.setConceptos(this.desc_concepto2, this.monto_referencia2, this.tipo_concepto).subscribe(
                result => {
                    var d = new Date();
                    var dia = d.getDate();
                    var mes = d.getMonth()+1;
                    var ano = d.getFullYear();
                    var fecha = dia+"/"+mes+"/"+ano;


                    let NEW_ARRAY = {
                        id_concepto: 0,
                        tipo_movimiento: this.tipo_concepto,
                        desc_concepto: this.desc_concepto2,
                        fecha_registro: fecha,
                        monto_referencia: parseFloat(this.monto_referencia2).toFixed(2),
                        flg: false,
                        cuenta_movimientos: 0
                    }
                    console.log(result);
                    this.notificacion("Se ha registrado el concepto.", "CERRAR");
                    this.conceptos.splice(0, 0, NEW_ARRAY);
                    this.dataSourceConceptos = new MatTableDataSource<ElementConceptos>(this.conceptos);
                    this.dataSourceConceptos.paginator = this.paginator;
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
    }

    eliminarConcepto(_id_concepto, _desc_concepto, _tipo_movimiento, _fecha_registro, _monto_referencia, _cuenta_movimientos, _eliminar_posicion) {
        this.eliminar_id_concepto = _id_concepto;
        this.eliminar_desc_concepto = _desc_concepto;
        this.eliminar_tipo_movimiento = _tipo_movimiento;
        this.eliminar_fecha_registro = _fecha_registro;
        this.eliminar_monto_referencia = _monto_referencia;
        this.eliminar_cuenta_movimientos = _cuenta_movimientos;
        this.eliminar_posicion = _eliminar_posicion;
    }

    eliminarConceptoAux() {
        let salida = "";

        if (this.eliminar_cuenta_movimientos != 0) {
            salida = "Error, el concepto tiene " + this.eliminar_cuenta_movimientos + " movimientos asociados, no se puede eliminar.";
        }
        else {
            salida = "Se ha eliminado el concepto.";

            this._gestionarConceptosService.deleteConceptos(this.eliminar_id_concepto).subscribe(
                result => {
                    console.log(result);
                    this.notificacion("Se ha eliminado el concepto.", "CERRAR");
                    this.conceptos.splice(this.eliminar_posicion, 1);
                    this.dataSourceConceptos = new MatTableDataSource<ElementConceptos>(this.conceptos);
                    this.dataSourceConceptos.paginator = this.paginator;
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
        this.notificacion(salida, "CERRAR");
    }

    notificacion(msj, accion) {
        var duration = 3000;
        this._snackBar.open(msj, accion, { duration: duration });
    }

    getListTipos() {
        this._gestionarConceptosService.getListTipos().subscribe(
            result => {
                console.log(result);
                this.listaTipos = result;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}

