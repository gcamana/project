import { Component, OnInit, Input, EventEmitter, Output, ContentChildren, QueryList, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'cs-historical',
    templateUrl: './cs-historical.component.html',
    styleUrls: ['cs-historical.component.scss']
})

export class CsHistorical {
    @Input() title: string;

    @Input() active: boolean = true;
    @ViewChild('searchResp') searchResp : ElementRef;

    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();
    isSearch :boolean = false;

    constructor() { }

    onClick(event) {
        event.preventDefault();
        this.toggleAccordion.emit(this.active);
    }

    toggleSearch() {
        this.isSearch = !this.isSearch;
        this.setFocusInput();
    }

    setFocusInput() {
        setTimeout(() => {
            if (this.searchResp !== undefined) {
                this.searchResp.nativeElement.focus();
            }
        }, 100);
    }


}

@Component({
    selector: 'cs-historical-group',
    template: `<ng-content></ng-content>`
})

export class CsHistoricalGroupComponent {
    @ContentChildren(CsHistorical) accordions: QueryList<CsHistorical>;
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