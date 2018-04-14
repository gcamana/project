import { Component, Input, EventEmitter, Output, ChangeDetectorRef, Inject } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BscDashboardService } from 'app/modulos/balanced-scorecard/pages/bsc-dashboard/bsc-dashboard.service';

@Component({
    selector: 'cs-user-responsable-modal',
    templateUrl: './cs-user-responsable-modal.component.html',
    styleUrls: ['cs-user-responsable-modal.component.scss'],
    providers: [BscDashboardService]
})

export class CsUserResponsableModalComponent {
    private token = sessionStorage.getItem('token');
    private responsables: any[];
    private seleccionados: any[] = [];
    private filtro = null;
    isSearch: boolean = false;
    isShowProgress: boolean = false;

    emptyValue: string = 'find';

    @Output() onSelect = new EventEmitter();
    @Output() refreshResp = new EventEmitter();

    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    SEARCH_1 = SharedConstants.EMPTY_PATHS.SEARCH_1;
    SEARCH_2 = SharedConstants.EMPTY_PATHS.SEARCH_2;

    constructor(
        public dialogRef: MatDialogRef<CsUserResponsableModalComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _bscDashboardService: BscDashboardService,
        private _snackBar: MatSnackBar,
    ) {
        this.responsables = data.responsables;

    }

    ngOnChanges() {

    }

    goToProfile(userId) {
        //TODO: gotoProfile
        // this.onSelect.emit({
        // 	index,
        // 	_id: userId
        // });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    searchResp(event) {
        if (event.keyCode == 13 && this.filtro.length >= 3) {

            let obj = this.data.metadata;
            obj.filtro = this.filtro;
            obj.token = this.token;

            this.isShowProgress = true;

            this._bscDashboardService.getRespInd(obj).subscribe(
                result => {
                    this.seleccionados = [];
                    this.responsables = result.responsables;
                    this.isShowProgress = false;

                    if(this.responsables.length == 0) {
                        this.emptyValue = "nothing";
                        this._changeDetectorRef.detectChanges();
                    }
                },
                error => {
                    
                }
            )
        }

    }

    saveResponsables() {
        var obj = this.data.metadata;
        obj.token = this.token;
        obj.resp = this.seleccionados;
        this._bscDashboardService.saveRespIndi(obj).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });

                this.dialogRef.close();
                this.refreshResp.emit({ resp: result.resp });
            },
            error => {}
        )
    }

    checkResp(event, nid_persona) {
        if (event.checked) {
            this.seleccionados.push(nid_persona);
        } else {
            this.seleccionados.forEach((val, i) => {
                if (val == nid_persona) {
                    this.seleccionados.splice(i, 1);
                }
            });
        }
    }
}