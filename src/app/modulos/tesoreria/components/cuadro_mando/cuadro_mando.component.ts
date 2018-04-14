import { Component } from '@angular/core';
import { CuadroMandoService } from './cuadro_mando.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';
// import { Chart } from 'angular-highcharts';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

@Component({
    selector: 'cuadro-mando-tag',
    templateUrl: './cuadro_mando.component.html',
    styleUrls: ['cuadro_mando.component.css'],
    providers: [CuadroMandoService]
})

export class CuadroMandoComponent {
    public sede_sesion;
    public usuario_sesion;
    public nombre_usuario;
    public fechaActual;
    public fecha_inicio;
    public fecha_fin;

    chart1: any;
    chart2: any;
    chart3: any;
    chart4: any;
    chart5: any;
    chart6: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _CuadroMandoService: CuadroMandoService,
        dateAdapter: DateAdapter<NativeDateAdapter>,
        private _userService: UserService,
        private _snackBar: MatSnackBar
    ) {

        var root = this;
        setTimeout(function () {
            root.sede_sesion = _userService.usuario.sede;
            root.usuario_sesion = _userService.usuario.persona;
            root.nombre_usuario = _userService.usuario.nombre;
        }, 1000);

        dateAdapter.setLocale('es-ES');
        this.fechaActual = new Date();
    }

    ngOnInit() {
        this.getGraficos();
        // this.graficoCobranzaGeneral();
        // this.graficoPagadoVspendienteMes();
        // this.graficoPagadoVspendienteSede();
        // this.graficoVencidoVSProntoPagoVSNormal();
        // this.graficoConcepto('INGRESO', null);
        // this.graficoConcepto('EGRESO', null);
    }
    getGraficos() {
        let obj = {
            fecha_inicio: null,
            fecha_fin: null
        };
        this._CuadroMandoService.getGraficos(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico1(result[0]);
                    this.buildGrafico2(result[1]);
                    console.log(JSON.stringify(result[1]));
                    this.buildGrafico3(result[2]);
                    this.buildGrafico4(result[3]);
                    this.buildGrafico5(result[4], 'INGRESO');
                    this.buildGrafico5(result[5], 'EGRESO');
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    // PRIMER GRAFICO
    graficoCobranzaGeneral() {
        let obj = {
            fecha_inicio: null,
            fecha_fin: null
        };
        this._CuadroMandoService.graficoCobranzasGeneral(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico1(result);
                }
            },
            error => {
                console.log(<any>error);
            }
        )

    }

    buildGrafico1(result) {
        let arraySedes = [];
        let arrayMora = [];
        let arrayCobrado = [];
        let arrayRestante = [];
        let arrayTotal = [];
        let arrayPie = [];
        let sumaMora = 0;
        let sumaRestante = 0;
        let sumaCobrado = 0;
        for (var key in result) {
            arraySedes.push(result[key]["desc_sede"]);
            arrayCobrado.push(parseFloat(result[key]["monto_pagado"]));
            arrayMora.push(parseFloat(result[key]["mora"]));
            arrayRestante.push(parseFloat(result[key]["monto_restante"]));
            arrayTotal.push(parseFloat(result[key]["monto_total"]));
            sumaMora += parseFloat(result[key]["mora"]);
            sumaRestante += parseFloat(result[key]["monto_restante"]);
            sumaCobrado += parseFloat(result[key]["monto_pagado"]);
        }
        arrayPie = [{ "name": "Mora", "y": sumaMora, "color": "#EF9A9A" },
        { "name": "Restante", "y": sumaRestante, "color": "#FFCC80" },
        { "name": "Cobrado", "y": sumaCobrado, "color": "#80CBC4" }];
        let series = [{
            type: 'column',
            name: 'Mora',
            data: arrayMora,
            color: '#EF9A9A'
        }, {
            type: 'column',
            name: 'Cobrado',
            data: arrayCobrado,
            color: '#80CBC4'
        }, {
            type: 'column',
            name: 'Restante',
            data: arrayRestante,
            color: '#FFCC80'
        }, {
            type: 'spline',
            name: 'Total',
            data: arrayTotal,
            color: '#81D4FA',
        }, {
            type: 'pie',
            data: arrayPie,
            center: [100, 20],
            size: 75,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }];

        // this.chart1 = new Chart({
        //     chart: {
        //         zoomType: 'xy'
        //     },
        //     title: {
        //         text: ''
        //     },
        //     xAxis: {
        //         categories: arraySedes
        //     },
        //     exporting: {
        //         enabled: false
        //     },
        //     yAxis: {
        //         title: {
        //             text: ' '
        //         }
        //     },
        //     series: series
        // });
    }
    // SEGUNDO GRAFICO
    graficoPagadoVspendienteMes() {
        let obj = {
            fecha_inicio: null,
            fecha_fin: null
        };
        this._CuadroMandoService.graficoPagadoVsPendienteMes(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico2(result);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    buildGrafico2(result) {
        let arrayNames = ['Pendiente', 'Pagado'];
        let arrayColor = ['#FFCC80', "#80CBC4"];
        let arrayCate = [];
        let arrayGen = [[], []];
        for (var key in result) {
            arrayCate.push(result[key]["mes"] + ' ' + result[key]["anio"]);
            arrayGen[0].push(parseFloat(result[key]["pendiente"]));
            arrayGen[1].push(parseFloat(result[key]["pagado"]));
        }
        // this.chart2 = new Chart({
        //     chart: {
        //         zoomType: 'xy'
        //     },
        //     title: {
        //         text: ' '
        //     },
        //     exporting: {
        //         enabled: false
        //     },
        //     xAxis: {
        //         categories: arrayCate
        //     }
        // });
        for (var i = 0; i < arrayGen.length; i++) {
            this.chart2.addSerie({
                name: arrayNames[i],
                data: arrayGen[i],
                color: arrayColor[i],
                zIndex: 1,
                pointWidth: 25
            });
        }
    }

    //TERCER GRAFICO
    graficoPagadoVspendienteSede() {
        let obj = {
            fecha_inicio: null,
            fecha_fin: null
        };

        this._CuadroMandoService.graficoPagadoVsPendienteSede(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico3(result);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    buildGrafico3(result) {
        let arrayPagados = [];
        let arrayPendientes = [];
        let arrayCategorias = [];
        for (var key in result) {
            let totalSede = Math.abs(result[key]["pagado"]) + parseFloat(result[key]["pendiente"]);
            arrayPagados.push({
                "y": parseFloat(result[key]["pagado"]),
                "name": totalSede != 0 ? parseFloat(((parseFloat(result[key]["pagado"]) / totalSede) * 100).toFixed(2)) : 0
            });
            arrayPendientes.push({
                "y": parseFloat(result[key]["pendiente"]),
                "name": totalSede != 0 ? parseFloat(((parseFloat(result[key]["pendiente"]) / totalSede) * 100).toFixed(2)) : 0
            });
            arrayCategorias.push(result[key]["desc_sede"]);
        }
        // this.chart3 = new Chart({
        //     chart: {
        //         type: 'bar',
        //         zoomType: 'xy'
        //     },
        //     title: {
        //         text: ' '
        //     },
        //     xAxis: [{
        //         categories: arrayCategorias,
        //         reversed: false,
        //         labels: {
        //             step: 1
        //         }
        //     }, { // mirror axis on right side
        //         opposite: true,
        //         reversed: false,
        //         categories: arrayCategorias,
        //         linkedTo: 0,
        //         labels: {
        //             step: 1
        //         }
        //     }],
        //     yAxis: {
        //         title: {
        //             text: null
        //         },
        //         labels: {
        //             formatter: function () {
        //                 return Math.abs(this.value) + '';
        //             }
        //         }
        //     },
        //     exporting: {
        //         enabled: false
        //     },
        //     tooltip: {
        //         formatter: function () {
        //             return '<b>' + this.point.category + '</b>' +
        //                 '<br/>' + Math.abs(this.key) + '%' +
        //                 '<br/> S/. ' + Math.abs(this.point.y);
        //         }
        //     },
        //     series: [{
        //         name: 'Pendiente',
        //         data: arrayPendientes,
        //         color: '#FFCC80'
        //     }, {
        //         name: 'Pagado',
        //         data: arrayPagados,
        //         color: '#80CBC4'
        //     }]
        // });
    }

    //CUARTO GRAFICO
    graficoVencidoVSProntoPagoVSNormal() {
        let obj = {
            fecha_inicio: null,
            fecha_fin: null
        };

        this._CuadroMandoService.graficoVencidoVSProntoPagoVSNormal(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico4(result);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    buildGrafico4(result) {
        let arrayCategorias = [];
        let arrayVencidos = [];
        let arrayPuntuales = [];
        let arrayNormal = [];
        for (var key in result) {
            arrayCategorias.push(result[key]["desc_sede"]);
            arrayNormal.push(parseFloat(result[key]["normal"]));
            arrayVencidos.push(parseFloat(result[key]["vencido"]));
            arrayPuntuales.push(parseFloat(result[key]["puntual"]));
        }
        // this.chart4 = new Chart({
        //     chart: {
        //         polar: true,
        //         type: 'line',
        //         zoomType: 'xy'
        //     },
        //     title: {
        //         text: ' ',
        //         x: -80
        //     },

        //     pane: {
        //         size: '80%'
        //     },
        //     xAxis: {
        //         categories: arrayCategorias,
        //         tickmarkPlacement: 'on',
        //         lineWidth: 0
        //     },

        //     yAxis: {
        //         // gridLineInterpolation: 'polygon',
        //         lineWidth: 0,
        //         min: 0
        //     },

        //     tooltip: {
        //         shared: true,
        //         pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        //     },

        //     series: [{
        //         name: 'Pagos Vencidos',
        //         data: arrayVencidos,
        //         color: '#EF9A9A'
        //         // ,pointPlacement: 'on'
        //     }, {
        //         name: 'Pronto Pago',
        //         data: arrayPuntuales,
        //         color: '#80CBC4'
        //         // ,pointPlacement: 'on'
        //     }, {
        //         name: 'Pagos Normales',
        //         data: arrayNormal,
        //         color: '#90CAF9'
        //         // ,pointPlacement: 'on'
        //     }]
        // });
    }

    graficoConcepto(desc_concepto, obj_filtro) {
        let obj = {
            concepto: [desc_concepto]
        };

        this._CuadroMandoService.graficoConcepto(obj).subscribe(
            result => {
                if (result.rowCount != 0) {
                    this.buildGrafico5(result, desc_concepto);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    buildGrafico5(result, desc_concepto) {
        let arrayCategorias = [];
        let arrayColores = [];
        let arrayMontos = [];
        for (var key in result) {
            arrayMontos.push(parseFloat(result[key]["monto"]));
            arrayCategorias.push(result[key]["concepto"]);
        }
        let series_name = (desc_concepto == 'INGRESO' ? 'Conceptos' : 'Egresos');
        // let new_chart = new Chart({
        //     chart: {
        //         type: 'column',
        //         zoomType: 'x',
        //         resetZoomButton: {
        //             theme: {
        //                 fill: 'white',
        //                 stroke: 'silver',
        //                 r: 0,
        //                 states: {
        //                     hover: {
        //                         fill: '#41739D',
        //                         style: {
        //                             color: 'white'
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     title: {
        //         text: ' '
        //     },
        //     xAxis: {
        //         categories: arrayCategorias
        //     },
        //     yAxis: {
        //         allowDecimals: false,
        //         min: 0,
        //         title: {
        //             text: ' '
        //         }
        //     },
        //     exporting: {
        //         enabled: false
        //     },
        //     tooltip: {
        //         formatter: function () {
        //             return '<b>' + this.x + '</b><br/>' +
        //                 'Monto: ' + 'S/.' + this.y + '<br/>';
        //         }
        //     },
        //     series: [{
        //         data: arrayMontos,
        //         name: series_name,
        //         color: '#80CBC4',
        //     }],
        // });
        // if (desc_concepto == 'INGRESO') {
        //     this.chart5 = new_chart;
        // } else if (desc_concepto == 'EGRESO') {
        //     this.chart6 = new_chart;
        // }
    }

    getGraficosByFiltro() {
        var dateinicio = Date.parse(this.fecha_inicio);
        var datefin = Date.parse(this.fecha_fin);
        if (dateinicio > datefin) {
            this.notificacion("la fecha de inicio debe ser posterior a la fecha de fin.", "CERRAR");
            return;
        }
        if (dateinicio == datefin) {
            this.notificacion("la fecha de inicio debe ser diferente a la fecha de fin.", "CERRAR");
            return;
        }
        let obj = {
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin
        };

        this._CuadroMandoService.getGraficos(obj).subscribe(
            result => {
                this.chart1, this.chart2, this.chart3, this.chart4, this.chart5, this.chart6 = null;
                if (result.rowCount != 0) {
                    this.buildGrafico1(result[0]);
                    this.buildGrafico1(result[0]);
                    this.buildGrafico2(result[1]);
                    this.buildGrafico3(result[2]);
                    this.buildGrafico4(result[3]);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    notificacion(msj, accion) {
        var duration = 3000;
        this._snackBar.open(msj, accion, { duration: duration });
    }

    limpiarFechaDesc() {
        this.fecha_inicio = undefined;
        this.fecha_fin = undefined;
    }
}