import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CsIncidentsModalComponent } from '../cs-incidents-modal/cs-incidents-modal.component';

@Component({
    selector: 'cs-incident-calendar-modal',
    templateUrl: 'cs-incident-calendar-modal.component.html',
    styleUrls: ['cs-incident-calendar-modal.component.scss']
})
export class CsIncidentCalendarModalComponent {
    constructor(
        public dialogRef: MatDialogRef<CsIncidentCalendarModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
    ) {
        console.log(this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openListIncidents() {
        let dialogRef = this.dialog.open(CsIncidentsModalComponent, {
            width: '640px',
            panelClass: 'cs-incidents-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            //
        });
    }
}
