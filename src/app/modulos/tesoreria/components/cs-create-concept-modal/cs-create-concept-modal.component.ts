import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TsrMovementsService } from '../../pages/tsr-movements/tsr-movements.service';


@Component({
    selector: 'cs-create-concept-modal',
    templateUrl: 'cs-create-concept-modal.component.html',
    styleUrls: ['cs-create-concept-modal.component.scss'],
    providers : [TsrMovementsService]
})
export class CsCreateConceptModalComponent implements OnInit {
    public refreshConcepts = new EventEmitter;
    token = sessionStorage.getItem('token');
    @ViewChild(MatPaginator) paginator: MatPaginator;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['description', 'type', 'date', 'amount_ref', 'state'];
    conceptos = new MatTableDataSource<Element>();
    list_type_move = [];
    conceptForm: FormGroup;
    isAddConcept: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<CsCreateConceptModalComponent>,
        private _formBuilder: FormBuilder,
        private _tsrMovementsService: TsrMovementsService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.conceptos = new MatTableDataSource<Element>(data.result.concepts);
        console.log(this.conceptos);
        this.list_type_move = data.result.type_move;
    }

    ngAfterViewInit() {
        this.conceptos.paginator = this.paginator;
    }

    ngOnInit() {
        this.conceptForm = this._buildForm()
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    toogleConcept() {
        this.isAddConcept = !this.isAddConcept;
    }
    createConcept() {
        let obj = this.conceptForm.value;
        obj.token = this.token;
        this._tsrMovementsService.insertConcept(obj).subscribe(
            result => {
                this.conceptos.filteredData.splice(0, 0, result.new_concept);
                this.conceptos = new MatTableDataSource<Element>(this.conceptos["filteredData"]);
                this.conceptos.paginator = this.paginator;
                this.refreshConcepts.emit({element : result.elem_list_concp, type_move : result.tipo_movimiento});
                this.toogleConcept();
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

    private _buildForm() {
        let form = this._formBuilder.group({
            description: ['', Validators.required],
            typeMovement: ['', Validators.required],
            amount: ['', Validators.required]
        });

        return form;
    }
}
export interface Element {
    type: string;
    description: string;
    date: string;
    amount_ref: string;
    state: boolean;
}