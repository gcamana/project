import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialog } from '@angular/material';
import { CsGaugeModalComponent } from 'app/modulos/balanced-scorecard/components/cs-gauge-modal/cs-gauge-modal.component';
import { CsUserResponsableModalComponent } from './../cs-user-responsable-modal/cs-user-responsable-modal.component';
import { CsPesoModalComponent } from './../cs-peso-modal/cs-peso-modal.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'cs-goals',
    templateUrl: 'cs-goal.component.html',
    styleUrls: ['cs-goal.component.scss']
})

export class CsGoalComponent {
    private zona_riesgo;
    private valor_amarillo;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    @Input('objetivos') objetivos;
    @Input('index') index;
    @Input() avatarDetail: boolean = false;
    @Output('setIndicadores') setIndicadores = new EventEmitter();
    @Output() saveValuesObj                  = new EventEmitter();
    @Output() realoadResp                    = new EventEmitter();
    @Output() savePesoObj                    = new EventEmitter();
    @Output() onRemoveResp                   = new EventEmitter();


    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _dialog: MatDialog,
    ) {
        this.setMediaQuery();
     }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 1024px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    selectObjetivo(indicadores, idx_obj) {
        this.setIndicadores.emit({ indicadores: indicadores, idx_persp: this.index, idx_obj: idx_obj });
    }

    editValues(idx, obj) {
        let modal = this._dialog.open(CsGaugeModalComponent, {
            width: '250px',
            data: { zona_riesgo: this.objetivos[idx].zona_riesgo, valor_amarillo: this.objetivos[idx].v_amarillo, meta_visible: false, view: 'objetivo' , unidad_medida:"%"}
        });
        modal.componentInstance.valuesObj.subscribe(result => {
            this.zona_riesgo = parseInt(result.zona_riesgo);
            this.valor_amarillo = parseInt(result.valor_amarillo);
            let datos = {
                zona_riesgo: this.zona_riesgo,
                valor_amarillo: this.valor_amarillo,
                obj: obj,
                idx_est: this.index,
                idx_obj: idx,
                peso : this.objetivos[idx].peso
            };
            this.saveValuesObj.emit(datos);
            modal.close();
        });
    }

    toAssignResponsable(id_bsc, id_persp, id_obj, i) {
        let modal = this._dialog.open(CsUserResponsableModalComponent, {
            width: ' 320px',
            data: { responsables: [], flg_busqueda: 'objetivo', metadata: { bsc: id_bsc, persp: id_persp, obj: id_obj } },
            panelClass: 'cs-user-list-modal'
        });

        modal.componentInstance.refreshResp.subscribe(
            result => {
                this.objetivos[i].responsables = this.objetivos[i].responsables.concat(result.resp);
                this.realoadResp.emit(result.resp);
            }
        )
    }

    editPesoObj(peso, bsc, persp, obj, idx_obj){

        let modal = this._dialog.open(CsPesoModalComponent, {
            width: '250px',
            data: { peso: peso }
        });

        modal.componentInstance.onSetPeso.subscribe(
            result => {
                result.zona_riesgo    = this.objetivos[idx_obj].zona_riesgo;
                result.valor_amarillo = this.objetivos[idx_obj].v_amarillo;
                result.bsc            = bsc;
                result.persp          = persp;
                result.obj            = obj;
                result.idx_obj        = idx_obj;
                result.idx_est        = this.index;
                this.savePesoObj.emit(result);
                modal.close();
            }
        )
    }

    removeResp(event, i){
        this.objetivos[i].responsables.splice(event.idx_resp,1);
        this.onRemoveResp.emit({pers : event.pers, idx_persp : this.index});
    }
}