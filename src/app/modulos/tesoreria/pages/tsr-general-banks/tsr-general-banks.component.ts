import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, TemplateRef, LOCALE_ID } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { CalendarEvent, CalendarDateFormatter, DAYS_OF_WEEK, CalendarMonthViewDay, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CsCalendarDateFormatter } from '../../providers/cs-calendar-date-formatter.provider'
import { CsOpenCashModalComponent } from '../../components/cs-open-cash-modal/cs-open-cash-modal.component';
import { CsShareCashModalComponent } from '../../components/cs-share-cash-modal/cs-share-cash-modal.component';
import { MatPaginator, MatDialog, MatTableDataSource, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
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
import { SharedConstants } from '../../../../shared/shared.constants';
import { CsChartBankZoomComponent } from '../../components/cs-chart-bank-zoom/cs-chart-bank-zoom.component';
import { CsIncidentCalendarModalComponent } from '../../components/cs-incident-calendar-modal/cs-incident-calendar-modal.component';
import { Subject } from 'rxjs';
import { TsrBankService } from '../tsr-bank/tsr-bank.service';
import { CsIncidentsModalComponent } from '../../components/cs-incidents-modal/cs-incidents-modal.component';
import { TsrMovementsService } from '../tsr-movements/tsr-movements.service';
import { CsBanksModalComponent } from '../../components/cs-banks-modal/cs-banks-modal.component';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    }
};

const GREEN_CELL: 'green-cell' = 'green-cell';

@Component({
    selector: 'tsr-general-banks-component',
    templateUrl: 'tsr-general-banks.component.html',
    styleUrls: ['tsr-general-banks.component.scss'],
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

export class tsrGeneralBanksComponent implements OnInit {
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    //calendar
    events: any[] = [
        {
            id: 1,
            start: subDays(startOfDay(new Date()), 1),
            end: subDays(startOfDay(new Date()), 1),
            price: 'S/. 80.00',
            description: 'Por el Robo del d?a 05-01-2018',
            color: colors.red,
            type: 'perdida',
            // type: 'reposicion'
        }
    ];
    view: string = 'month';
    viewDate: Date = new Date();
    clickedDate: Date;
    activeDayIsOpen: boolean = false;
    locale: string = 'es';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
    selectedMonthViewDay: CalendarMonthViewDay;
    //calendar finish
    token: string = null;
    filtro: Boolean;
    data_bank_general:any = [];
    criteria_data:any;
    //grafico
    move_chart: any;
    isFilterMode: Boolean;
    //grafico finish
    detail_data_bank: any[] = [];
    name_scr: string;
    shared_info: any;
    newfilterDate: any;
    isFilterTitle: boolean;
    selectDate: any;
    selectEndDate:any;
    //form
    refresh: Subject<any> = new Subject();
    newDateForm: FormGroup;
    dateFilterArray: any[] = [];
    cssClass: string = '';
    chartSeries: any;
    openCash: boolean;
    estado_caja: string;
    photo_per: string;
    //table
    displayedColumns = ['description', 'amount', 'date', 'payment_method', 'students', 'record', 'action'];
    dataSource:any = [];
    serial    :any = [];
    action_selected:any = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        private _location: Location,
        public dialog: MatDialog,
        public _tsrBankSrv: TsrBankService,
        private _formBuilder: FormBuilder
    ) {
        console.log(this.viewDate);
        this.setMediaQuery();
        this.move_chart = {
            "movements": [
                {
                    "description": "PENSION JULIO 2017",
                    "total": "510.00", "debt": "527.06", "paid": "0.00", "accion": "VENCIDO", "id_move": "9477fb9bbe0c6dd9b294c2602fa833a72ca46c2ce5f50add8bdc779eb442c8e5a6e33a9fa023dd097ca5d225d410d344PQQWPxbiNuTNl7Xd626d5A==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                },
                {
                    "description": "PENSION AGOSTO 2017",
                    "total": "510.00", "debt": "524.69", "paid": "0.00", "accion": "VENCIDO", "id_move": "681d27b2862cd6f6b56a05dd8bfbf9f3fd83f3e79bcc47fab8baebb6b86b5c0beeff60b6fdf5b56ee5f69c9842bdae15U47fZD9uFwzxIzo+yszeAw==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                }, {
                    "description": "PENSION SETIEMBRE 2017",
                    "total": "510.00", "debt": "522.39", "paid": "0.00", "accion": "VENCIDO", "id_move": "f8af399e487636409e72bb1cde049dfec5e5acfe6d2c5d2bd9c97c188d3a174b3ccae6ab35c133ef0c71d3ad8a18bcd4ISAH16EBhKld7a3VaCR6BQ==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                }, {
                    "description": "PENSION OCTUBRE 2017",
                    "total": "510.00", "debt": "520.02", "paid": "0.00", "accion": "VENCIDO", "id_move": "3277822769796995eb7c58dc1ab1e7410a06b4bf3d254b2ddfcec4acfdabe0397f0746fa9d364f362dee76899c2246885mdrcCbLYkbO4q7q9bCHGQ==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                }, {
                    "description": "PENSION NOVIEMBRE 2017",
                    "total": "510.00", "debt": "517.73", "paid": "0.00", "accion": "VENCIDO", "id_move": "4b683cd55e1fd3c82d63430d474e3a102ad94f140709f681001773304b1859410a3e86ec5ddc53313eec49a891019001vC5EyMWTkvBQhuM4BggG/Q==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                }, {
                    "description": "PENSION DICIEMBRE 2017",
                    "total": "510.00", "debt": "516.27", "paid": "0.00", "accion": "VENCIDO", "id_move": "13627aea3e43409ce6fb0d528fd411fb0ce26377282001fe30dfd223e0909224f26b45413b761c59c3a90a6317c1148cPbWoOEC4Tf2K4H2Ku2vlrw==", "date_pay": "-", "flg_descuento": null, "_id_sede": 6, "flg_block": false
                }],
            "last_move": [
                {
                    "amount": "March",
                    "y": 2, "info": "March S/ 517.19"
                },
                {
                    "amount": "April",
                    "y": 2, "info": "April S/ 514.90"
                },
                {
                    "amount": "May",
                    "y": 2, "info": "May S/ 512.52"
                },
                {
                    "amount": "June",
                    "y": 2, "info": "June S/ 510.23"
                },
                {
                    "amount": "July",
                    "y": 0, "info": "July S/ 527.06"
                },
                {
                    "amount": "August",
                    "y": 0, "info": "August S/ 524.69"
                },
                {
                    "amount": "September",
                    "y": 0, "info": "September S/ 522.39"
                }, {
                    "amount": "October",
                    "y": 0, "info": "October S/ 520.02"
                }, {
                    "amount": "November",
                    "y": 0, "info": "November S/ 517.73"
                }, {
                    "amount": "December",
                    "y": 0, "info": "December S/ 516.27"
                }
            ],
            "categorias": ["Mar.", "Apr.", "May.", "Jun.", "Jul.", "Au.", "Sep.", "Oct.", "Nov.", "Dec."],
            "conceptos": [
                {
                    "id_concepto": "3af2f89e7e1c7b1e421dfe2208ebb263915c66752fe937920bb895ca419cd3271b9c70be47192dabde39c684a18e13e7m+UmergMicv+BlU9GhYj9Q==", "desc_concepto": "ACUENTA MATRICULA BOL"
                },
                {
                    "id_concepto": "9b41a88a7c2c9d6eda48ddd1b0f6454db8aaefef967d70c8231c2a3d87ba67de93d050e1943d3b061e5ed0d98046c42b5uh9oBW34P5KHLhGNlnHfg==", "desc_concepto": "ADELANTO TOTAL"
                },
                {
                    "id_concepto": "53c75f68bc17e8d9e27cba98d4ac04d95d0b56e4edd86b516cd3d43a8692a1d3f54b1993cb0cb55c8eb516a461c279efY6jBqGHXpTxoZJbpSLEksQ==", "desc_concepto": "Aseo Personal"
                },
                {
                    "id_concepto": "e813297a1696fd71214ac2e8090f6dbfe888e623ee3d6ed5953359f5436c313ebc08a7d545707f20d23ff76e57b7501do2KsHlL7kTKmusDaXRrbxg==", "desc_concepto": "BILLY ELLIOT"
                },
                {
                    "id_concepto": "01217a7c4bb9be9d65588efdb356823e09e97b2b7df3b56915fc16231cf6ab4aa86695b2d8b3b7b5324f2b8127a77c5b6AQWm1V5lfhsN+kGjmzx+g==", "desc_concepto": "BLUSA T 14-P. IMPORT"
                },
                {
                    "id_concepto": "7b3aaf8862ecc37bb84d575fc31f18a69757a7f14b3f8629806a60fddd9f4d6d40f9f8643ea0216911b7fd526665e308WEe/E0ApcP8lfOSEZeIIZQ==", "desc_concepto": "BLUSA T S-P. IMPORT"
                },
                {
                    "id_concepto": "e72d10418a29ee9c1500cebc9e82a7e598dd9aad1b5313b8ba80850e54bde6c149946d8dbbfcdc6133811172fa0aafc20l6QcNjL8Z4VuxjCDK/hBg==", "desc_concepto": "BLUSA T 10-P. IMPORT"
                },
                {
                    "id_concepto": "f313d1f998475fff275eac62ac521ef9f4534a1ff33b047cfb0cbf964ae5b69a65c80b355beb3c24dce9e36d2b3ffa74pzXuIW/Io5Yga9VGnzAuwQ==", "desc_concepto": "BLUSA T 16-P. IMPORT"
                },
                {
                    "id_concepto": "1f58cedf2cb6948960da36a114f92794c2df0570643a3f1f64f4e4c5130ee0a3cd2d3224081081b67837b4592892bbf3aDkFXeRMbnMkK03jofgVKA==", "desc_concepto": "BLUSA T M-P. IMPORT"
                },
                {
                    "id_concepto": "773991b6347d58db97cb6d6bd99d6b9f01c34d46c91c20e01eb713b63ba69f19d4bedf7c5fe39a31a05c6d9d2b06e119u68a+nm1NPTqTL3PYr+Saw==", "desc_concepto": "BONNIE AND CLYDE 2º SEC"
                },
                {
                    "id_concepto": "50015a8014433001f94926602e03b15c1bfd974b2cf3c54d9e9245c6c72dd2fa625126f6a5b12397ab50d09d9346be9dJhk/vwwVeiaCkjNytTu0fw==", "desc_concepto": "BUZO T 10"
                },
                {
                    "id_concepto": "2952286526116ca22c9793afa4fd5aa078438d2dd115cc526c316f6544b97e5cbdc1994399d1ab6a43f906bc18ac4214TEIprD10c+4ixBJB6qgiIg==", "desc_concepto": "BUZO T 16"
                },
                {
                    "id_concepto": "9888ae05252bb96cfbeb14e4263136a07cda82ff65bca5a0f21f1f293a4799f2546656d0df033e8f80465ee42ab139ab8C9c9aUUsQTZJLvRIt+aoA==", "desc_concepto": "BUZO T L"
                },
                {
                    "id_concepto": "5f3a78b4bd12b41b360437bb377ead6a0bd966c8f682820c1d11a6246d7243cb77cffd55555c2ee581180fc0c44bb381PpON+y/TnnFiah35QB9a4A==", "desc_concepto": "BUZO T M"
                },
                {
                    "id_concepto": "b2e4b9b3620b2267e7332ceaad55d31e5611848a41d8829f8a280311a61569d65538360090ad183a1114f4c386471475+E9W9UCsZQajdr7yJyrhbA==", "desc_concepto": "BUZO T S"
                },
                {
                    "id_concepto": "cb4d6a231274186a8bfcb4b120fda7be459e60018c7f25a8398db4bc12d5d471134c9417d6d628ebccfbdeced6739176r40NwzlhmbKJJ7kIOHrEmQ==", "desc_concepto": "CAMISA T 16-P.IMPORT"
                },
                {
                    "id_concepto": "05c4672a1d70f842f8d25a967ad2241c274644d6c9c6b2eab0054ad276299b97ce94986e25cd38d760fae3a6b04c5410dLqDO2t7g+HsM3O3JN3vpQ==", "desc_concepto": "CAMISA T L-P.IMPORT"
                },
                {
                    "id_concepto": "ea5da14e928bbd3c3d4d4f4315ce3925354deb82fd6a160bdb901037baa6cce1a96365fb0b3ebd757fcaac23d153f3a2TVpTUOFIQb8PJni2mmrIsA==", "desc_concepto": "CAMISA T M-P.IMPORT"
                },
                {
                    "id_concepto": "61fd955f22abd520bd8213e801b53c5d4d0320af739fcae2924d25cc63c4f747ff217c3914e0d1406d601d3347ee4d55tgF9zTU0SLHfMiGzn72pSw==", "desc_concepto": "CASACA DE VESTIR T 14"
                },
                {
                    "id_concepto": "79a8c2964e2ba7a5dce2d810f44905c676dd582296f3c41b27c8c52be070153b749e966b2862c413a23311a8824891f6D8BT1rJC+NjsBUEjIVs2Kw==", "desc_concepto": "CASACA DE VESTIR T16"
                },
                {
                    "id_concepto": "2f19393d20e39d53202d76c074eea2ea37bf270c7a5820a4800c08e37ea5d32a4f6ff44dba0f6d67dc9089ea2e6327bfdmqWpsfbBOZNizhm4DOycg==", "desc_concepto": "CERTIFICADO DE ESTUDIOS INICIAL"
                },
                {
                    "id_concepto": "8fdd11880acb62f58c8d837e9f28ddc6578556daf437d170029a90f042880b075f16ffefd0ee7f604d39b071628ce9ecUShIf2htGdmuIdv8kPvgIA==", "desc_concepto": "CHOMPA T 10"
                },
                {
                    "id_concepto": "447959a83d6dc40925fe27b2d8893af99d3b089e34d315ee57cf9d539796b7f2e04d33ebba9e551ef645ffdd7c6e2278doUyogIK6KhS9bFVbfngmQ==", "desc_concepto": "CHOMPA T 14"
                },
                {
                    "id_concepto": "abe91e50ad2e14aafc7b90b9a1a10b98fcb1788e0b5861b9fc7e5c77966d36b333e5062d84925e786900432ca1c054e590hznSBs0WIZ4YxKsUWVPA==", "desc_concepto": "CHOMPA T 16"
                },
                {
                    "id_concepto": "189cf8f736f4cb6c9c82b6143898db950545f62c064f37bc1f660c706b5ace1953269d264e76650188e209e7db7cce91mHExo/03G0FUUD3ZPQlfpg==", "desc_concepto": "CHOMPA T M"
                },
                {
                    "id_concepto": "1676c99fe8e727a40729dea6315d9a2bc333bf632bc5871ce3521cc670c9e97bcc001728a12956a1188152dff0143ae2tsr7LBwe5L4TtQwn9meACA==", "desc_concepto": "CHOMPA T XL"
                },
                {
                    "id_concepto": "9fb0fb9ea30b06088344cdcb3831703513c78a7373e9c7be0feed60d61038008487c946f56146f822a6c5339c677e7cfWgAZUWOm6BIV32hXuyfPYg==", "desc_concepto": "COLECTS"
                }]
        }
    }

    ngOnInit() {
        //from
        this.token = sessionStorage.getItem('token');
        this.token = sessionStorage.getItem('token');
        this.refreshData();
        this.getDataCajaGeneral();
        this.newDateForm = this._builderForm();
        //from finish
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    backPage() {
        this._location.back();
    }
    titleSedes = 'Avandgart';

    //Calendar
    handleEvent(action: string, event: CalendarEvent): void {
        this.openIncidenModal(event)
    }

    dayClicked(day: CalendarMonthViewDay) {
        let elemets = document.querySelectorAll('mwl-calendar-month-cell');
        this.isFilterTitle = false;

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
            this.getDataCajaGeneral();
            this.refreshData();
        }
    }

    refreshData() {
        this.criteria_data = {
            token   : this.token,
            date_ini: this.selectDate,
            date_fin: this.selectEndDate
        };
    }
    //the end calendar

    //grafico
    toggleFilter() {
        this.isFilterMode = !this.isFilterMode;
    }
    //the end grafico

    //table
    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }
    //table finish

    //form
    filterDate() {
        let form = this.newDateForm.value;
        this.newfilterDate = form;
        this.dateFilterArray = this.setDates(form.startDate._d, form.stopDate._d);
        this.refreshView();
        this.isFilterMode = false;
        this.isFilterTitle = true;
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

    getDataCajaGeneral() {
        this._tsrBankSrv.getDataCajaGeneral(this.criteria_data)
            .subscribe(result => {
                this.data_bank_general = result.__json_general;
                // let secretary?s;
                let a = 0;
                for (const general of this.data_bank_general) {
                    this.dataSource[a] = null;
                    a++;
                }
            },
            error => {
                console.log(error);
            })
    }

    showData(accion, caja , position) {
        if (accion != 'INGRESOS' && accion != 'EGRESOS') {
            return;
        }
        if (this.action_selected[caja]) {
            this.data_bank_general[caja].__json_caja[this.action_selected[caja]].active = false;
        }
        this.action_selected[caja] = position;
        accion = accion == 'INGRESOS' ? 'INGRESO' : 'EGRESO';
        if (this.data_bank_general[caja].__json_movimientos) {
            this.dataSource[caja] = new MatTableDataSource<any>(this.data_bank_general[caja].__json_movimientos[accion]);
        }
        this.data_bank_general[caja].__json_caja[this.action_selected[caja]].active = true;
        this.dataSource.paginator = this.paginator;
        // this.dataSource[caja].paginator = this.paginator;
    }

    getChartDataCaja(obj: any) {
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

    //modal events
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

    //modal
    openModalbanks() {
        let dialogRef = this.dialog.open(CsBanksModalComponent, {
            height: '100vh',
            width: '100vw',
            panelClass: 'cs-zoom-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    hideButton(event){
        console.log(event);
        if(event == false){
            document.getElementById('ocultar').style.display = 'block';
        }
        else{
            document.getElementById('ocultar').style.display = 'none';
        }
    }
}

//table
export interface Element {
    amount: string;
    description: string;
    date: string;
    payment_method: string,
    students: string;
    record: string;
    action: string;
}

const ELEMENT_DATA: Element[] = [
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensi?n de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
];
//table finish