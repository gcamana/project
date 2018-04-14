import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'cs-indicator-information-modal',
    templateUrl: 'cs-indicator-information-modal.component.html',
    styleUrls: ['cs-indicator-information-modal.component.scss']
})

export class CsIndicatorInformationModalComponent {
    isShowProgress : boolean = false;
    responsables   : any[] = [];

    constructor(
        public dialogRef: MatDialogRef<CsIndicatorInformationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {   
        this.responsables = data.responsables;
        console.log(data);
     }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveData() {
        this.isShowProgress = true;
    }
}