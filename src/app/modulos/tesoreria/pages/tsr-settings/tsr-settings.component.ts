import { Component, OnInit, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { MatDialog, MatSnackBar } from '@angular/material';
import { TsrSettingsService } from './tsr-settings.service';


@Component({
    selector: 'tsr-settings-component',
    templateUrl: 'tsr-settings.component.html',
    styleUrls: ['tsr-settings.component.scss'],
    providers: [TsrSettingsService]
})

export class tsrSettingsComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    BN: string = SharedConstants.PATHS.TSR.BN;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    panelOpenState: boolean = false;
    activeAlert:boolean = false;
    reciboState: boolean;
    isAccordionActive: boolean = false;
    token: string = sessionStorage.getItem('token');
    isPartialCard: boolean = true; 
    isCheckedPartialCard: boolean = false; 

    constructor(
        private _location: Location,
        public dialog: MatDialog,
        private _media: MediaMatcher,
        public _tsrSettingsSrv: TsrSettingsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _snackBar: MatSnackBar
    ) {
        this.setMediaQuery();
    }
    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }
    ngOnInit() {

    }
    onToggleAction(event) {
        this.activeAlert = event.checked;
    }
    toggleBoleta(event) {
        this.reciboState = event.checked;
        this.openBoleta();
    }

    toggleAccordion(event) {
        this.isAccordionActive = !event
    }

    activatedAlert(event) {
        this.activeAlert = !event.checked;
    }

    openBoleta() {
        this.reciboState = !this.reciboState;
    }
    showInfo(link) {
        console.log(link);
    }

    backPage() {
        this._location.back();
    }

    changeStatePartialPayment(element, type) {
        let obj = {
            token  : this.token,
            checked: element.checked,
            type   : type,
            sede   : 6
        };
        this.isCheckedPartialCard = element.checked;
        this._tsrSettingsSrv.changeStatePartialPayment(obj).subscribe(
            result => {
                this._snackBar.open(result.msj_usr, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }

    changeStateCreditCard(element, type) {
        let obj = {
            token  : this.token,
            checked: element.checked,
            type   : type,
            sede   : 6
        };
        this._tsrSettingsSrv.changeStateCreditCard(obj).subscribe(
            result => {
                if (result.card_active == 0){
                    this.isPartialCard        = true;
                    this.isCheckedPartialCard = false;
                } else {
                    this.isPartialCard = false;
                }
                console.log(this.isCheckedPartialCard);
                this._snackBar.open(result.msj_usr, 'cerrar', {
                    duration: 2000,
                });
            }
        );
    }
}