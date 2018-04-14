
import { Component, Input, EventEmitter, Output, ChangeDetectorRef, Inject } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-peso-modal',
    templateUrl: './cs-peso-modal.component.html',
    styleUrls: ['cs-peso-modal.component.scss']
})

export class CsPesoModalComponent {
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    isSearch :boolean = false;

    @Output() onSetPeso = new EventEmitter();

    //TODO: quitar dataFake
    cambiar_por_data_dinamica: string = SharedConstants.PATHS.CARLOS;

    isShowProgress : boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CsPesoModalComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
    }

    ngOnChange(){

    }

    ngAfterViewInit() {

    }

    onNoClick(): void {
        this.dialogRef.close();
        this.isShowProgress = false;
    }

    setPeso(){
        this.onSetPeso.emit({peso : this.data.peso});
        this.isShowProgress = true;
    }
}