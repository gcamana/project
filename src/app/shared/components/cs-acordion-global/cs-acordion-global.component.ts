import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { SharedConstants } from '../../shared.constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'cs-acordion-global',
    templateUrl: './cs-acordion-global.component.html',
    styleUrls: ['cs-acordion-global.component.scss']
})

export class CsAcordionGlobalComponent implements OnInit {
    @Input() title: string;
    @Input('data') est: any;
    @Input() index: number;

    @Input() active: boolean = false;
    @Input() isPinup: boolean = false;

    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();
    @Output() togglePinup: EventEmitter<boolean> = new EventEmitter();

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
    openFullscreen() {
        
    }
    ngOnInit() { }
}

@Component({
    selector: 'cs-acordion-global-group',
    template: `<ng-content></ng-content>`
})
export class CsAcordionGlobalGroupComponent {
    @ContentChildren(CsAcordionGlobalComponent) accordions: QueryList<CsAcordionGlobalComponent>;
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