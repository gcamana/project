
import { Component, Input, EventEmitter, Output, ChangeDetectorRef, Inject, Renderer } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CsGaugeModalComponent } from '../cs-gauge-modal/cs-gauge-modal.component';

@Component({
    selector: 'cs-accordion-modal',
    templateUrl: './cs-accordion-modal.component.html',
    styleUrls: ['cs-accordion-modal.component.scss']
})

export class CsAccordionModalComponent {

    constructor(
        public dialogRef: MatDialogRef<CsAccordionModalComponent>,
        private _dialog: MatDialog,
        private _renderer: Renderer,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
    }

    ngAfterViewInit() {
        let element= document.querySelector('.cs-zoom-modal .mat-dialog-container');
        this._renderer.listen(element, 'scroll', (event) => {
            this.setShadow(event);
        });
    }
    setShadow(event) {
        let element= document.querySelector('.cs-zoom-modal .mat-toolbar-row');

        if (event.target.scrollTop == 0) {
            element.classList.remove('sombra');
        }else {
            element.classList.add('sombra');
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    editGaugeValue() {
        let modal = this._dialog.open(CsGaugeModalComponent, {
            width: '250px',
            data: { zona_riesgo: this.data.structure.zona_riesgo, valor_meta: this.data.structure.v_amarillo}
        })

        //TODO: Programar
        modal.afterClosed().subscribe(result => {
            //code
        });
    }

    setIndicadores(event) {
        //TODO: programar
        this.data.structure.objetivos[0].indicadores = event.indicadores;
        for (let i = 0; i < this.data.structure.objetivos.length; i++) {
            this.data.structure.objetivos[i].active = event.idx_obj == i ? 'active' : '';
        }

        // this.data[this.data.index].objetivos[0].indicadores = event.indicadores;
    }

}