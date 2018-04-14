import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'cs-create-provider-modal',
    templateUrl: 'cs-create-provider-modal.component.html',
    styleUrls: ['cs-create-provider-modal.component.scss']
})

export class CsCreateProviderModalComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['service', 'responsible', 'business', 'state', 'action'];
    providerSource = new MatTableDataSource<Element>();
    selection = new SelectionModel<Element>(true, []);
    prividerForm: FormGroup;
    isAddConcept: boolean = false;
    type_docs = [];
    constructor(
        public dialogRef: MatDialogRef<CsCreateProviderModalComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.providerSource = new MatTableDataSource<Element>(data.result.providers);
        console.log(data.result.providers);
        this.type_docs      = data.result.type_docs;
    }

    ngOnInit() {
        this.prividerForm = this._buildForm()
    }

    /** Whether the number of selected elements matches the state number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.providerSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.providerSource.data.forEach(row => this.selection.select(row));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    toogleConcept() {
        this.isAddConcept = !this.isAddConcept;
    }
    createConcept() {
        this.toogleConcept();
    }

    private _buildForm() {
        let form = this._formBuilder.group({
            document: ['', Validators.required],
            number: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            name: ['', Validators.required],
            service: ['', Validators.required],
            direction: [''],
            phone:['']
        });

        return form;
    }
}
export interface Element {
    responsible: string;
    service: string;
    business: string;
    action: string;
    state: boolean;
}