import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { CsOpenCashModalComponent } from '../../components/cs-open-cash-modal/cs-open-cash-modal.component';
import { CsShareCashModalComponent } from '../../components/cs-share-cash-modal/cs-share-cash-modal.component';
// Servicios
import { TsrBankService } from './tsr-bank.service';
import { TsrMovementsService } from '../tsr-movements/tsr-movements.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { CalendarEvent, CalendarDateFormatter, DAYS_OF_WEEK, CalendarMonthViewDay, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CsCalendarDateFormatter } from '../../providers/cs-calendar-date-formatter.provider'
import { CsIncidentsModalComponent } from '../../components/cs-incidents-modal/cs-incidents-modal.component';
import { CsRefundHistoricalModalComponent } from '../../components/cs-refund-historical-modal/cs-refund-historical-modal.component';
import { saveAs } from 'file-saver';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import * as _moment from 'moment';
import { CsChartBankZoomComponent } from '../../components/cs-chart-bank-zoom/cs-chart-bank-zoom.component';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { CsIncidentCalendarModalComponent } from '../../components/cs-incident-calendar-modal/cs-incident-calendar-modal.component';

const colors: any = {
    red: {
        primary: '#FF3504',
        secondary: '#3b938b'
    }
};

const GREEN_CELL: 'green-cell' = 'green-cell';

@Component({
    selector: 'tsr-bank-component',
    templateUrl: 'tsr-bank.component.html',
    styleUrls: ['tsr-bank.component.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CsCalendarDateFormatter
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'es-ES'
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS
        },
        {
            provide: LOCALE_ID,
            useValue: 'es-ES'
        },
        TsrBankService,
        TsrMovementsService,
    ]
})

export class tsrBankComponent implements OnInit {
    view: string = 'month';
    viewDate: Date = new Date();
    filtro: Boolean;
    @ViewChild('tsrsidenav') tsrsidenav;
    @ViewChild('focusStart') focusStart: ElementRef;
    @ViewChild('focusStop') focusStop: ElementRef;
    // events: CalendarEvent[]
    events: any[] = [
        {
            id: 1,
            start: subDays(startOfDay(new Date()), 1),
            end: subDays(startOfDay(new Date()), 1),
            price: 'S/. 80.00',
            description: 'Por el Robo del día 05-01-2018',
            color: colors.red,
            type: 'perdida',
            // type: 'reposicion'
        }
    ];

    refresh: Subject<any> = new Subject();
    cssClass: string = '';
    // filtro: boolean;
    clickedDate: Date;
    activeDayIsOpen: boolean = false;
    locale: string = 'es';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
    selectedMonthViewDay: CalendarMonthViewDay;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    INGRESOS: string = SharedConstants.ACCION.INGRESOS;
    EGRESOS: string = SharedConstants.ACCION.EGRESOS;
    detail_data_bank: any[] = [];
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    mobileQuerySide: MediaQueryList;
    displayedColumns = ['description', 'amount', 'date', 'payment_method', 'students', 'record', 'action'];
    dataSource: any = null;
    token: string = null;
    estado_caja: string;
    openCash: boolean;
    move_chart: any;
    // Filtro de fechas
    selectDate: any;
    selectEndDate: any;
    isFilterMode: Boolean;
    chartSeries: any;
    isDateNow: Boolean = true;
    // filtro:any;
    isCardView: boolean = false;
    movements: any;
    graphics: any;
    action_selected: number;
    criteria_data: any;
    // Datos de la secretaria
    name_scr: string;
    photo_per: string;
    caja_share: any = { name: null, user: null, foto: null };
    shared_info: any;
    serial: any = { ingresos: {name : 'Ingresos' , data : null }, egresos: {name : 'Egresos' , data : null }, dia: null };

    @ViewChild(MatPaginator) paginator: MatPaginator;

    newDateForm: FormGroup;

    dateFilterArray: any[] = [];

    isOpenFab: boolean;
    newfilterDate: any;
    isFilterTitle: boolean;
    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    users: any = [
        {
            foto_persona: "",
            nombres: "Juan antonio Juarez"
        },
        {
            foto_persona: "",
            nombres: "Juan antonio Juarez"
        },
        {
            foto_persona: "",
            nombres: "Juan antonio Juarez"
        },
    ]

    constructor(
        private _location: Location,
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        public _tsrBankSrv: TsrBankService,
        public _tsrMovementsSrv: TsrMovementsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder
    ) {
        this.setMediaQuery();
        this.selectDate = this.selectDate || this.viewDate;
    }


    handleEvent(action: string, event: CalendarEvent): void {
        this.openIncidenModal(event)
        console.log(event);
    }
    // Calendario
    dayClicked(day: CalendarMonthViewDay) {
        let elemets = document.querySelectorAll('mwl-calendar-month-cell');

        this.isFilterTitle = false;
        this.isDateNow = true;

        if (this.selectedMonthViewDay) {
            delete this.selectedMonthViewDay.cssClass;
        }

        for (let i = 0; i < elemets.length; i++) {
            elemets[i].classList.remove(GREEN_CELL);
        }

        if (!day.isFuture) {
            day.cssClass = 'cal-day-selected';
            this.selectedMonthViewDay = day;
            this.selectDate = day.date;
        }
        this.validateUseBank(this.selectDate);
        this.refreshData();
        this.getDataCaja();
        this.dataSource = new MatTableDataSource<any>([]);
    }

    validateUseBank(date: Date) {
        let d = new Date();
        let now = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        let select = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (now != select) {
            this.isDateNow = false;
        };
    };

    filterDate() {
        let form = this.newDateForm.value;
        this.newfilterDate = form;
        this.dateFilterArray = this.setDates(form.startDate._d, form.stopDate._d);
        this.refreshView();
        this.isFilterMode = false;
        this.isFilterTitle = true;

        this.selectDate = form.startDate._d;
        this.selectEndDate = form.stopDate._d;
        this.refreshData();
        this.getDataCaja();
    }

    toggleFilter() {
        this.isFilterMode = !this.isFilterMode;
    }

    setFocusInput() {
        setTimeout(() => {
            this.focusStart.nativeElement.focus();
            this.focusStop.nativeElement.focus();
        }, 100);
    }

    ngOnInit() {
        this.token = sessionStorage.getItem('token');
        this.refreshData();
        this.getDataCaja();
        this.getChartDataCaja();
        this.newDateForm = this._builderForm();
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    closeSidenav() {
        this.tsrsidenav.close();
        // this.hideHeader = false;
        // document.querySelectorAll('.mat-drawer-content')[0].classList.remove('cs-overflow');
        // document.querySelectorAll('header-component')[0].classList.remove('display-none');
    }
    toggleMoreFabs() {
        this.isOpenFab = !this.isOpenFab;
    }

    openSidenav() {
        this.tsrsidenav.toggle();
    }

    openIncidenModal(events) {
        let dialogRef = this.dialog.open(CsIncidentCalendarModalComponent, {
            width: '480px',
            data: { events: this.events }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                console.log(result);
            });
    }

    refreshData() {
        this.criteria_data = {
            token: this.token,
            date_ini: this.selectDate,
            date_fin: this.selectEndDate
        };
    }

    generarExcel() {
        this._tsrBankSrv.getDataExcel(this.criteria_data).subscribe(
            result => {
                saveAs(result, 'reporte.xlsx');
            },
            error => {
                console.log(error);
            }
        )
        // getDataExcel
    }

    generarPdf() {
        this._tsrBankSrv.getDataPdf(this.criteria_data).subscribe(
            result => {
                saveAs(result, 'reporte.pdf');
            },
            error => {
                console.log(error);
            }
        )
    }

    showData(accion, position) {
        if (accion != 'INGRESOS' && accion != 'EGRESOS') {
            return;
        }
        if (this.action_selected) {
            this.detail_data_bank[this.action_selected].active = false;
        }
        this.action_selected = position;
        accion = accion == 'INGRESOS' ? 'INGRESO' : 'EGRESO';
        this.dataSource = new MatTableDataSource<any>(this.movements[accion]);
        this.detail_data_bank[this.action_selected].active = true;
        this.dataSource.paginator = this.paginator;
    }

    getDataCaja() {
        this._tsrBankSrv.getDataCaja(this.criteria_data)
            .subscribe(result => {
                let secretary;
                this.detail_data_bank = result.__json_caja;
                this.openCash = result.__json_caja[0]['estado_caja'] === 'APERTURADA' ? (this.isDateNow ? true : false) : false;
                this.estado_caja = result.__json_caja[0]['estado_caja'];
                secretary = result.__json_secretaria;
                this.shared_info = result.__json_info;
                this.name_scr = secretary.nombre_abvr;
                this.photo_per = secretary.foto_usuario;
                this.movements = result.__json_movimientos;
                this.serial =  result.__json_graphics;
            },
                error => {
                })
    }
    // {
    //     'name': 'Ingresos',
    //     'data': expenses
    // }
    getChartDataCaja() {
        let obj = {
            token: this.token,
            date_ini: this.selectDate
        };
        this._tsrBankSrv.getChartDataCaja(obj)
            .subscribe(result => {
                this.chartSeries = result;
                var serial: any;
                var income: any[] = [];
                var expenses: any[] = [];
                var dia: any[] = [];
                for (let index = 0; index < result.length; index++) {
                    income.push(result[index]['egresos']);
                    expenses.push(result[index]['ingresos']);
                    dia.push(result[index]['dia']);
                }
                serial = [
                    {
                        'name': 'Egresos',
                        'data': income
                    },
                    {
                        'name': 'Ingresos',
                        'data': expenses
                    }
                ];
            }, error => {
                console.log(error);
            });
    }

    openDialogBank(openCash, estado_caja) {
        let flg = openCash ? 2 : 1;
        let dialogRef = this.dialog.open(CsOpenCashModalComponent, {
            width: "680px",
            data: {
                flg: flg,
                std: estado_caja
            }
        });

        dialogRef.componentInstance.actionCaja.subscribe(result => {
            var obj = {
                token: this.token,
                flg: result
            };
            this._tsrMovementsSrv.actionCaja(obj).subscribe(
                result => {
                    this.openCash = result.estado === 'APERTURADA' ? true : false;
                    this.estado_caja = result.estado;
                    this._snackBar.open(result.msj, 'cerrar', {
                        duration: 2000,
                    });
                    dialogRef.close();
                },
                error => {
                    error = JSON.parse(error._body);
                    this._snackBar.open(error.msj, 'cerrar', {
                        duration: 2000,
                    });
                }
            )
        });
    }

    // Modal para compartir caja con otro usuario
    openShareCash() {
        let dialogRef = this.dialog.open(CsShareCashModalComponent, {
            width: '320px',
            panelClass: 'cs-share-cash-modal',
            data: { caja_share: this.caja_share }
        });
        dialogRef.componentInstance.shareCash.subscribe(
            result => {
                this.shared_info = result;
            }
        )
    }

    openFullScreen() {
        let dialogRef = this.dialog.open(CsChartBankZoomComponent, {
            height: '100vh',
            width: '100vw',
            panelClass: 'cs-zoom-modal',
            data: {
                detail_data_bank: this.detail_data_bank,
                name_scr: this.name_scr,
                shared_info: this.shared_info,
                newfilterDate: this.newfilterDate,
                isFilterTitle: this.isFilterTitle,
                selectDate: this.selectDate
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                console.log(result);
            });
    }

    openIncidents() {
        let dialogRef = this.dialog.open(CsIncidentsModalComponent, {
            width: '640px',
            panelClass: 'cs-incidents-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            //
        });
    }

    openRefundHistorical() {
        let dialogRef = this.dialog.open(CsRefundHistoricalModalComponent, {
            width: '975px',
            panelClass: 'cs-refund-historical-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            //
        });
    }

    // Quitar al usuario compartido
    removeShareCash(flg) {
        var obj = {
            token: this.token,
            id_share: this.shared_info.user,
            flg: flg
        };
        this._tsrBankSrv.saveCajaUser(obj).subscribe(
            result => {
                this.shared_info = null;
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        )
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this.mobileQuerySide = this._media.matchMedia('(max-width: 1279px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
        this.mobileQuerySide.addListener(this._mobileQueryListener);
    }

    backPage() {
        this._location.back();
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.mobileQuerySide.removeListener(this._mobileQueryListener);
    }

    setDates(startDate, stopDate) {
        let dateArray = new Array();
        let currentDate = startDate;

        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    refreshView(): void {
        this.cssClass = GREEN_CELL;
        this.refresh.next();
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        this.dateFilterArray.forEach(filterDay => {
            body.forEach(day => {
                let dayTmp = `${day.date.getFullYear()}-${day.date.getMonth() + 1}-${day.date.getDate()}`
                let filterDayTmp = `${filterDay.getFullYear()}-${filterDay.getMonth() + 1}-${filterDay.getDate()}`

                if (dayTmp == filterDayTmp) {
                    day.cssClass = this.cssClass;
                }
            })
        });
    }

    addDays(date: Date, days): Date {
        date.setDate(date.getDate() + parseInt(days));
        return date;
    }

    private _builderForm() {
        let form = this._formBuilder.group({
            startDate: ['', Validators.required],
            stopDate: ['', Validators.required],
        });

        return form;
    }
}
