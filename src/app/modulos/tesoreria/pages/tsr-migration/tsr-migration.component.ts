import { element }                                                                  from 'protractor';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Location }                                                                 from '@angular/common';
import { SharedConstants }                                                          from '../../../../shared/shared.constants';
import { MediaMatcher }                                                             from '@angular/cdk/layout';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar }                 from '@angular/material';
import { TsrMigrationService }                                                      from './tsr-migration.service';
import { CsImportModalComponent }                                                   from '../../components/cs-import-modal/cs-import-modal.component';
import { CsExportModalComponent }                                                   from '../../components/cs-export-modal/cs-export-modal.component';
import { CsSiscontModalComponent }                                                  from '../../components/cs-siscont-modal/cs-siscont-modal.component';
import {saveAs}                                                                     from 'file-saver';
import { CsMigrationCantModalComponent }                                            from '../../components/cs-migration-cant-modal/cs-migration-cant-modal.component';

@Component({
    selector    : 'tsr-migration-component',
    templateUrl : 'tsr-migration.component.html',
    styleUrls   : ['tsr-migration.component.scss'],
    providers   : [TsrMigrationService]
})

export class tsrMigrationComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    BN: string                 = SharedConstants.PATHS.TSR.BN;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    displayedColumns = ['business', 'last_import', 'quantity_import', 'last_export', 'quantity_export'];
    dataSource :any;
    cards: any;
    isSiscont: boolean = true;
    cardTmp: any;
    idBank: string = '0';
    banks: any;
    token: string = sessionStorage.getItem('token');
    isOpenInfo: boolean;
    isOpenToolbar: boolean   = false;
    activeDayIsOpen: boolean = true;

    constructor(
        private _location: Location,
        public  dialog: MatDialog,
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        public _tsrBankSrv: TsrMigrationService,
        private _snackBar: MatSnackBar
    ) {
        this.setMediaQuery();
        let obj = {
            token: this.token
        };
        this.getDataBanco(obj, data => {
            this.cards = data;
        });
    }

    onChangeBank(event) {
        this.cardTmp       = event.value;
        this.isOpenToolbar = true;
        this.idBank        = event.value.id_banco
        this.getDataLastMigracion();
        if (event.value.value == 'siscont') {
            this.isSiscont = false;
            this.displayedColumns = ['business', 'last_export', 'quantity_export'];
        } else {
            this.isSiscont = true;
            this.displayedColumns = ['business', 'last_import', 'quantity_import', 'last_export', 'quantity_export'];
        }
    }

    closeAction() {
        this.isOpenInfo = false;
    }

    openExportToggle(idBank) {
         if (!this.isSiscont) {
             this.openSiscont();
         } else {
             this.openExportModal(idBank);
         }
     }

    getDataBanco(obj, respuesta) {
        this._tsrBankSrv.getDataBank(obj).subscribe(
            result => {
                respuesta(result);
            },
            error => {
                console.log(<any>error);
            }
        )
    }
    
    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {

    }

    toggle() {
        this.isOpenInfo = !this.isOpenInfo;
    }

    backPage() {
        this._location.back();
    }

    getDataLastMigracion(){
        let obj = { token: this.token, banco: this.idBank };
        this._tsrBankSrv.lastInfoMigracion(obj).subscribe(
            result => {
                this.dataSource = new MatTableDataSource<any>(result.last_info);
            },
            error => console.log(<any>error)
        );
    }

    openImporModal(bank) {
        var obj = { banco: bank, token: this.token};
        this._tsrBankSrv.companyByBank(obj).subscribe(
            result => {
                let dialogRef = this.dialog.open(CsImportModalComponent, {
                    width: '640px',
                    data: { card    : this.cardTmp ,
                            bank    : bank,
                            company : result.company}
                })
                dialogRef.afterClosed()
                    .subscribe(result => {
                        console.log(result);
                    });
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }

    openExportModal(bank) {
        var obj = { banco: bank, token: this.token};
        this._tsrBankSrv.companyByBank(obj).subscribe(
            result => {
                this.submitDataExport(bank, result);
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
         );
    }

    submitDataExport(bank, result) {
        let dialogRef = this.dialog.open(CsExportModalComponent, {
                width : '640px',
                data  : { card    : this.cardTmp,
                          bank    : bank,
                          company : result.company}
            });
            dialogRef.componentInstance.exportTxt.subscribe(
                result => {
                     let data_req = result,
                         obj      = {token: this.token};
                     this._tsrBankSrv.downloadFileExportBank(data_req,obj).subscribe(
                        result => {
                             dialogRef.close();
                             saveAs(result,(data_req.business.length > 1 ? 'archivos.zip' : data_req.business[0].filename));
                        },
                        error => console.log(<any>error)
                    );
                }
            );
    }

    openSiscont() {
        let dialogRef;
        let obj = { token: this.token };
        this._tsrBankSrv.yearByDocumentos(obj).subscribe(
            result => {
                dialogRef = this.dialog.open(CsSiscontModalComponent, {
                            width: '320px',
                            data: { card        : this.cardTmp ,
                                    year_opt    : result.year_opt,
                                    combo_siscont: result.combo_siscont}
                });
            },
            error => {
                error = JSON.parse(error._body);
                this._snackBar.open(error.msj, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }
    openModalMigrationCant(element) {
        if (element.quantity_import > 0){
            let obj = { token: this.token, empresa: element.id_empresa, banco: this.idBank };
            this._tsrBankSrv.infoMigratioLast(obj).subscribe(
                result => {
                    let dialogRef = this.dialog.open(CsMigrationCantModalComponent, {
                        width: '640px',
                        data: { data: result.info_data }
                    });
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
}