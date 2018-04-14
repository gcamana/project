import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';

// Servicios
import { TsrReportsService } from './tsr-reports.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'tsr-reports-component',
    templateUrl: 'tsr-reports.component.html',
    styleUrls: ['tsr-reports.component.scss']
})

export class tsrReportsComponent implements OnInit {
    @ViewChild('tsrsidenav') tsrsidenav;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    newSelectForm: FormGroup;
    EMPTY_TESORERIA: string = SharedConstants.EMPTY_PATHS.EMPTY_TESORERIA;
    messageEmpty: string = 'Realiza los pagos de una manera fácil desde una sola pantalla  mantente siempre informado de todos los registros';
    mobileQuerySide: MediaQueryList;
    isFilterMode: Boolean;
    typeReports = [
        { value: '0', viewValue: 'Pensiones vencidas' },
        { value: '1', viewValue: 'Pagos Puntuales' },
        { value: '2', viewValue: 'Pensiones pagadas' },
        { value: '3', viewValue: 'Verano' },
        { value: '4', viewValue: 'Concepto' },
        { value: '5', viewValue: 'Auditoria de sistema' },
    ];

    historicos = [
        {
            icon:'pie_chart',
            title: 'Pensiones pagadas'
        },
        {
            icon:'account_balance',
            title: 'Pagos puntuales'
        },
        {
            icon:'add_shopping_cart',
            title: 'Por concepto'
        },
        {
            icon:'wb_sunny',
            title: 'Verano'
        }
    ];

    constructor(
        private _location: Location,
        private _media: MediaMatcher,
        private _formBuilder :FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.setMediaQuery();
    }

    ngOnInit() {
        this.newSelectForm = this._builderForm();
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    toggleFilter() {
        this.isFilterMode = !this.isFilterMode;
    }

    closeSidenav() {
        this.tsrsidenav.close();
    }

    openSidenav() {
        this.tsrsidenav.toggle();
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this.mobileQuerySide = this._media.matchMedia('(max-width: 1279px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
        this.mobileQuerySide.addListener(this._mobileQueryListener);
    }

    backPage() {
        this._location.back();
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    private _builderForm() {
        let form =  this._formBuilder.group( {
            type: ['', Validators.required]
        });

        return form;
    }
}

