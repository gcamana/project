import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-open-cash-modal',
    templateUrl: 'cs-open-cash-modal.component.html',
    styleUrls: ['cs-open-cash-modal.component.scss']
})
export class CsOpenCashModalComponent {
    @Output() actionCaja = new EventEmitter();
    title   = null;
    content = null;
    flg     = null;
    std     = null;
    isConfirm: boolean;
    constructor(
        public dialogRef: MatDialogRef<CsOpenCashModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.flg = data.flg;
        this.std = data.std;
        if(data.flg == 1 && data.std == null){
            this.title   = '¿Deseas aperturar tu caja?';
            this.content = 'Tu caja será aperturada con el monto con el que fue cerrada por última vez. Sino cerraste tu caja el sistema lo hizo por ti';
        } else if(data.flg == 1 && data.std === 'CERRADA'){ 
            this.title   = '¿Deseas re-aperturar tu caja?';
            this.content = 'Tu caja será aperturada con el monto con el que fue cerrada por última vez.';
        } else {
            this.title   = '¿Deseas cerrar tu caja?';
            this.content = 'Tu caja será cerrada con el monto con el que terminaste';
        }
        this.isConfirm = this.data.isConfirm;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    confirmCash() {
        this.actionCaja.emit(this.flg);
    }
}
