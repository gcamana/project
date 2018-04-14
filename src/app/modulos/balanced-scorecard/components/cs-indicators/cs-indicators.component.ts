import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SharedConstants } from '../../../../shared/shared.constants';
import { CsUserResponsableModalComponent } from './../cs-user-responsable-modal/cs-user-responsable-modal.component';
import { CsPesoModalComponent } from './../cs-peso-modal/cs-peso-modal.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'cs-indicators',
    templateUrl: 'cs-indicators.component.html',
    styleUrls: ['cs-indicators.component.scss'],
    animations: [
        trigger('hideShowAnimator', [
            state('true', style({ opacity: 1 })),
            state('false', style({ opacity: 0 })),
            transition('0 => 1', animate('.25s')),
            transition('1 => 0', animate('.0s'))
        ])
    ]
})

export class CsIndicatorsComponent {
    @Input('indicadores') indicadores;
    @Input() responsables : any[];
    @Input() truncateText = true;
    @Input() avatarDetail: boolean = false;
    @Output() respIndi    = new EventEmitter();
    @Output() savePesoInd = new EventEmitter();
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    hideShowAnimator: boolean = true;

    private _mobileQueryListener: () => void;

    mobileQuery: MediaQueryList;
    textTruncateNumber: number;
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.setMediaQuery();
     }

    ngOnChanges() {
        if (this.indicadores) {
            this.hideShowAnimator = false;
            setTimeout(() => {
                this.hideShowAnimator = true;
            }, 250)
        }

        if(this.mobileQuery.matches) {
            this.textTruncateNumber = 30;
        }else {
            this.textTruncateNumber = 50;
        }
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 1440px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    goToIndicator(metadata, resp) {
        sessionStorage.setItem('data-indi', JSON.stringify(metadata));
        this._router.navigate(['/bsc/dashboard/indicator'], { relativeTo: this._activatedRoute });
        this.dialog.closeAll();
    }

    toAssignResponsable(metadata, persp, i) {
        metadata.persp = persp;
        let modal = this.dialog.open(CsUserResponsableModalComponent, {
            width: ' 320px',
            data: {responsables : [], flg_busqueda : 'indicator', metadata : metadata},
            panelClass:'cs-user-list-modal'
        });

        modal.componentInstance.refreshResp.subscribe(
            result => {
                this.indicadores[i].responsables = this.indicadores[i].responsables.concat(result.resp);
            }
        )
    }

    editPesoInd(peso, zona_riesgo, valor_amarillo, idx_ind, metadata, persp){
        let modal = this.dialog.open(CsPesoModalComponent, {
            width: '250px',
            data: { peso : peso}
        });
        modal.componentInstance.onSetPeso.subscribe(
            result => {
                result.bsc            = metadata.bsc;
                result.persp          = persp;
                result.obj            = metadata.obj;
                result.ind            = metadata.ind;
                result.zona_riesgo    = zona_riesgo;
                result.valor_amarillo = valor_amarillo;
                this.indicadores[idx_ind].peso = result.peso;
                this.savePesoInd.emit(result);
                modal.close();
            }
        )
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);

    }

    removeResp(event, idx_ind){
        this.indicadores[idx_ind].responsables.splice(event.idx_resp, 1);
    }
}