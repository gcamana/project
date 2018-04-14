import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TsrMigrationService } from '../../pages/tsr-migration/tsr-migration.service';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
    selector: 'cs-siscont-modal',
    templateUrl: 'cs-siscont-modal.component.html',
    styleUrls: ['cs-siscont-modal.component.scss'],
    providers: [TsrMigrationService]
})

export class CsSiscontModalComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    token: string = sessionStorage.getItem('token');
    month_opt = [];
    newExportForm: FormGroup;
    company_opt = [];
    constructor(
        public dialogRef: MatDialogRef<CsSiscontModalComponent>,
        private _formBuilder: FormBuilder,
        public _tsrBankSrv: TsrMigrationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _snackBar: MatSnackBar
    ) {
        this.newExportForm = this._buildForm();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    private _buildForm() {
        let form = this._formBuilder.group({
            type: ['', Validators.required],
            year: ['', Validators.required],
            month: ['', Validators.required],
            change: ['', Validators.required],
            company: ['', Validators.required]
        });

        return form
    }

    getMonthByYear(year_select) {
        var obj = { token: this.token, year_select: year_select};
        this._tsrBankSrv.getMonthByYear(obj).subscribe(
            result => {
                this.month_opt = result.month_opt;
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }

    exportTXT(){
        var obj = { token: this.token, form: this.newExportForm.value };
        this._tsrBankSrv.exportTXTSiscont(obj).subscribe(
            result => {
                saveAs(result, 'archivos.zip');
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }

    getEmpresasByMonth(month_select){
        var obj = { token: this.token, month_select: month_select, year_select: this.newExportForm.controls.year.value };
        this._tsrBankSrv.getEmpresasByMonth(obj).subscribe(
            result => {
                this.company_opt = result.company_opt;
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }
}