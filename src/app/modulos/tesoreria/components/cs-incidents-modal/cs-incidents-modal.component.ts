import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-incidents-modal',
    templateUrl: 'cs-incidents-modal.component.html',
    styleUrls: ['cs-incidents-modal.component.scss']
})

export class CsIncidentsModalComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['date', 'amount', 'comment'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

    constructor(
        public dialogRef: MatDialogRef<CsIncidentsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface Element {
    amount: string;
    date: string;
    comment: string;
}


const ELEMENT_DATA: Element[] = [
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
    { date: '01 de Enero de 2017', amount: '1000.00', comment: 'Es por pago de certificados de estudios …' },
];