
import { Component, Input, EventEmitter, Output, Inject, Renderer } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-chart-zoom-modal',
    templateUrl: './cs-chart-zoom-modal.component.html',
    styleUrls: ['cs-chart-zoom-modal.component.scss']
})

export class CsChartZoomModalComponent {

    isHiddenChart: boolean = false;
    EMPTY_CHART = SharedConstants.EMPTY_PATHS.CHART
    constructor(
        public dialogRef: MatDialogRef<CsChartZoomModalComponent>,
        private _renderer: Renderer,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
        this.data = this.data || [];
        if(this.data.length == 0) {
            this.isHiddenChart = true;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngAfterViewInit() {
        let element = document.querySelector('.cs-zoom-modal .mat-dialog-content');
        this._renderer.listen(element, 'scroll', (event) => {
            this.setShadow(event);
        });
    }

    setShadow(event) {
        let element = document.querySelector('.cs-zoom-modal .mat-toolbar-row');

        if (event.target.scrollTop == 0) {
            element.classList.remove('sombra');
        } else {
            element.classList.add('sombra');
        }
    }
}