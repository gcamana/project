import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-refund-historical-modal',
    templateUrl: 'cs-refund-historical-modal.component.html',
    styleUrls: ['cs-refund-historical-modal.component.scss']
})

export class CsRefundHistoricalModalComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['description', 'assigned_to', 'register_to', 'date', 'amount_pres', 'amount_dev'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    constructor(
        public dialogRef: MatDialogRef<CsRefundHistoricalModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface Element {
    description: string;
    assigned_to:string;
    register_to:string;
    date: string;
    amount_pres: string;
    amount_dev: string;
}

const ELEMENT_DATA: Element[] = [
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
    { description: 'Es por pago de certificados de estudios …', assigned_to:'', register_to:'', date: '01 de Enero de 2017', amount_pres: '1000.00', amount_dev: '1000.00' },
];