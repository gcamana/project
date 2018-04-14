import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cs-schedule-modal',
    templateUrl: 'cs-schedule-modal.component.html',
    styleUrls: ['cs-schedule-modal.component.scss']
})
export class CsScheduleModalComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['select', 'description', 'date_start', 'date_finished', 'data_prorroteo', 'total'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    selection = new SelectionModel<Element>(true, []);
    year: FormControl = new FormControl();

    filteredYears: Observable<string[]>;

    years = ['2016', '2017', '2018'];

    constructor(
        public dialogRef: MatDialogRef<CsScheduleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.filteredYears = this.year.valueChanges
            .pipe(
                startWith(''),
                map(val => this.filter(val))
            );
    }

    filter(val: string): string[] {
        return this.years.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    /** Whether the number of selected elements matches the total number of rows. */
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
}
export interface Element {
    date_start: string;
    description: string;
    date_finished: string;
    data_prorroteo: string;
    total: string;
}

const ELEMENT_DATA: Element[] = [
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
    { description: 'Pensión de Mayo', date_start: '01/01/2018', date_finished: '01/01/2018', data_prorroteo: '01/01/2018', total: "1000.00" },
];