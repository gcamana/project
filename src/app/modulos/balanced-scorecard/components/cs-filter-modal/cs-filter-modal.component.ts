import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { IndicadorDetalleService } from '../../pages/bsc-indicator-detail/bsc-indicator-detail.service';

@Component({
    selector: 'cs-filter-modal',
    templateUrl: 'cs-filter-modal.component.html',
    styleUrls: ['cs-filter-modal.component.scss'],
    providers: [IndicadorDetalleService]
})

export class CsFilterModalComponent {
    @Output() setTipoMed = new EventEmitter();
    public year_selected: any;
    public sedes        : any = [];
    public cmb_years    : any;
    public cmb_tfiltro  : any;
    isShowProgress      : boolean = false;
    public cmb_sedes    : any = { list_sedes: []};
    public tip_med_sel  : any;
    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    constructor(
        public dialogRef: MatDialogRef<CsFilterModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _indicadorDetalleService: IndicadorDetalleService,
        private _snackBar               : MatSnackBar
    ) {
        if(data.filtro == 'content'){
            this.cmb_years     = data.dataYears.list_years;
            this.year_selected = data.year;
            if(data.year != null && data.year !== undefined && (data.sede == undefined || data.sede.length == 0)) {
                this.getSedes();
            }
            if(data.sede !== undefined) {
                if(data.sede.length != 0) {
                    this.year_selected = data.year;
                    this.cmb_sedes     = data.arraySedes;
                    this.sedes         = data.sede;
                }
            }
        } else if(data.filtro == 'chart'){
            this.cmb_tfiltro = data.tipo_med.list_combo;
            this.tip_med_sel = data.tipo_med.selected;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
        this.isShowProgress = false;
    }

    getSedes() {
        let datos = {year_selected: this.year_selected, token: this.data.token};
        this._indicadorDetalleService.getSedesFromYear(datos).subscribe(
            result => {
                this.cmb_sedes  = result;
            }, error => {

            }
       );
    }
    
    getAllSedes() {
        let datos = {token: this.data.token};
        this._indicadorDetalleService.getAllSedes(datos).subscribe(
            result => {
                this.cmb_sedes.list_sedes  = result;
            }, error => {

            }
       );
    }

    enviarFiltro() {
        if(this.year_selected == null) {
            this._snackBar.open('Selecciona el año.', 'cerrar', {
                duration: 2000,
              });
            return;
        }
        // if(this.sedes == null || this.sedes === undefined) {
        //     this._snackBar.open('Selecciona al menos una sede.', 'cerrar', {
        //         duration: 2000,
        //       });
        //     return;
        // }
        let dato = {year_selected :this.year_selected, sedes: this.sedes, arraySedes : this.cmb_sedes};
        this.dialogRef.close(dato);

        this.isShowProgress = true;
    }

    guardarTipoMed(){
        this.setTipoMed.emit(this.tip_med_sel);
    }
}