import { Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ErrorStateMatcher } from '@angular/material/core';//(MAT-ERROR) Implementacion del error matcher 
import { ReportesService } from './reportes.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'; // (MAT-ERROR) Importar estas  directivas para
// que funcione los validadores del mat error
import { MatPaginator, MatTableDataSource } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
declare var jsPDF : any;
export interface ElementPagosPuntuales {
    fecha_pago: string;
    monto: number;
    descuento_acumulado: number;
    mora_acumulada: number;
    monto_adelanto:number;
    _id_persona: number;
    nombre_alumno: string;
    cod_alumno: string;
    ubicacion: string;
    desc_sede: string;
    desc_nivel: string;
    desc_grado: string;
    desc_aula: string;
    lugar_pago: string;
    nombre_apoderado: string;
    email1: string;
    estado: string;
    desc_detalle_crono: string
}
export interface ElementPensiones {
   //aqui van las columnas que regresa tu query al result
}

@Component({
    selector: 'reportes-tag',
    templateUrl: './reportes.component.html',
    providers: [ReportesService],
    styleUrls: ['./reportes.css']
})

export class ReportesComponent {
    @ViewChild('modalFiltroPensionesVencidas') modalFiltroPensionesVencidas;
    @ViewChild('modalVistaPreviaPDF') modalVistaPreviaPDF;
    @ViewChild('modalDetalleEstudiante') modalDetalleEstudiante;
    @ViewChild(MatPaginator) paginatorPagosPuntuales: MatPaginator;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSourcePensiones = new MatTableDataSource<ElementPensiones>();
    matcher = new MyErrorStateMatcher();
    //@ViewChild('modalFiltroCompromisosExtras') modalFiltroIngresos;
    indexMenu: number = 0;
    index: number = 0;//(MAT-TAB-GROUP)indice de cada MAT TAB (1º = 0, 2º = 1, ...)
    index3: string = "";
    //public
    public pensiones = [];
    
    public pagosPuntuales = [];
    public detalleEstudiante = [];
    public detalleEstudianteById = [];
    public tipoDeCuota = [];
    public grado = [];
    public aulas = [];
    public proggres_ingresos = false;
    public flg_empty_ingresos = true;
    public flg_empty_pensiones = true;
    public cabeceraTable = true;
    public tipoDeCronograma = [];
    public sede = [];
    public searchEgresos = '';
    public id_persona;
    public id_detalleCronograma;
    filtroTipoCronograma = null;
    filtroSede = null;
    fecha_inicio = null;
    fecha_fin = null;
    filtroTipoCuota = null;
    filtroGrado = null;
    filtroAula = null;
    idSede = null;
    //Controlador de los select . El required sirve para saber si esta el input vacio.
    selectCronogramaFormControl = new FormControl('', [Validators.required]);
    //(MAT-ERROR)Controladores que sirven para controlar los errores de los imput - buscar '[formControl]="yearFormControl" [errorStateMatcher]="matcher"' en el html    
    selectDetalleCronogramaFormControl = new FormControl('', [Validators.required]);
    displayedColumnsPagosPuntuales = 
    ['nombre_alumno', 'desc_sede','nombre_apoderado','email1','fecha_pago','lugar_pago','descuento_acumulado'];
    dataSourcePagosPuntuales = new MatTableDataSource<ElementPagosPuntuales>();
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _reportesService: ReportesService,
        public snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {
        this.tiposDeCronograma();
        this.sedes();
        this.flg_empty_pensiones = false;
    }

    openModalPensionesVencidas() {
        this.selectCronogramaFormControl.reset();
        this.selectDetalleCronogramaFormControl.reset();
        this.modalFiltroPensionesVencidas.nativeElement.className = 'modal fade show in';
    }
    closeModalPensionesV() {
        this.modalFiltroPensionesVencidas.nativeElement.className = 'modal fade';
    }

    openModalDetalleEstudiante() {
        this.modalDetalleEstudiante.nativeElement.className = 'modal fade show in';
    }
    closeModalDetalleEstudiante() {
        this.modalDetalleEstudiante.nativeElement.className = 'modal fade';
    }
    closeModalReporte(){
         this.modalVistaPreviaPDF.nativeElement.className = 'modal fade';  
    }

    //recibe los tipos de cronograma 
    tiposDeCronograma() {
        this._reportesService.getTipoDeCronograma().subscribe(
            result => {

                this.tipoDeCronograma = result;
                console.log(result);

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    sedes() {
        this._reportesService.getSede().subscribe(
            result => {

                this.sede = result;
                console.log(result);
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getTipoCuotas(event) {
        this.filtroTipoCuota = null;
        this.filtroGrado = null;
        this.filtroAula = null;
        this.tipoDeCuota = null;
        this.grado = null;
        this.aulas = null;
        if (event == null) {
            return;
        }
        this._reportesService.getTipoCuotaById(event).subscribe(
            result => {
                this.tipoDeCuota = result;
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getGradoById(event) {
        this.grado = null;
        this.aulas = null;
        this.filtroGrado = null;
        this.filtroAula = null;
        if (event == null) {
            return;
        }
        this._reportesService.getGradoById(this.filtroTipoCronograma).subscribe(
            result => {
                this.grado = result;
                //console.log(result);
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getAulasByGradoCronograma(event) {
        this.aulas = null;
        this.filtroAula = null;
        if (event == null) {
            return;
        }
        let datos_grado = event.split('_');
        //console.log(datos_grado);
        let obj = {
            id_grado: datos_grado[0],
            id_nivel: datos_grado[1],
            id_cronograma: this.filtroTipoCronograma
        };
        this._reportesService.getAulasByGradoCronograma(obj).subscribe(
            result => {
                this.aulas = result;
                //console.log(result);
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    buscarFiltro(Cro, Det, Gra, Aul) {
        console.log("ixM " + this.indexMenu);
        if (this.indexMenu == 0) this.getPensiones(Gra);
        else this.getPagosPuntuales(Cro, Det, Gra, Aul);
    }

    getPagosPuntuales(Cro, Det, Gra, Aul) {
        if (this.index == 1) {
            if (this.validacionesGuardarCronogramaPlantilla()) {
                this.selectCronogramaFormControl.markAsDirty();
                this.selectDetalleCronogramaFormControl.markAsDirty();
                return;
            }
            let datos_grado = [];
            if (Aul == undefined) Aul = null;
            if (Gra == undefined) {
                datos_grado[0] = null;
                datos_grado[1] = null;
            } else datos_grado = Gra.split('_');
            var obj = {
                id_cronograma: Cro,
                id_detalle_cronograma: Det,
                id_grado: datos_grado[0],
                id_nivel: datos_grado[1],
                id_aula: Aul
            };
            this.proggres_ingresos = true;
            this._reportesService.getPagosPuntuales(obj).subscribe(
                result => {
                    
                    this.dataSourcePagosPuntuales = new MatTableDataSource<ElementPagosPuntuales>(result);
                    this.dataSourcePagosPuntuales.paginator = this.paginator;
                    console.log(result);
                    this.pagosPuntuales = result;
                    this.proggres_ingresos = false;
                    this.closeModalPensionesV();
                },
                error => {
                    console.log(<any>error);
                }
            );
        } else {
            this.snackBar.open("No se puede buscar por fecha en PAGOS PUNTUALES !", "Aceptar", {
                duration: 3000,
            });
        }
    }

    getIdSede(_nid_sede) {
        console.log(_nid_sede);
        this.idSede = _nid_sede;
    }

    validacionesGuardarCronogramaPlantilla() {
        if (this.selectCronogramaFormControl.hasError('required') ||
            this.selectDetalleCronogramaFormControl.hasError('required')
        ) return true;
        else return false;

    }
    getPensiones(Gra) {
        if (this.index == 1) {
            if (this.validacionesGuardarCronogramaPlantilla()) {
                console.log("error");
                this.selectCronogramaFormControl.markAsDirty();
                this.selectDetalleCronogramaFormControl.markAsDirty();
                return;
            }//programa de aqui para abajo con tranquilidad.

            var obj = {
                tipoCronograma: this.filtroTipoCronograma,
                tipoCuota: this.filtroTipoCuota,
                grado: this.filtroGrado,
                aula: this.filtroAula,
                idSede: this.idSede
            };
            console.log(obj);
            this.proggres_ingresos = true;
            this._reportesService.getPensiones(obj).subscribe(
                result => {
                    this.pensiones = result;
                    //this.pensiones.paginator = this.paginator;
                    console.log(result);
                    this.cabeceraTable = (this.pensiones.length == 0) ? true : false;
                    this.proggres_ingresos = false;
                    if(this.pensiones.length == 0){
                            this.flg_empty_ingresos = false;
                            this.flg_empty_pensiones = true;
                    }else {
                          this.flg_empty_ingresos = false;     
                          this.flg_empty_pensiones = false;  
                    }

                    this.closeModalPensionesV();
                },
                error => {
                    console.log(<any>error);
                }
            );
        } else {
            console.log("getPensionesByFecha");
            //filtroSede
            let datos_grado = [];
            if (this.filtroAula == undefined) this.filtroAula = null;
            if (Gra == undefined) {
                datos_grado[0] = null;
                datos_grado[1] = null;
            } else datos_grado = Gra.split('_');



            var obj2 = {
                id_sede: this.filtroSede,
                fecha_venc1: this.fecha_inicio,
                id_grado: datos_grado[0],
                id_nivel: datos_grado[1],
                id_aula: this.filtroAula,
                fecha_venc2: this.fecha_fin
            };
            console.log(obj2);
            this.proggres_ingresos = true;
            this._reportesService.getPensionesByFecha(obj2).subscribe(
                result => {
                    this.pensiones = result;
                    console.log(result);
                    this.cabeceraTable = (this.pensiones.length == 0) ? true : false;
                    this.proggres_ingresos = false;
                    this.flg_empty_ingresos = (this.pensiones.length == 0) ? false : true;
                    this.flg_empty_pensiones = (this.pensiones.length == 0) ? false : true;
                    this.closeModalPensionesV();
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
    }

    mostrarIdSesion(_id_persona){
        this.id_persona=_id_persona;
    }

    getDetalleEstudiante(idPersona) {
        this.detalleEstudiante = null;
        this._reportesService.getDetalleEstudiante(idPersona, this.filtroTipoCuota).subscribe(
            result => {
                this.detalleEstudiante = result;

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getVistaPreviaReporte() {
        this.detalleEstudianteById = null;
        this.modalVistaPreviaPDF.nativeElement.className = 'modal fade show in';
        this._reportesService.getDetalleEstudiante(this.id_persona, this.filtroTipoCuota).subscribe(
            result => {
                this.detalleEstudianteById = result;

            },
            error => {
                console.log(<any>error);
            }
        )
    }

    getReporte(){
        var pdf = new jsPDF('landscape', 'pt');
        var source = document.getElementById('reportePDF');

        var margins = {
            top: 100,
            bottom: 50,
            left: 55,
            width: 800
        };

        pdf.setFont("helvetica");
        pdf.setFontType("bold");
        pdf.setFontSize(24);
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
                pdf.save('reporte.pdf');
            }
            , margins
        );
    }

    tabChange() {
        if (this.index == 0) {
            //(MAT-ERROR) El has error verifica si se ha tenido algun error en el input que contiene el FormControl, 
            //            required para inputs vacios.
            if (this.selectCronogramaFormControl.hasError('required')) { }
            //this.selectCronogramaFormControl.reset();
            //this.selectDetalleCronogramaFormControl.reset();
        } else {
            if (this.selectDetalleCronogramaFormControl.hasError('required')) { }
            //this.selectDetalleCronogramaFormControl.reset();
        }
    }
    tabChangeMenu(){
        if (this.indexMenu == 1) {
            this.index = 1;
           
        }
    }
    getReportesPagosPuntuales() {
      console.log("prueba");
      for(let i = 0 ; i  < this.pagosPuntuales.length ;i++){
        var strt = this.pagosPuntuales[i].desc_sede;
        this.pagosPuntuales[i].desc_sede  = strt.replace("AvantGard","");
        
        console.log(""+this.pagosPuntuales[i].desc_sede);
      }
        var columns = [
            {title: "Estudiante", dataKey: "nombre_alumno"},
            {title: "Sede", dataKey: "desc_sede"}, 
            {title: "Apoderado", dataKey: "nombre_apoderado"}, 
            {title: "Correo", dataKey: "email1"}, 
            {title: "Fecha de pago", dataKey: "fecha_pago"}, 
            {title: "Lugar de Pago", dataKey: "lugar_pago"}, 
            {title: "Total", dataKey: "descuento_acumulado"} 
        ];
        
        var doc = new jsPDF('p', 'pt');
        
        doc.autoTable(columns, this.pagosPuntuales, {
            styles: {
                rowHeight: 5, //changing this to 1 only affects the column headers
                fillColor: [188, 196, 196],
                columnWidth: 'auto',
                halign: "left",
                valign: "top",
                cellPadding: 1,
                lineWidth: 0.1
            },
            margin: { 
                top: 60,
                right: 30,
                bottom: 60,
                left: 60
            },
            bodyStyles: {
                overflow: "linebreak",
                rowHeight: 1,
                halign: "left",
                valign: "top",
                cellPadding: 1,
                lineWidth: 0.1
            },
            columnStyles: {
                rowHeight: 1,
                rowWidth:'wrap',
                cellPadding: 0.5,
                id: {fillColor: 255}
            },
            addPageContent: function(data) {
                doc.text("     Reporte de Pagos Puntuales", 40, 30);
            }
        });
        doc.save('ReportesPagosPuntuales.pdf');
    }
    limpiarFechaDesc() {
        this.fecha_fin = null;
        this.fecha_inicio = null;
    }
}