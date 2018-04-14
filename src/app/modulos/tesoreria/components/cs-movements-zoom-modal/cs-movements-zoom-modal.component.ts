import { Component, Inject, Renderer, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'cs-movements-zoom-modal',
    templateUrl: 'cs-movements-zoom-modal.component.html',
    styleUrls: ['cs-movements-zoom-modal.component.scss'],
    providers: [
        { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
    ]
})

export class CsMovementsZoomModalComponent {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    EMPTY_TESORERIA: string = SharedConstants.EMPTY_PATHS.EMPTY_TESORERIA;
    isEmptyTable: boolean = false;
    messageUserConnect: string;
    ESTUDIANTE: string = SharedConstants.ROLES.ESTUDIANTE;
    COLABORADOR: string = SharedConstants.ROLES.COLABORADOR;
    PROVEEDOR: string = SharedConstants.ROLES.PROVEEDOR;
    titleTable: string;
    PAGADO: string = SharedConstants.ACCION.PAGADO;
    POR_PAGAR: string = SharedConstants.ACCION.POR_PAGAR;
    VENCIDO: string = SharedConstants.ACCION.VENCIDO;

    displayedColumns = ['select', 'description', 'total', 'paid', 'debt', 'action', 'more'];

    dataMovemets = new MatTableDataSource<Element>();
    selection = new SelectionModel<Element>(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    movementSel = [];
    itemCheckList: any[] = [];

    constructor(
        private _iconRegistry: MatIconRegistry,
        private _sanitizer: DomSanitizer,
        public dialogRef: MatDialogRef<CsMovementsZoomModalComponent>,
        private _renderer: Renderer,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {
        this.data = this.data || [];
        this.movementSel = this.data.movementSel;
        this.itemCheckList = this.data.itemCheckList;
        this.data["filteredData"] = this.data["filteredData"] || [];

        if (this.data.dataMovemets["filteredData"].length > 0) {
            this.isEmptyTable = true;
            this.dataMovemets = this.data.dataMovemets;
            this.itemCheckList.forEach(row => {
                this.selection.select(row)
            });
        } else {
            this.isEmptyTable = false;
        }

        this.titleTable = `${this.data.user_selected.first_name} ${this.data.user_selected.last_name}`;

        this.setIconSvg();
    }

    setIconSvg() {
        this._iconRegistry.addSvgIcon(
            'create_more',
            this._sanitizer.bypassSecurityTrustResourceUrl(SharedConstants.ICONS.CREATE_MORE));
    }

    onNoClick(): void {
        this.dialogRef.close(this.movementSel);
    }

    ngAfterViewInit() {
        let element = document.querySelector('.cs-zoom-modal .mat-dialog-content');
        this._renderer.listen(element, 'scroll', (event) => {
            this.setShadow(event);
        });
    }

    checkedMovement(event, element) {
        // this.selection.isSelected(element)
        console.log(this.selection.selected);
        
        if (event.checked) {
            this.movementSel.push({
                id: element.id_move,
                desc: element.description,
                total: element.debt
            });
        } else {
            for (let i in this.movementSel) {
                if (element.id_move == this.movementSel[i].id) {
                    this.movementSel.splice(parseInt(i), 1);
                }
            }
        }
    }

    setShadow(event) {
        let element = document.querySelector('.cs-zoom-modal .mat-toolbar-fixed');
        event = this.itemCheckList;
        if (event.target.scrollTop == 0) {
            element.classList.remove('sombra');
        } else {
            element.classList.add('sombra');
        }
    }
}