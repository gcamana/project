import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ContentChildren, QueryList, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CsTableDialogComponent } from '../cs-table-dialog/cs-table-dialog.component';

@Component({
    selector: 'cs-table-component',
    templateUrl: './cs-table.component.html',
    styleUrls: ['cs-table.component.scss']
})

export class CsTableComponent {
    @Input() description : any;
    @Input() goal        : any;
    @Input() entityId    : any;
    @Input() levelJson   : any;
    @Input() anterior    : any;
    @Input() flg_var     : any;
    @Input() current     : any;
    @Input() porcentaje  : any;
    @Input() unidad_med  : string = '%';
    @Input() total       : any;
    @Input() variation   : any;
    @Input() flgManual   : any;
    @Input() tipo_calc   : string;
    @Input() isArrow     : boolean = true;
    @Output('onclickSave') onclickSave = new EventEmitter();
    @Input() active: boolean = false;
    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog
    ) {
    }
    ngAfterViewInit() {
        this._changeDetectorRef.detectChanges();
    }

    onClick(event) {
        event.preventDefault();
        this.toggleAccordion.emit(this.active);
    }

    openDialog(id:any, tipo:any): void {
        let dialogRef = this._dialog.open(CsTableDialogComponent, {
            width: '250px',
            data: { name: this.description, goal: this.goal, anterior: this.anterior, current: this.current, total: this.total , tipo: tipo, tipo_calc: this.tipo_calc, unidad_medida: this.unidad_med}
        });
        dialogRef.componentInstance.valuesGeneral.subscribe(result => {
            if(result != undefined){
                this.current  = result.current;
                this.goal     = result.goal;
                this.total    = result.total;
                this.anterior = result.anterior;
                this.editSaveCurrent();
            }
        });
    }

    editSaveCurrent(){
        this.onclickSave.emit({id_indicador : this.entityId,
                               description  : this.description,
                               levelJson    : this.levelJson,
                               goal         : this.goal,
                               total        : this.total,
                               anterior     : this.anterior,
                               current      : this.current
        });
    }
}



























@Component({
    selector: 'cs-table-group',
    template: `<ng-content></ng-content>`
})

export class CsTableGroupComponent {
    @ContentChildren(CsTableComponent) accordions: QueryList<CsTableComponent>;

    private subscriptions = [];

    private _accordions: any = [];

    constructor() { }

    ngAfterContentInit() {
        this._accordions = this.accordions;
        this.removeSubscriptions();
        this.addSubscriptions();

        this.accordions.changes.subscribe(rex => {
            this._accordions = rex;
            this.removeSubscriptions();
            this.addSubscriptions();
        });
    }

    addSubscriptions() {
        this._accordions.forEach(a => {
            let subscription = a.toggleAccordion.subscribe(e => {
                this.toogleAccordion(a);
            });
            this.subscriptions.push(subscription);
        });
    }

    removeSubscriptions() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    toogleAccordion(accordion) {
        if (!accordion.active) {
            this.accordions.forEach(a => a.active = false);
        }
        // set active accordion
        accordion.active = !accordion.active;
    }

    ngOnDestroy() {
        this.removeSubscriptions();
    }
}