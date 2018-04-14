import { CsGaugeModalComponent } from './../cs-gauge-modal/cs-gauge-modal.component';
import { Component, OnInit, Input, EventEmitter, Output, ContentChildren, QueryList, HostListener, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { SharedConstants } from '../../../../shared/shared.constants';
import { CsAccordionModalComponent } from './../cs-accordion-modal/cs-accordion-modal.component';
import { CsPesoModalComponent } from './../cs-peso-modal/cs-peso-modal.component';
@Component({
    selector: 'cs-accordion',
    templateUrl: './cs-accordion.component.html',
    styleUrls: ['cs-accordion.component.scss']
})

export class CsAccordion {
    @Input() title: string;
    @Input('data') est: any;
    @Input() index: number;

    @Input() active: boolean = false;
    @Input() isPinup: boolean = false;

    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();
    @Output() togglePinup: EventEmitter<boolean> = new EventEmitter();

    @Input() zona_riesgo;
    @Input() valor_amarillo;
    @Input() bsc;
    @Input() persp;
    @Input() peso;

    @Output() changeValues  = new EventEmitter();
    @Output() savePesoPersp = new EventEmitter();
    isFinish: boolean = false;

    constructor(
        private _dialog: MatDialog,
    ) { }

    onClick(event) {
        this.toggleAccordion.emit(this.active);
        this.isFinish = this.active;

        if (this.isFinish) {
            setTimeout(() => {
                this.isFinish = false;
            }, 1100);
        }
    }

    onClickPinup(event) {
        this.togglePinup.emit(this.isPinup);
        this.isFinish = false;
    }

    editGaugeValue() {
        let modal = this._dialog.open(CsGaugeModalComponent, {
            width: '250px',
            data: { zona_riesgo: this.zona_riesgo, valor_amarillo : this.valor_amarillo, meta_visible : false, view : 'perspectiva'}
        });
        modal.componentInstance.valuesDash.subscribe(result => {
            this.zona_riesgo    = parseInt(result.zona_riesgo);
            this.valor_amarillo = parseInt(result.valor_amarillo);
            let datos = {zona_riesgo    : this.zona_riesgo,
                         valor_amarillo : this.valor_amarillo,
                         bsc            : this.bsc,
                         persp          : this.persp,
                         index          : this.index,
                         peso           : this.peso
            };
            this.changeValues.emit(datos);
            modal.close();
        });
    }

    openFullscreen() {
        let data = {
            structure: this.est,
            index: this.index
        }

        let modal = this._dialog.open(CsAccordionModalComponent, {
            data: data,
            panelClass: 'cs-zoom-modal',
            height:'100vh',
            width:'100vw'
        });

        modal.afterClosed()
            .subscribe(result => {
            });
    }

    editPesoPersp(){
        let modal = this._dialog.open(CsPesoModalComponent, {
            width: '250px',
            data: { peso : this.est.peso}
        });
        modal.componentInstance.onSetPeso.subscribe(
            result => {
                result.bsc            = this.bsc;
                result.persp          = this.persp;
                result.zona_riesgo    = this.zona_riesgo;
                result.valor_amarillo = this.valor_amarillo;
                this.savePesoPersp.emit(result);
                modal.close();
            }
        )
    }
}

@Component({
    selector: 'cs-accordion-group',
    template: `<ng-content></ng-content>`
})

export class CsAccordionGroupComponent {
    @ContentChildren(CsAccordion) accordions: QueryList<CsAccordion>;
    private subscriptions = [];

    private _accordions: any = [];

    PIN_UP: string = SharedConstants.ICONS.PIN_UP

    constructor(
        private _iconRegistry: MatIconRegistry,
        private _sanitizer: DomSanitizer
    ) {
        this.setIcon();
    }
    setIcon() {
        this._iconRegistry.addSvgIcon(
            'pin-up', this._sanitizer.bypassSecurityTrustResourceUrl(this.PIN_UP),
        );
    }

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

            let subscriptionPin = a.togglePinup.subscribe(e => {
                this.tooglePinup(a);
            });

            this.subscriptions.push(subscription);

            if (subscriptionPin) this.subscriptions.push(subscriptionPin);
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

    tooglePinup(accordion) {
        accordion.isPinup = !accordion.isPinup;
        accordion.active = true;
    }

    ngOnDestroy() {
        this.removeSubscriptions();
    }
}