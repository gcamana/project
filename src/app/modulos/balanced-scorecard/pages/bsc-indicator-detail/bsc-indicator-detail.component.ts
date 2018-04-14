import { DataModule } from './../../../../shared/providers/data/data.module';
import { map }                                                                           from 'rxjs/operators/map';
import { Router, ActivatedRoute }                                                        from '@angular/router';
import { Location }                                                                      from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter, } from '@angular/core';
import { MediaMatcher }                                                                  from '@angular/cdk/layout';
import { DomSanitizer }                                                                  from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatIconRegistry }        from '@angular/material';
import { FormControl }                                                                   from '@angular/forms';
import { SelectionModel }                                                                from '@angular/cdk/collections';

import { Observable } from 'rxjs/Rx';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { IndicadorDetalleService }      from 'app/modulos/balanced-scorecard/pages/bsc-indicator-detail/bsc-indicator-detail.service';
import { SharedConstants }              from '../../../../shared/shared.constants';
import { CsTableDialogComponent }       from '../../components/cs-table-dialog/cs-table-dialog.component';
import { CsGaugeModalComponent }        from './../../components/cs-gauge-modal/cs-gauge-modal.component';
import { CsFilterModalComponent }       from './../../components/cs-filter-modal/cs-filter-modal.component';
import { CsHistoryTableModalComponent } from './../../components/cs-history-table-modal/cs-history-table-modal.component';
import { CsChartZoomModalComponent }    from 'app/modulos/balanced-scorecard/components/cs-chart-zoom-modal/cs-chart-zoom-modal.component';
import { CsIndicatorInformationModalComponent } from '../../components/cs-indicator-information-modal/cs-indicator-information-modal.component';
import { CsUserListModalComponent } from '../../../../shared/components/cs-user-list-modal/cs-user-list-modal.component';

@Component({
    selector    : 'bsc-indicator-detail',
    templateUrl : './bsc-indicator-detail.component.html',
    styleUrls   : ['bsc-indicator-detail.component.scss'],
    providers   : [IndicadorDetalleService]
})

export class BscIndicatorsDetailComponent {
    @Input('selectedTable') selectedTable: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output('pagination') pagination = new EventEmitter();

    mobileQuery: MediaQueryList;
    mobileQuery1: MediaQueryList;
    tablebQuery: MediaQueryList;

    public checkedAll: boolean = false;
    private _mobileQueryListener: () => void;
    public isTrend         : boolean = true;
    public isHistory       : boolean = false;
    public isStraighten    : boolean = false;
    public isCompareArrows : boolean = false;
    public isLockOutline   : boolean = false;

    public displayedColumns            :any[] = ['date', 'real', 'goal', 'green', 'red'];
    public dataSource                         = new MatTableDataSource<Element>(ELEMENT_DATA);
    public displayedColumnsComparation :any[] = ['id', 'comparativa', 'valor', 'select',];
    public dataSourceComparation              = new MatTableDataSource<ElementComparation>(ELEMENT_DATA_COMPARATIVA);
    public selection                          = new SelectionModel<ElementComparation>(true, []);

    REGISTRO: any[] = [
        // { dateStart: '06/11/2018', dateFinish: '1/26/2019', name: 'Carlos Galvez, Lomparte Suarez' },
        // { dateStart: '06/11/2018', dateFinish: '1/26/2019', name: 'Carlos Galvez, Lomparte Suarez' },
        // { dateStart: '06/11/2018', dateFinish: '1/26/2019', name: 'Carlos Galvez, Lomparte Suarez' },
        // { dateStart: '06/11/2018', dateFinish: '1/26/2019', name: 'Carlos Galvez, Lomparte Suarez' },
        // { dateStart: '06/11/2018', dateFinish: '1/26/2019', name: 'Carlos Galvez, Lomparte Suarez' },
    ];

    public registroLength     :number;
    public shoesLength        :number;
    public dataLength         :number;
    public title              :string = 'F1. a EVA (Valor Económico Agregado)';
    public displayTitle       :boolean= false;
    public UNKNOWN_USER_IMAGE :string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    public EMPTY_STATE_CIERRE :string = SharedConstants.EMPTY_PATHS.STATE_CIERRE;
    public EMPTY_HISTORY      :string = SharedConstants.EMPTY_PATHS.HISTORY;
    public values             :number = 33;
    public tabChanges         :any;
    public date                       = new FormControl(new Date());
    private token                     = sessionStorage.getItem('token');
    private dataDetalle      :any     = null;
    private isLoadingResults :boolean = true;
    private resultsLength    :number  = 0;
    private pageSize         :number  = 5;
    private pageIndex        :number  = 0;
    private id_pei           :number  = 5;
    private id_bsc           :number  = 5;
    private id_objetivo      :number  = 37;
    private id_indicador     :number  = 156;
    private year             :number  = 2018;
    public zona_riesgo       :number  = 0;
    public valor_meta        :number  = 80;
    public valor_amarillo    :number  = 100;
    public actual_indicador  :number  = 0;
    public valor_inicial     :number  = 100;
    public tipo_indi         :string = 'C';
    public tipo_calculo      :string = '';
    public valor_final       :number  = 0;
    private sede             :any;
    public json_freq         :any;
    public dataYears         :any;
    public estructura        :string = '';
    public arraySedes        :any;
    public dataGrafig        :any;
    public dataGrafigArea    :any[] = [];
    public dataComp          :any;
    public tipo_medicion     :any;
    public tipo_med_selected :any;
    public responsables      : any[] = [];
    public info_indi         :any = {unidad:'%'};
    dataHistoricos           : any[] = [];

    isSaveComparative : boolean = false;

    constructor(
        private _router                  : Router,
        private _activatedRoute          : ActivatedRoute,
        private _dialog                  : MatDialog,
        private _changeDetectorRef       : ChangeDetectorRef,
        private _location                : Location,
        private _media                   : MediaMatcher,
        private _indicadorDetalleService : IndicadorDetalleService,
        private _snackBar                : MatSnackBar,
        private _iconRegistry            : MatIconRegistry,
        private _sanitizer               : DomSanitizer
    ) {
        this.setMediaQuery();
        this.setData();
        this.setIcon();
        this.registroLength = this.REGISTRO.length || 0;

        this.getDataHistoryActivity()
            .subscribe(data=> {
                this.dataHistoricos = data;
            })
    }

    ngOnChanges() {
        this.setMediaQuery();
        this.setData();
    }


    getDataHistoryActivity() :Observable<any> {
        let data = [
                // {
                //     fecha: '12 de Marzo de 2016',
                //     desc :'Modificó la Zona de Riesgo de 15% a 16%',
                //     img: this.UNKNOWN_USER_IMAGE
                // },
                // {
                //     fecha: '12 de Marzo de 2016',
                //     desc :'Modificó la Zona de Satisfacción de 70% a 80%',
                //     img: this.UNKNOWN_USER_IMAGE
                // },
                // {
                //     fecha: '12 de Marzo de 2016',
                //     desc :'Modificó la Zona Vulnerable de 40% a 50%',
                //     img: this.UNKNOWN_USER_IMAGE
                // },
                // {
                //     fecha: '12 de Marzo de 2016',
                //     desc :'Modificó la Zona  Vulnerable de 15% a 31%',
                //     img: this.UNKNOWN_USER_IMAGE
                // },
        ]

        return Observable.create(obserbable=> {
            obserbable.next(data);
            obserbable.complete();
        })
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows     = this.dataSourceComparation.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSourceComparation.data.forEach(row => this.selection.select(row));
    }

    onPaginatedChange(event) {
        this.pagination.emit(event);
    }

    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
        this.dataSource.paginator = this.paginator;
    }

    setIcon() {
        this._iconRegistry.addSvgIcon(
            'cup', this._sanitizer.bypassSecurityTrustResourceUrl(SharedConstants.ICONS.CUP),
        );
    }

    editHistoryTable(element) {
        let modal = this._dialog.open(CsHistoryTableModalComponent, {
            width:'250px',
            data:{date:         element.date,
                  real:         element.real,
                  goal:         element.goal,
                  red:          element.red,
                  green:        element.green,
                  id_bsc:       this.id_bsc,
                  id_objetivo:  this.id_objetivo,
                  id_indicador: this.id_indicador,
                  year:         this.year,
                  estructura:   this.estructura}
        });

        modal.componentInstance.valuesHist.subscribe(
            result => {
                result.token = this.token;
                this._indicadorDetalleService.editHistoryTable(result).subscribe(
                    datos => {
                        this.dataDetalle      = datos.dataTable;
                        this.resultsLength    = datos.sizeData;
                        this.tipo_calculo     = datos.tipo_calculo;
                        this.json_freq        = datos.json_freq;
                        this.zona_riesgo      = this.json_freq.zona_riesgo;
                        this.valor_meta       = this.json_freq.valor_meta;
                        this.valor_amarillo   = this.json_freq.valor_amarillo;
                        this.valor_inicial    = this.json_freq.valor_inicial;
                        this.valor_final      = this.json_freq.valor_final;
                        this.actual_indicador = parseFloat(datos.actual_indicador);
                        this.dataSource       = new MatTableDataSource<Element>(datos.dataHistorico);
                    },
                    error => {
                        console.log('editHistoryTableSERVER => ' + error);
                    }
                );
            }, error => {
                console.log('editHistoryTable => ' + error);
            }
        );
    }

    openChartZoom(): void {
        let dialogRef = this._dialog.open(CsChartZoomModalComponent, {
            data: this.dataGrafigArea,
            height: '100vh',
            width: '100vw',
            panelClass: 'cs-zoom-modal',
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    onSelectedIndexChange(tabIndex) {
        this._setAllFalse(false)
        switch (tabIndex) {
            case 0:
                this.isTrend = true;
                break;
            case 1:
                this.isHistory = true;
                break;
            case 2:
                this.isStraighten = true;
                break;
            case 3:
                this.isCompareArrows = true;
                break;
            case 4:
                this.isLockOutline = true;
                break;
        }
    }

    private _setAllFalse(isFalse: boolean = false) {
        this.isTrend         = isFalse;
        this.isHistory       = isFalse;
        this.isStraighten    = isFalse;
        this.isCompareArrows = isFalse;
        this.isLockOutline   = isFalse;
    }

    setData() {
        var metadata = sessionStorage.getItem('data-indi');
        var data = { metadata: metadata, token: this.token };
        var variables = this;
        this._indicadorDetalleService.decryptIndicador(data).subscribe(
            result => {
                variables.id_pei       = result.pei;
                variables.id_bsc       = result.bsc;
                variables.id_objetivo  = result.obj;
                variables.id_indicador = result.ind;
                variables.year         = result.year;
                variables.getDataHistoricoMedicion(result);
                variables.getDataComparativa(result);
                variables.getDataIndi(function (data) {
                    variables.info_indi = data;
                    variables.info_indi.unidad = (variables.info_indi.unidad == null)?' ':variables.info_indi.unidad;
                    variables.estructura = data.estructura;
                    variables.title      = data.titu_indi;
                    variables.getDataTable();
                    variables.getDataArea({bsc: result.bsc, obj: result.obj, ind: result.ind, year: result.year, tipo_med : variables.tipo_med_selected, sedes : []});
                });
                let datos = { id_pei: variables.id_pei,
                              token:  variables.token,
                              year:   variables.year };
                //this.getDataGrafigActualAndMeta({bsc: result.bsc, obj: result.obj, ind: result.ind, year: result.year});
                variables._indicadorDetalleService.getDataYears(datos).subscribe(
                    result => {
                        variables.dataYears = result;
                    },
                    error => {
                        console.log('getDataYears => ' + error);
                    }
                );
            }, error => {
                console.log('decryptIndicador => ' + error);
            }
        );
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 800px)');
        this.mobileQuery1 = this._media.matchMedia('(max-width: 768px)');
        this.tablebQuery = this._media.matchMedia('(max-width: 1280px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
        this.mobileQuery1.addListener(this._mobileQueryListener);
        this.tablebQuery.addListener(this._mobileQueryListener);
    }

    goToDashboard() {
        this._router.navigate(['/bsc/dashboard'], { relativeTo: this._activatedRoute });
    }


    goToListUser() {
        let modal = this._dialog.open(CsUserListModalComponent, {
            width: ' 320px',
            data: {},
            panelClass:'cs-user-list-modal'
        });

        modal.afterClosed().
            subscribe(result => {
                //Code
            });
    }

    saveComparativeSelect() {
        this.isSaveComparative = true;
    }

    cancelComparativeSelect() {
        this.isSaveComparative = false;
        this.selection.selected.length = 0;
    }

    toggleFab() {
        let datos = {
            id_bsc:       this.id_bsc,
            id_objetivo:  this.id_objetivo,
            id_indicador: this.id_indicador,
            year:         this.year,
            sede:         this.sede,
            arraySedes:   this.arraySedes,
            token:        this.token,
            dataYears:    this.dataYears,
            filtro:       'content'
        };
        let modal = this._dialog.open(CsFilterModalComponent, {
            width: '300px',
            data: datos,
            panelClass: 'cs-toggle-filter'
        });

        modal.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.isLoadingResults = true;
                let datos             = result;
                this.year             = datos.year_selected;
                this.sede             = datos.sedes;
                this.arraySedes       = datos.arraySedes;
                datos.token           = this.token;
                datos.id_ind          = this.id_indicador;
                datos.id_objetivo     = this.id_objetivo;
                datos.id_bsc          = this.id_bsc;
                datos.pageIndex       = this.pageIndex;
                datos.pageSize        = this.pageSize;
                datos.estructura      = this.estructura;
                this._indicadorDetalleService.filtrarComponentes(datos).subscribe(
                    result => {
                        this.dataDetalle      = result.dataTable;
                        this.resultsLength    = result.sizeData;
                        this.json_freq        = result.json_freq;
                        this.tipo_calculo     = result.tipo_calculo;
                        this.tipo_indi        = result.tipo_indi;
                        this.zona_riesgo      = this.json_freq.zona_riesgo;
                        this.valor_meta       = this.json_freq.valor_meta;
                        this.valor_inicial    = this.json_freq.valor_inicial;
                        this.valor_final      = this.json_freq.valor_final;
                        this.valor_amarillo   = this.json_freq.valor_amarillo;
                        this.actual_indicador = parseFloat(result.actual_indicador);
                        this.isLoadingResults = false;
                        this.getDataArea({ bsc: this.id_bsc, obj: this.id_objetivo, ind: this.id_indicador, year: this.year, tipo_med : this.tipo_med_selected, sedes : this.sede});
                    },
                    error => {
                        console.log('toggleFab ==> afterClosed ==>' + error);
                    }
                );
            }
        });
    }

    goToInformatioEdit() {
        let modal = this._dialog.open(CsIndicatorInformationModalComponent, {
            width: '100%',
            data: {title        : this.title, 
                   tipo_med     : this.json_freq.tipo_medicion, 
                   formula      : this.info_indi.formula,
                   fuente_data  : this.info_indi.fuente_data,
                   oportunidad  : this.info_indi.oportunidad,
                   descripcion  : this.info_indi.descripcion,
                   unidad       : this.info_indi.unidad,
                   responsables : this.responsables},
            panelClass: 'cs-information-modal'
          });

          modal.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }

    editGaugeValue() {
        let modal = this._dialog.open(CsGaugeModalComponent, {
            width: '250px',
            data: { zona_riesgo: this.zona_riesgo, 
                    valor_meta: this.valor_meta, 
                    valor_amarillo: this.valor_amarillo, 
                    meta_visible: true, 
                    view: 'detail', 
                    tipo_calculo: this.tipo_calculo, 
                    valor_inicial:  this.valor_inicial, 
                    valor_final: this.valor_final, 
                    unidad_medida:this.info_indi.unidad,
                    tipo_indi: this.tipo_indi}
        });
        modal.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.zona_riesgo    = result.zona_riesgo;
                this.valor_meta     = result.valor_meta;
                this.valor_amarillo = result.valor_amarillo;
                this.valor_inicial  = result.valor_inicial;
                this.valor_final    = result.valor_final;
                let datos = {
                    zona_riesgo:    this.zona_riesgo,
                    valor_meta:     this.valor_meta,
                    valor_amarillo: this.valor_amarillo,
                    token:          this.token,
                    id_bsc:         this.id_bsc,
                    id_objetivo:    this.id_objetivo,
                    id_ind:         this.id_indicador,
                    year:           this.year,
                    tipo_calculo:   this.tipo_calculo,
                    valor_inicial:  this.valor_inicial,
                    valor_final:    this.valor_final
                };
                this._indicadorDetalleService.updateFreqMedi(datos).subscribe(
                    result => {
                        this._snackBar.open(result.message, 'cerrar', {
                            duration: 2000,
                        });
                        let param = { bsc: this.id_bsc, obj: this.id_objetivo, ind: this.id_indicador, year: this.year, tipo_med : this.tipo_med_selected, sedes : this.sede};
                        this.getDataArea(param);
                    },
                    error => {
                        console.log('editGaugeValue => ' + error);
                    }
                );
            }
        });
    }

    private _updateDataGauge(result) {
        this.zona_riesgo = result;
        let datos = {
            zona_riesgo: result,
            token:       this.token,
            id_bsc:      this.id_bsc,
            id_objetivo: this.id_objetivo,
            id_ind:      this.id_indicador,
            year:        this.year
        };
        this._indicadorDetalleService.updateFreqMedi(datos)
            .subscribe(result => {

            });
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.mobileQuery1.removeListener(this._mobileQueryListener);
        this.tablebQuery.removeListener(this._mobileQueryListener);
    }

    setNewCurrentValue(event) {
        event.token            = this.token;
        event.id_bsc           = this.id_bsc;
        event.id_objetivo      = this.id_objetivo;
        event.id_ind           = this.id_indicador;
        event.year             = this.year;
        event.pageIndex        = this.pageIndex;
        event.pageSize         = this.pageSize;
        event.tipo_calculo     = this.tipo_calculo;
        event.estructura       = this.estructura;
        event.actual_indicador = this.actual_indicador;
        this._indicadorDetalleService.editMedicionJSON(event).subscribe(
            result => {
                this.dataDetalle      = result.dataTable;
                this.resultsLength    = result.sizeData;
                this.json_freq        = result.json_freq;
                this.tipo_calculo     = result.tipo_calculo;
                this.zona_riesgo      = this.json_freq.zona_riesgo;
                this.valor_meta       = this.json_freq.valor_meta;
                this.valor_inicial    = this.json_freq.valor_inicial;
                this.valor_final      = this.json_freq.valor_final;
                this.valor_amarillo   = this.json_freq.valor_amarillo;
                this.actual_indicador = parseFloat(result.actual_indicador);
                let param = { bsc: this.id_bsc, obj: this.id_objetivo, ind: this.id_indicador, year: this.year, tipo_med : this.tipo_med_selected, sedes : this.sede};
                this.getDataArea(param);
            },
            error => {
                console.log('setNewCurrentValue ==> ' + error);
            }
        );
    }

    getDataTable() {
        this.isLoadingResults = true;
        var obj = {
            pageSize    : this.pageSize,
            token       : this.token,
            pageIndex   : this.pageIndex,
            id_bsc      : this.id_bsc,
            id_objetivo : this.id_objetivo,
            id_ind      : this.id_indicador,
            year        : this.year,
            estructura  : this.estructura
        };
        this._indicadorDetalleService.getDataTable(obj).subscribe(
            result => {
                this.dataDetalle      = result.dataTable;
                this.resultsLength    = result.sizeData;
                this.json_freq        = result.json_freq;
                this.tipo_calculo     = result.tipo_calculo;
                this.tipo_indi        = result.tipo_indi;
                this.zona_riesgo      = this.json_freq.zona_riesgo;
                this.valor_meta       = this.json_freq.valor_meta;
                this.valor_inicial    = this.json_freq.valor_inicial;
                this.valor_final      = this.json_freq.valor_final;
                this.valor_amarillo   = this.json_freq.valor_amarillo;
                this.actual_indicador = parseFloat(result.actual_indicador);
                this.isLoadingResults = false;
            },
            error => {
                console.log('getDataTable ==> ' + error);
            }
        );
    }

    paginationSizeTable(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getDataTable();
    }

    backPage() {
        this._location.back();
    }

    getDataIndi(respuesta) {
        var obj = {
            token:       this.token,
            id_bsc:      this.id_bsc,
            id_objetivo: this.id_objetivo,
            id_ind:      this.id_indicador
        };
        this._indicadorDetalleService.getDataIndi(obj).subscribe(
            result => {
                this.tipo_medicion     = result.tipo_med;
                this.tipo_med_selected = this.tipo_medicion.selected;
                this.responsables      = result.responsables;
                respuesta(result.data);
            },
            error => {
                console.log('getDataIndi => ' + error);
            }
        );
    }

    getDataGrafigActualAndMeta(param) {
        /*param.token = this.token;
        this._indicadorDetalleService.getDataGrafigActualAndMeta(param).subscribe(
            result => {
                this.dataGrafigArea = result;
            },
            error => {
                console.log(<any>error);
            }
        );*/
    }

    getDataHistoricoMedicion(data) {
        data.token = this.token;
        this._indicadorDetalleService.getDataHistoricoMedicion(data).subscribe(
            result => {
                this.dataSource = new MatTableDataSource<Element>(result);
            },
            error => {
                console.log(error);
            }
        );
    }

    getDataComparativa(data){
        data.token = this.token;
        this._indicadorDetalleService.getDataComparativa(data).subscribe(
            result => {
                this.dataSourceComparation = new MatTableDataSource<ElementComparation>(result);
            },
            error => {
                console.log(error);
            }
        );
    }

    getDataArea(data){
        data.token = this.token;
        this._indicadorDetalleService.getDataChartArea(data).subscribe(
            result => {
                this.dataGrafigArea = result;
            },
            error => {
                console.log(error);
            }
        )
    }

    filtroGeneral(){
        let datos = {
            id_bsc      : this.id_bsc,
            id_objetivo : this.id_objetivo,
            id_indicador: this.id_indicador,
            token       : this.token,
            tipo_med    : this.tipo_medicion,
            filtro      : 'chart',
            arraySedes  : this.arraySedes
        };
        let modal = this._dialog.open(CsFilterModalComponent, {
            width: '300px',
            data: datos,
            panelClass: 'cs-toggle-filter'
        });
        modal.componentInstance.setTipoMed.subscribe(
            result => {
                this.tipo_med_selected = result;
                this.getDataArea({ bsc: this.id_bsc, obj: this.id_objetivo, ind: this.id_indicador, year: this.year, tipo_med : this.tipo_med_selected, sedes : this.sede});
            }
        )
    }
}
export interface Element {
    date: string;
    real: string;
    goal: string;
    green: string;
    red: string;
}

const ELEMENT_DATA: Element[] = [
    { date: '06/11/2018', real: '12000', goal: '12000', green: '1200', red: '12000' }
];


export interface ElementComparation {
    id: string;
    comparativa: string;
    valor: string;
    checked: boolean;
}

const ELEMENT_DATA_COMPARATIVA: ElementComparation[] = [
    // { id: "1", comparativa: 'MINEDU', valor: '67.00', checked: true },
    // { id: "2", comparativa: 'MINEDU', valor: '67.00', checked: false },
    // { id: "3", comparativa: 'MINEDU', valor: '67.00', checked: true },
    // { id: "4", comparativa: 'MINEDU', valor: '67.00', checked: false },
    // { id: "5", comparativa: 'MINEDU', valor: '67.00', checked: true },
];
