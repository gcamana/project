import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ContentChildren, QueryList, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
    selector: 'cs-setting-table',
    templateUrl: './cs-setting-table.component.html',
    styleUrls: ['cs-setting-table.component.scss'],
    animations: [
        trigger('slideInOut', [
          state('in', style({
            overflow: 'hidden',
            height: '*',
            opacity:'1'
          })),
          state('out', style({
            opacity: '0',
            overflow: 'hidden',
            height: '0px',
          })),
          transition('in => out', animate('400ms ease-in-out')),
          transition('out => in', animate('400ms ease-in-out'))
        ])
      ]
})

export class CsSettingTableComponent {
    @Input() active: boolean = false;
    @Input() title: string;

    @Input() isToggle: boolean = false;
    @Input() isInfo: boolean = false;
    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAction: EventEmitter<boolean> = new EventEmitter();
    helpMenuOpen;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog
    ) {

    }
    ngAfterViewInit() {
        this._changeDetectorRef.detectChanges();
    }
    onChange(event) {
        this.toggleAction.emit(event);
    }
    ngOnInit() {
        this.helpMenuOpen = 'out';
    }
    onClick(event) {
        this.toggleAccordion.emit(this.active);
    }
}

// -----------------------------------------------

@Component({
    selector: 'cs-setting-table-group',
    template: `<ng-content></ng-content>`
})

export class CsSettingTableGroupComponent {
    @ContentChildren(CsSettingTableComponent) accordions: QueryList<CsSettingTableComponent>;

    private subscriptions = [];

    private _accordions: any = [];


    constructor(    ) {
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