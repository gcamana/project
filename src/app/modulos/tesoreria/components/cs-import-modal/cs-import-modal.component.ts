import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { TsrMigrationService } from '../../pages/tsr-migration/tsr-migration.service';
import { IUser } from './../../models/user';
import 'rxjs/add/operator/map';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';
@Component({
    selector: 'cs-import-modal',
    templateUrl: 'cs-import-modal.component.html',
    styleUrls: ['cs-import-modal.component.scss'],
    providers: [TsrMigrationService]
})

export class CsImportModalComponent {
    @Output() fileTxtChangeEvent = new EventEmitter();
    UNKNOWN_USER_IMAGE: string   = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns             = ['fee', 'student', 'quantity'];
    dataSource                   = new MatTableDataSource<Element>(ELEMENT_DATA);
    token: string                = sessionStorage.getItem('token');
    isFileSelected: boolean      = false;
    filesToUpload: Array<File>;
    companySelect: any;
    dataFile;
    @ViewChild('fileTxt') fileTxt: ElementRef;
    constructor(
        public dialogRef: MatDialogRef<CsImportModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private renderer: Renderer,
        public _tsrBankSrv: TsrMigrationService,
        private _snackBar: MatSnackBar
    ) {
        console.log(data);
        this.filesToUpload = [];
    }
    openFile(idCompany) {
        this.companySelect = idCompany;
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
        this.fileTxt.nativeElement, 'dispatchEvent', [event]);
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        var reader         = new FileReader();
        var stringFile     = [];
        reader.onload = e => {
            var text  = reader.result;
            var lines = reader.result.split('\n');
            for (var line = 0; line < lines.length; line++) {
                stringFile.push(String(lines[line]));
            }
            var obj = { token: this.token, file: stringFile, empresa: this.companySelect, banco: this.data.bank };
            this._tsrBankSrv.fileTxtChangeEvent(obj).subscribe(
                result => {
                    this.fileTxt.nativeElement.value = "";
                    if (result.count == 0){
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                    } else {
                        this.dataSource     = new MatTableDataSource<Element>(result.table_pago);
                        this.dataFile       = result.data_txt;
                        this.isFileSelected = true;
                    }
                },
                error => {
                    error = JSON.parse(error._body);
                    this._snackBar.open(error.msj, 'cerrar', {
                        duration: 2000,
                    });
                }
            )
        }
        reader.readAsText(this.filesToUpload[0]);
    }

    uploadPayments() {
        var obj = { token: this.token, dataFile: this.dataFile};
        this._tsrBankSrv.uploadPayments(obj).subscribe(
                result => {
                    this._snackBar.open(result.msj_usr, 'cerrar', {
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

    onNoClick(): void {
        this.dialogRef.close();
    }

    toggle() {
        this.isFileSelected = !this.isFileSelected;
    }
}
export interface Element {
    student: any;
    fee: string;
    quantity: string;
}

const ELEMENT_DATA: Element[] = [
    { fee: 'Cuota de Enero', student: 'Giovanni Camana', quantity: '2500'},
    { fee: 'Cuota de Enero', student: 'Giovanni Camana', quantity: '2500'},
    { fee: 'Cuota de Enero', student: 'Giovanni Camana', quantity: '2500'},
    { fee: 'Cuota de Enero', student: 'Giovanni Camana', quantity: '2500'}
];