
import { Component, Input, EventEmitter, Output, Inject, Renderer, ViewChild, LOCALE_ID } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

import { SharedConstants } from '../../../../shared/shared.constants';
import { CsOpenCashModalComponent } from '../cs-open-cash-modal/cs-open-cash-modal.component';
import { CsShareCashModalComponent } from '../cs-share-cash-modal/cs-share-cash-modal.component';

@Component({
    selector: 'cs-chart-bank-zoom',
    templateUrl: './cs-chart-bank-zoom.component.html',
    styleUrls: [
        'cs-chart-bank-zoom.component.scss',
        '../../pages/tsr-bank/tsr-bank.component.scss'
    ],
    providers:[
        {
            provide: LOCALE_ID,
            useValue: 'es-ES'
        }
    ]
})

export class CsChartBankZoomComponent {
    EMPTY_CHART = SharedConstants.EMPTY_PATHS.CHART;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    INGRESOS: string = SharedConstants.ACCION.INGRESOS;
    EGRESOS: string = SharedConstants.ACCION.EGRESOS;
    viewDate: Date = new Date();
    displayedColumns = ['description', 'amount', 'date', 'payment_method', 'students', 'record', 'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    openCash: boolean;
    selectDate: any;
    newfilterDate: any;
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
        public dialogRef: MatDialogRef<CsChartBankZoomComponent>,
        private _renderer: Renderer,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
        this.selectDate = this.data.selectDate || this.viewDate;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    ngAfterViewInit() {
        let element = document.querySelector('.cs-zoom-modal .mat-dialog-content');

        this.dataSource.paginator = this.paginator;

        this._renderer.listen(element, 'scroll', (event) => {
            this.setShadow(event);
        });
    }

    setShadow(event) {
        let element = document.querySelector('.cs-zoom-modal .mat-toolbar-row');

        if (event.target.scrollTop == 0) {
            element.classList.remove('sombra');
        } else {
            element.classList.add('sombra');
        }
    }
    openShareCash() {
        let dialogRef = this.dialog.open(CsShareCashModalComponent, {
            width: '320px',
            panelClass: 'cs-share-cash-modal',
            // data: { caja_share: this.caja_share }
            data: {}
        });
        // dialogRef.componentInstance.shareCash.subscribe(
        //     result => {
        //         this.shared_info = result;
        //     }
        // )
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

        // dialogRef.componentInstance.actionCaja.subscribe(result => {
        //     var obj = {
        //         token: this.token,
        //         flg: result
        //     };
        //     this._tsrMovementsSrv.actionCaja(obj).subscribe(
        //         result => {
        //             this.openCash = result.estado === 'APERTURADA' ? true : false;
        //             this.estado_caja = result.estado;
        //             this._snackBar.open(result.msj, 'cerrar', {
        //                 duration: 2000,
        //             });
        //             dialogRef.close();
        //         },
        //         error => {
        //             error = JSON.parse(error._body);
        //             this._snackBar.open(error.msj, 'cerrar', {
        //                 duration: 2000,
        //             });
        //         }
        //     )
        // });
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
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
    { description: "Pensión de marzo", amount: "1000.00", date: "10/12/2018 - 11:00 a.m.", payment_method: "Efectivo", students: "", record: "", action: "" },
];