
import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cs-export-modal',
    templateUrl: 'cs-export-modal.component.html',
    styleUrls: ['cs-export-modal.component.scss']
})

export class CsExportModalComponent {
    @Output() exportTxt = new EventEmitter();
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['business', 'year', 'select'];
    dataSource :any;
    selection = new SelectionModel<Element>(true, []);
    newAddForm: FormGroup;
    isAddField: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<CsExportModalComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.newAddForm = this._buildForm();
        this.dataSource = new MatTableDataSource<any>(this.data.company);
        console.log(data);
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
    openFile() {
        this.isAddField = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    toggle() {
        this.isAddField = !this.isAddField;
    }

    private _buildForm() {
        let form = this._formBuilder.group({
            ruc: ['', Validators.required],
            ruc1: ['', Validators.required],
            ruc2: ['', Validators.required],
            ruc3: ['', Validators.required],
            ruc4: ['', Validators.required]
        });

        return form
    }

    exportTxtByBank() {
        var bank = this.data.bank;
        // let data_req = {
        //     bank : 3,
        //     business : [
        //         {company : 1, filename: 'BCP-GALOIS-20180407.txt'},
        //         {company : 2, filename: 'BCP-PRIVADOS-20180407.txt'}
        //     ],
        //     year :2018
        // };
        // let data_req = {
        //     bank : 4,
        //     business : [
        //         {company : 1, filename: 'SCKGALO.txt'}, 
        //         {company : 2, filename: 'SCKPRIV.txt'}
        //     ],
        //     year :2018
        // };
        // let data_req = {
        //     bank : 1,        //     business : [
        //         {company : 1, filename: 'BANBIF-GALOIS-20180410.txt',   year: 2018}, 
        //         {company : 2, filename: 'BANBIF-PRIVADOS-20180410.txt', year : 2017}
        //     ]
        // };
        // let data_req = {
        //     bank : 2,
        //     business : [
        //         {company : 1, filename: 'COMERCIO-GALOIS-20180411-000.txt',   year: 2018}, 
        //         {company : 2, filename: 'COMERCIO-PRIVADOS-20180411-000.txt', year : 2018}
        //     ]
        // };
        // let data_req = {
        //     bank : 5,
        //     business : [
        //         {company : 1, filename: 'COMERCIO-GALOIS-20180413.txt',   year: 2018}, 
        //         {company : 2, filename: 'COMERCIO-PRIVADOS-20180413.txt', year : 2018}
        //     ]
        // };
         let data_req = {
            bank : bank,
            business : [
                {company : 1, filename: 'prueba-GALOIS-20180413.txt',   year: 2018}, 
                {company : 2, filename: 'prueba-PRIVADOS-20180413.txt', year : 2018}
            ]
        };
        this.exportTxt.emit(data_req);
    }

    selectBussiness(event, index) {
        // console.log(event);
        // console.log(index);
    }
}
