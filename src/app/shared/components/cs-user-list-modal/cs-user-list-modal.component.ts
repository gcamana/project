
import { Component, Input, EventEmitter, Output, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { BscDashboardService } from 'app/modulos/balanced-scorecard/pages/bsc-dashboard/bsc-dashboard.service';
import { SharedConstants } from '../../shared.constants';

@Component({
    selector: 'cs-user-list-modal',
    templateUrl: './cs-user-list-modal.component.html',
    styleUrls: ['cs-user-list-modal.component.scss'],
    providers: [BscDashboardService]
})

export class CsUserListModalComponent {
    private token = sessionStorage.getItem('token');
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    isSearch :boolean = false;
    title :string = "Responsables";
    @Output() goToStudent = new EventEmitter();
    @Output() onSelect = new EventEmitter();
    @Output() onRemove = new EventEmitter();
    private users = [];
    isShowProgress : boolean = false;
    type:string = null;
    //TODO: quitar dataFake
    cambiar_por_data_dinamica: string = SharedConstants.PATHS.CARLOS;

    constructor(
        public dialogRef: MatDialogRef<CsUserListModalComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _bscDashboardService: BscDashboardService,
        private _snackBar: MatSnackBar
    ) {
        this.users = data.responsables;
        this.title = data.title;
        this.type  = data.type;
        console.log(this.users);
    }

    ngOnChange(){
        this.users = this.data.responsables;
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

    toggleSearch() {
        this.isSearch = !this.isSearch;
    }

    ngAfterViewInit() {

    }

    removeResp(pers, idx){
        this.data.metadata.pers     = pers;
        this.data.metadata.token    = this.token;
        this.data.metadata.idx_resp = idx;
        this._bscDashboardService.removeResp(this.data.metadata).subscribe(
            result => {
                this.onRemove.emit(this.data.metadata);
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
            },
            error => {

            }
        )
    }

    selectUser(user){
        this.goToStudent.emit(user);
    }
}