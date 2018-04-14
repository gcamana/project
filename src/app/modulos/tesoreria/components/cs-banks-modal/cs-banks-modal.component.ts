import { Component, OnInit, Input, Output, EventEmitter, Inject, LOCALE_ID, ChangeDetectorRef, ViewChild } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
import { CalendarEvent, CalendarDateFormatter, DAYS_OF_WEEK, CalendarMonthViewDay, CalendarEventTimesChangedEvent } from 'angular-calendar';
import {MatPaginator, MatDialog , MatTableDataSource, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { CsCalendarDateFormatter } from '../../providers/cs-calendar-date-formatter.provider';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MediaMatcher } from '@angular/cdk/layout';
import { TsrBankService } from '../../pages/tsr-bank/tsr-bank.service';
import { TsrMovementsService } from '../../pages/tsr-movements/tsr-movements.service';
const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    }
};
const GREEN_CELL: 'green-cell' = 'green-cell';
@Component({
    selector: 'cs-banks-modal',
    templateUrl: 'cs-banks-modal.component.html',
    styleUrls: ['cs-banks-modal.component.scss', '../../pages/tsr-bank/tsr-bank.component.scss'],
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

export class CsBanksModalComponent {
    
    filtro: boolean;
    token: string;
    newfilterDate: any;
    selectDate: Date;
    isFilterTitle: boolean;
    openIncidenModal(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    refresh: Subject<any> = new Subject();
    newDateForm: FormGroup;
    dateFilterArray: any[] = [];
    cssClass: string = '';
    chartSeries: any;
    openCash: boolean;
    estado_caja: string;
    photo_per: string;
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
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
    ngOnInit() {
        //from
        this.token = sessionStorage.getItem('token');
        let obj = {
            token: this.token,
            date_ini: '02-04-2018',
            date_fin: '02-04-2018'
        };
        this.filtro = false;
        

        this.newDateForm = this._builderForm();
        //from finish
     }
     private _builderForm() {
        let form = this._formBuilder.group({
            startDate: ['', Validators.required],
            stopDate: ['', Validators.required],
        });

        return form;
    }
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
    handleEvent(action: string, event: CalendarEvent): void {
        this.openIncidenModal(event)
        console.log(event);
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
            console.log(day);
        }
    }
    isFilterMode: Boolean;
    toggleFilter() {
        this.isFilterMode = !this.isFilterMode;
    }
    
    //calendar finito
    //table
    displayedColumns = ['description', 'amount', 'date', 'payment_method', 'students', 'record', 'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    //table finish
    constructor(
        public dialogRef: MatDialogRef<CsBanksModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        private _location: Location,
        public dialog: MatDialog,
        public _tsrBankSrv: TsrBankService,
        private _formBuilder: FormBuilder,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

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