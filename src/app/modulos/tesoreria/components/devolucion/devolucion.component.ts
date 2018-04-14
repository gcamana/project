import { Component, ViewChild } from '@angular/core';
import { DevolucionService } from './devolucion.service';
import { CajaService } from '../caja/caja.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface ElementDevolucion {
    accion: string;
    devolucion: string;
    devuelto: string;
    estado: string;
    fecha_devolucion: string;
    fecha_registro: string;
    fecha_registro_ordenar: string;
    id_movimiento: number;
    monto_final: number;
    nombre_completo_regi: string;
    nombre_completo_retiro: string;
    tipo_movimiento: string;
    _id_concepto: number;
    _id_persona: number;
    desc_concepto: string;
}

@Component({
    selector: 'devolucion-tag',
    templateUrl: './devolucion.component.html',
    styleUrls: ['devolucion.component.css'],
    providers: [DevolucionService, CajaService]
})

export class DevolucionComponent {
    @ViewChild('modalRegistrarDevolucion') modalRegistrarDevolucion;
    public sede_sesion;
    public usuario_sesion;
    public colaboradores;
    public colaborador_dev;
    public monto_dev;
    public observacion_dev;
    public monto_final;
    // public estadoCajaActual;
    public fechaActual;
    public indiceUpdate;
    public idCajaActual;
    public usuario;
    public mov_colaborador;
    public nombre_usuario;

    displayedColumnsDevoluciones = ['nombre_completo_retiro', 'desc_concepto','fecha_registro','fecha_devolucion','monto_final','devuelto','accion'];
    dataSourceDevolucion = new MatTableDataSource<ElementDevolucion>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        // private element: ElementRef,
        private _route: ActivatedRoute,
        private _router: Router,
        private _DevolucionService: DevolucionService,
        private _CajaService: CajaService,
        private _userService: UserService,
        private _snackBar: MatSnackBar
    ) {
        var root = this;
        setTimeout(function () {
            root.sede_sesion = _userService.usuario.sede;
            root.usuario_sesion = _userService.usuario.persona;
            root.nombre_usuario = _userService.usuario.nombre;
        }, 1000);
        this.colaboradores = [];
        this.fechaActual = new Date();
    }

    ngOnInit() {
        var root = this;
        setTimeout(function () {
            root.detalleInicial();
        }, 1000);
    }
    
    detalleInicial() {

        this._CajaService.getEstadoCaja(this.usuario_sesion, this.parseDate(this.fechaActual), this.sede_sesion).subscribe(
            result => {
                if (result.length != 0) {
                    this.idCajaActual = result[0].id_caja;
                    if (result[0].estado_caja == 'APERTURADA') {

                        this.getDetalleColaborador();
                    }
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    openModalRegistrarDevolucion() {
        this.modalRegistrarDevolucion.nativeElement.className = 'modal fade show in';
    }

    closeModalRegistrarDevolucion() {
        this.colaboradores[this.indiceUpdate].devolucion = 0;
        this.modalRegistrarDevolucion.nativeElement.className = 'modal fade';
    }

    getDetalleColaborador() {
        this._DevolucionService.getDetalleColaborador(this.usuario_sesion, this.sede_sesion).subscribe(
            result => {
                this.dataSourceDevolucion = new MatTableDataSource<ElementDevolucion>(result);
                console.log(this.dataSourceDevolucion.data);
                this.dataSourceDevolucion.paginator = this.paginator;
                this.colaboradores = result;
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    goToCaja() {
        this._router.navigate(['/tesoreria', { outlets: { mod: ['caja'] } }]);
    }

    registrarDevolucion() {
        if (this.colaborador_dev == null) {
            this.notificacion("Acceso no permitido.", "CERRAR");
            return;
        }
        if (this.monto_dev == null || this.observacion_dev == null) {
            this.notificacion("Debe especificar un monto y una observación.", "CERRAR");
            return;
        }

        if (parseFloat(this.monto_dev) > parseFloat(this.monto_final)) {
            this.notificacion("El monto debe ser menor a " + this.monto_final, "CERRAR");
            return;
        }
        let obj = {
            monto: this.monto_dev,
            obs: this.observacion_dev,
            persona: this.colaborador_dev,
            usuario_regi: this.usuario_sesion,
            caja: this.idCajaActual,
            id_sede: this.sede_sesion,
            movi: this.mov_colaborador,
            nombre: this.nombre_usuario
        };
        this._DevolucionService.registrarDevolucion(obj).subscribe(
            result => {
                this.colaboradores[this.indiceUpdate].devolucion = 1;
                this.colaboradores[this.indiceUpdate].fecha_devolucion = this.parseDate(this.fechaActual);
                this.colaboradores[this.indiceUpdate].devuelto = this.monto_dev;
                this.modalRegistrarDevolucion.nativeElement.className = 'modal fade';
                this.indiceUpdate = null;
                this.monto_final = null;
                this.colaborador_dev = null;
                this.mov_colaborador = null;
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    setDatosMovimiento(monto, colaborador) {
    }

    parseDate(fecha) {
        var yyyy = fecha.getFullYear().toString();
        var mm = (fecha.getMonth() + 1).toString();
        var dd = fecha.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + yyyy;
    }

    modalDevolucion(indice, monto, persona, id_movimiento) {
        this.indiceUpdate = indice;
        this.monto_final = monto;
        this.colaborador_dev = persona;
        this.mov_colaborador = id_movimiento;
        if (this.colaboradores[indice].devolucion == 0) {
            // ABRIR MODAL
            this.openModalRegistrarDevolucion();
            this.colaboradores[indice].devolucion = 1;
        }
        // this.colaboradores.devolucion[indice] = !this.flag_ocultar[indice];
    }

    notificacion(msj, accion) {
        var duration = 3000;
        this._snackBar.open(msj, accion, { duration: duration });
    }
}