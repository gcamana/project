import { Component } from '@angular/core';
import { CajaService } from './caja.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';
import * as jsPDF from 'jspdf';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'caja-tag',
    templateUrl: './caja.component.html',
    styleUrls: ['caja.component.css'],
    providers: [CajaService]
})

export class CajaComponent {
    public usuario: Usuario;
    public sede_sesion;
    public usuario_sesion;
    //DATOS CAJA
    public caja;
    public fechaCaja;
    public fechaActual;
    public egresosIngresos;
    egresosIngresosReporte;
    public compromisos;
    public accionAbrir;
    public accionCerrar;
    public estadoCajaActual;
    public nombre_usuario;
    public idCajaActual;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
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
        this.caja = [];
        //let fecha = this.parseDate(new Date());
        this.fechaCaja = new Date();

        this.fechaActual = new Date();

        this.egresosIngresos = [];
        this.compromisos = "Compromisos";
    }

    ngOnInit() {
        var root = this;
        let flgDia = this.fechaCaja.getUTCDay();
        if (flgDia == 0) {
            this.fechaCaja.setDate(this.fechaCaja.getDate() - 1);
        }
        setTimeout(function () {
            root.datosCaja();
            root.estadoCaja();
        }, 1000);
    }

    datosCaja() {
        this._CajaService.getCaja(this.usuario_sesion, this.parseDate(this.fechaCaja), this.sede_sesion).subscribe(
            result => {
                this.caja = result;
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    verDetalleAccion(accion) {
        this.compromisos = accion;
        this._CajaService.getDetalleByAccion(this.usuario_sesion, accion, this.parseDate(this.fechaCaja), this.sede_sesion).subscribe(
            result => {
                this.egresosIngresos = result;
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    eliminarAudi(fila, idAudi, correlativo) {
        this._CajaService.deleteAudi(idAudi, correlativo).subscribe(
            result => {
                if (result.rowCount == 1) {
                    this.egresosIngresos.splice(fila, 1);
                    this.datosCaja();
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    changeDayByType(tipo) {
        let fechaAux = this.fechaCaja;
        if (tipo == 1) {
            fechaAux.setDate(fechaAux.getDate() - 1);
            let flgDia = this.fechaCaja.getUTCDay();
            if (flgDia == 0) {
                fechaAux.setDate(fechaAux.getDate() - 1);
            }
        } else if (tipo == 2) {
            fechaAux.setDate(fechaAux.getDate() + 1);
            let flgDia = this.fechaCaja.getUTCDay();
            if (flgDia == 0) {
                fechaAux.setDate(fechaAux.getDate() + 1);
            }
        }
        this.fechaCaja = new Date(fechaAux);
        this.datosCaja();
        this.estadoCaja();
    }

    estadoCaja() {
        if (this.validateFechaActual()) {
            this._CajaService.getEstadoCaja(this.usuario_sesion, this.parseDate(this.fechaCaja), this.sede_sesion).subscribe(
                result => {
                    if (result.length != 0) {
                        this.estadoCajaActual = result[0].estado_caja;
                        this.idCajaActual = result[0].id_caja;
                        if (result[0].estado_caja == 'APERTURADA') {
                            this.accionAbrir = true;
                            this.accionCerrar = false;
                        } else {
                            this.accionAbrir = true;
                            this.accionCerrar = true;
                        }
                    } else {
                        this.accionAbrir = false;
                        this.accionCerrar = true;
                    }
                },
                error => {
                    console.log(<any>error);
                }
            )
        }
    }

    aperturarCaja() {
        if (this.estadoCajaActual == 'APERTURADA') {
            this.notificacion("La caja ya ha sido aperturada.", "CERRAR");
            return;
        }
        var monto_inicio;
        this._CajaService.getMontoInicioCaja(this.usuario_sesion, this.parseDate(this.fechaCaja), this.sede_sesion).subscribe(
            result => {
                var monto_inicio = result[0].monto_inicio;
                var fecha = this.parseDate(this.fechaCaja);
                let obj = {
                    desc_caja: 'Caja ' + fecha,
                    estado_caja: 'APERTURADA',
                    _id_sede: this.sede_sesion,
                    monto_inicio: monto_inicio,
                    id_pers_caja: this.usuario_sesion
                };
                this._CajaService.aperturarCaja(obj).subscribe(
                    result => {
                        this.estadoCajaActual = 'APERTURADA';
                        this.accionAbrir = true;
                        this.accionCerrar = false;
                    },
                    error => {
                        console.log(<any>error);
                    }
                )
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    cerrarCaja() {
        if (this.estadoCajaActual == 'CERRADA') {
            this.notificacion("La caja ya ha sido cerrada.", "CERRAR");
            return;
        }
        if (this.estadoCajaActual != 'APERTURADA') {
            this.notificacion("Debes aperturar la caja.", "CERRAR");
            return;
        }
        let obj = {
            sede: this.sede_sesion,
            usuario: this.usuario_sesion,
            nombre: this.nombre_usuario,
            fecha: this.parseDate(this.fechaCaja)
        };

        this._CajaService.cerrarCaja(obj).subscribe(
            result => {
                this.estadoCajaActual = 'CERRADA';
                this.accionAbrir = true;
                this.accionCerrar = true;
            },
            error => {
                console.log(<any>error);
            }
        )

    }

    validateFechaActual() {
        return String(this.fechaCaja) == String(this.fechaActual);
    }

    parseDate(fecha) {
        var yyyy = fecha.getFullYear().toString();
        var mm = (fecha.getMonth() + 1).toString();
        var dd = fecha.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + yyyy;
    }

    goToDevoluciones() {
        if (this.estadoCajaActual == 'CERRADA') {
            this.notificacion("Tu caja está cerrada.", "CERRAR");
            return;
        }
        if (this.estadoCajaActual != 'APERTURADA') {
            this.notificacion("Debes aperturar la caja.", "CERRAR");
            return;
        }
        // SETEAR ID CAJA ACTUAL EN SESION this.idCajaActual
        this._router.navigate(['/tesoreria', { outlets: { mod: ['devolucion'] } }]);
    }
    
    getVistaPreviaReporteCaja() {
        this._CajaService.getDetalleByAccion(this.usuario_sesion, null, this.parseDate(this.fechaCaja), this.sede_sesion).subscribe(
            result => {
                this.egresosIngresosReporte = result;
            },
            error => {
                console.log(<any>error);
            }
        )

    }

    getReporteCaja() {
        var pdf = new jsPDF('landscape', 'pt');
        var source = document.getElementById('reporteCajaPDF');

        var margins = {
            top: 30,
            bottom: 40,
            left: 35,
            width: 600
        };

        pdf.setFont("helvetica");
        pdf.setFontType("bold");
        pdf.setFontSize(24);
        // PENDIENTE TRAER SEDE SEGUN USUARIO
        pdf.text(150, 30, this.nombre_usuario + '  ' + 'Fecha: ' + this.parseDate(this.fechaCaja));// obtener la sede
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top,
            {// y coord
                'width': margins.width, // max width of content on PDF
                // 'elementHandlers': specialElementHandlers
            },
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('reporteCaja.pdf');
            }
            , margins
        );
    }

    notificacion(msj, accion) {
        var duration = 3000;
        this._snackBar.open(msj, accion, { duration: duration });
    }
}