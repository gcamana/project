import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from '../../../../shared/shared.constants';
import {MatPaginator, MatTableDataSource, MatDialogRef} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'cs-create-voucher-modal',
    templateUrl: 'cs-create-voucher-modal.component.html',
    styleUrls : [ 'cs-create-voucher-modal.component.scss'
    ]
})

export class CsCreateVoucherModalComponent implements OnInit {

    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    isAddVoucher: boolean = false;
    //table
    displayedColumns = ['select', 'student', 'cuote', 'dateRegister', 'DatePayment', 'correlative', 'state', 'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    selection = new SelectionModel<Element>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private _media: MediaMatcher,
        public dialogRef: MatDialogRef<CsCreateVoucherModalComponent>,
    ) {
       
     }

    ngOnInit() { }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    
      /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    toogleConcept() {
        this.isAddVoucher = !this.isAddVoucher;
    }
    
}
export interface Element {
    student: string;
    cuote: string;
    dateRegister: number;
    DatePayment: string;
    correlative: string;
    state: string;
    action: string;
  }
  
const ELEMENT_DATA: Element[] = [
    {student: 'Carmencita lara', cuote: 'Hydrogen', dateRegister: 1.0079, DatePayment: 'H', correlative:'0001', state:'IMPRESO', action: '' },
    {student: 'Carmencita lara', cuote: 'Hydrogen', dateRegister: 1.0079, DatePayment: 'H', correlative:'0001', state:'IMPRESO', action: '' },
    {student: 'Carmencita lara', cuote: 'Hydrogen', dateRegister: 1.0079, DatePayment: 'H', correlative:'0001', state:'IMPRESO', action: '' },
    {student: 'Carmencita lara', cuote: 'Hydrogen', dateRegister: 1.0079, DatePayment: 'H', correlative:'0001', state:'IMPRESO', action: '' },
    {student: 'Carmencita lara', cuote: 'Hydrogen', dateRegister: 1.0079, DatePayment: 'H', correlative:'0001', state:'IMPRESO', action: '' },
  ];