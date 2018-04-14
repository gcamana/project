import { style } from '@angular/animations';
import { CsGaugeModalComponent } from './../../components/cs-gauge-modal/cs-gauge-modal.component';
import { Component, OnInit, NgZone, ViewChild, ViewEncapsulation, ChangeDetectorRef, Renderer, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatSnackBar } from '@angular/material';

import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { ShrinkHeaderService } from '../../../../shared/providers/utils/shrink-header.service';
import { BscDashboardService } from 'app/modulos/balanced-scorecard/pages/bsc-dashboard/bsc-dashboard.service';


@Component({
    selector: 'bsc-dashboard-component',
    templateUrl: './bsc-dashboard.component.html',
    styleUrls: ['bsc-dashboard.component.scss'],
    providers: [MediaMatcher, BscDashboardService]
})

export class BscDashboardComponent {
    private token = sessionStorage.getItem('token');
    /**Filtros**/
    private list_pei = [];
    private pei_selected = null;
    private list_years = [];
    private year_selected = null;
    private list_tipo = [];
    private tipo_selected = null;
    private list_sedes = [];
    private sede_selected = null;
    private flg_multi;
    private list_areas = [];
    private area_selected = null;
    private flg_cmb_area;

    @ViewChild('bscsidenav') bscsidenav;
    @ViewChild('more') matCard;
    private _mobileQueryListener: () => void;
    private desc_bsc;
    private estructura: any[] = [];
    private responsables: any[];
    private bsc_data = { resp_bsc : [], actual: 0, valores_bsc: { zona_riesgo: 0, valor_amarillo: 0 }, perspectivas: [], id_bsc: null };
    private sedes_selected;
    mobileQuery: MediaQueryList;
    mobileQuery1: MediaQueryList;
    mobileQuerySide: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    CARLOS: string = SharedConstants.PATHS.CARLOS;
    MUJER: string = SharedConstants.PATHS.MUJER;
    META: string = SharedConstants.LEGEND.META
    ZONA_CRITICIDAD: string = SharedConstants.LEGEND.ZONA_CRITICIDAD
    COLOR_VERDE: string = SharedConstants.LEGEND.COLOR_VERDE
    COLOR_AMARILLO: string = SharedConstants.LEGEND.COLOR_AMARILLO
    title: string = "Dashboard";
    displayTitle: boolean = false;
    isMore: boolean;
    values: any = 25;
    sedes: any[] = [];
    hideHeader: boolean = false;

    isEmptyShow: boolean = false;

    resp_bsc: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _bscDashboardService: BscDashboardService,
        private _location: Location,
        private _dialog: MatDialog,
        private _iconRegistry: MatIconRegistry,
        private _sanitizer: DomSanitizer,
        private _snackBar: MatSnackBar,
        private _shrinkHeaderSrv: ShrinkHeaderService,

    ) {
        this.setMediaQuery();
        this.setIcon();
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this.mobileQuery1 = this._media.matchMedia('(max-width: 768px)');
        this.mobileQuerySide = this._media.matchMedia('(max-width: 1279px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
        this.mobileQuery1.addListener(this._mobileQueryListener);
        this.mobileQuerySide.addListener(this._mobileQueryListener);
    }

    setIcon() {
        this._iconRegistry.addSvgIcon(
            'cup', this._sanitizer.bypassSecurityTrustResourceUrl(SharedConstants.ICONS.CUP),
        );
    }

    ngOnInit() {
        this.firstLoadPage();
    }

    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }

    ngOnChanges() {
        //Finalizar Ghost
    }


    closeSidenav() {
        this.bscsidenav.close();
        this.hideHeader = false;

        document.querySelectorAll('.mat-drawer-content')[0].classList.remove('cs-overflow');
        document.querySelectorAll('header-component')[0].classList.remove('display-none');
    }

    openSidenav() {
        this.hideHeader = true;

        this.bscsidenav.toggle();
        document.querySelectorAll('.mat-drawer-content')[0].classList.add('cs-overflow');
        document.querySelectorAll('header-component')[0].classList.add('display-none');
    }

    getAvatarClass(feed): string {
        let baseClass = 'cs-avatars ';
        let numberText: string;

        switch (feed.files.length) {
            case 0: return baseClass.trim();
            case 1: numberText = 'one'; break;
            default: numberText = 'more-images'; break;
        }
        return baseClass + numberText;
    }

    getEstructuraBSC(flg_filtro?: any) {
        var obj = {
            sedes: this.sedes_selected,
            flg_filtro: flg_filtro
        };

        this._bscDashboardService.getEstructuraBSC(obj).subscribe(
            result => {
                this.estructura = result.bsc.perspectivas;

                if (flg_filtro == undefined) {
                    this.sedes = result.sedes;
                }
            },
            error => {

            }
        );
    }

    setIndicadores(event) {
        for (let i = 0; i < this.estructura[event.idx_persp].objetivos.length; i++) {
            this.estructura[event.idx_persp].objetivos[i].active = event.idx_obj == i ? 'active' : '';
        }

        this.estructura[event.idx_persp].objetivos[0].indicadores = event.indicadores;
    }

    selectSede(event) {
        this.sedes_selected = event.value;
        this.getEstructuraBSC(1);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.mobileQuery1.removeListener(this._mobileQueryListener);
        this.mobileQuerySide.removeListener(this._mobileQueryListener);
    }

    backPage() {
        this._location.back();
    }

    firstLoadPage() {
        var obj = { token: this.token };
        this._bscDashboardService.firstLoadPage(obj).subscribe(
            result => {
                this.list_pei = result.periodos.list_periodos;
                this.pei_selected = result.periodos.selected;
                this.list_years = result.years.list_years;
                this.year_selected = result.years.selected;
                this.list_tipo = result.tipo_bsc.list_combo;
                this.tipo_selected = result.tipo_bsc.selected;
                this.list_sedes = result.sedes.list_sedes;
                this.flg_multi = result.sedes.flg_multi;
                this.sede_selected = (!this.flg_multi) ? result.sedes.selected[0] : result.sedes.selected;
                if (result.bsc.id_bsc != null) {
                    this.bsc_data = result.bsc;
                    this.resp_bsc = this.bsc_data.resp_bsc;
                    this.desc_bsc = result.bsc.desc_bsc;
                    this.estructura = this.bsc_data.perspectivas;
                }
                if (result.areas != undefined) {
                    this.list_areas = result.areas.list_areas;
                    this.area_selected = result.areas.selected;
                    this.flg_cmb_area = true;
                } else {
                    this.list_areas = [];
                    this.area_selected = null;
                    this.flg_cmb_area = false;
                }
            },
            error => {

            }
        )
    }

    changePEI() {
        var obj = {
            token: this.token,
            pei_selected: this.pei_selected
        };
        this._bscDashboardService.getYearsByPEI(obj).subscribe(
            result => {
                this.list_years = result.years.list_years;
                this.year_selected = result.years.selected;
                this.list_tipo = [];
                this.tipo_selected = null;
                this.list_sedes = [];
                this.sede_selected = null;
            },
            error => {

            }
        )
    }

    getTiposBSC() {
        var obj = {
            token: this.token,
            pei_selected: this.pei_selected
        };
        this._bscDashboardService.getTiposBSC(obj).subscribe(
            result => {
                this.list_tipo = result.list_combo;
                this.tipo_selected = result.selected;
            },
            error => {

            }
        )
    }

    getComboByTipoBSC() {
        var obj = {
            token: this.token,
            pei_selected: this.pei_selected,
            tipo_bsc: this.tipo_selected,
            year: this.year_selected
        };
        this._bscDashboardService.getSedesTipo(obj).subscribe(
            result => {
                this.list_sedes = result.sedes.list_sedes;
                this.flg_multi = result.sedes.flg_multi;
                this.sede_selected = result.sedes.selected;
                if (result.areas != undefined) {
                    this.list_areas = result.areas.list_areas;
                    this.area_selected = result.areas.selected;
                    this.flg_cmb_area = true;
                } else {
                    this.list_areas = [];
                    this.area_selected = null;
                    this.flg_cmb_area = false;
                }
            },
            error => {

            }
        )
    }

    getEstructuraFiltro() {
        var obj = {
            token: this.token,
            pei_selected: this.pei_selected,
            tipo_bsc: this.tipo_selected,
            year: this.year_selected,
            sede: this.sede_selected,
            area: this.area_selected
        };

        this._bscDashboardService.getEstructuraBSC(obj).subscribe(
            result => {
                if(!('valores_bsc' in result.bsc)) result.bsc.valores_bsc = {zona_riesgo : null};
                if(!('resp_bsc'    in result.bsc)) result.bsc.resp_bsc = [];
                this.resp_bsc = result.bsc.resp_bsc;
                this.bsc_data = result.bsc;
                this.desc_bsc = result.bsc.desc_bsc;
                this.estructura = result.bsc.perspectivas;
                if (this.mobileQuery.matches) this.closeSidenav();
            },
            error => {

            }
        )
    }

    getSedesArea() {
        var obj = {
            token: this.token,
            year: this.year_selected
        };
        this._bscDashboardService.getSedesArea(obj).subscribe(
            result => {
                this.list_sedes = result.sedes.list_sedes;
                this.flg_multi = result.sedes.flg_multi;
                this.sede_selected = result.sedes.selected;
            },
            error => {

            }
        )
    }

    editGaugeValue() {
        let modal = this._dialog.open(CsGaugeModalComponent, {
            width: '250px',
            data: { zona_riesgo: this.bsc_data.valores_bsc.zona_riesgo, valor_amarillo: this.bsc_data.valores_bsc.valor_amarillo, view: 'general', unidad_medida: "%" },
            panelClass: 'cs-gauge-modal-panel'
        });

        modal.componentInstance.valuesGeneral.subscribe(
            result => {
                result.bsc = this.bsc_data.id_bsc;
                result.year = this.year_selected;
                result.token = this.token;
                this._bscDashboardService.setValueBSC(result).subscribe(
                    result => {
                        this.bsc_data.valores_bsc.zona_riesgo = result.zona_riesgo;
                        this.bsc_data.valores_bsc.valor_amarillo = result.valor_amarillo;
                        modal.close();
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                    },
                    error => {
                        error = JSON.parse(error._body);

                    }
                )
            }
        )
    }

    changeValuesPerspectiva(event) {
        this.estructura[event.index].zona_riesgo = event.zona_riesgo;
        this.estructura[event.index].v_amarillo = event.valor_amarillo;
        event.token = this.token;
        event.year = this.year_selected;
        this._bscDashboardService.setValuePersp(event).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
            },
            error => {

            }
        )
    }

    changeValuesObj(event) {
        event.token = this.token;
        event.year = this.year_selected;
        event.bsc = this.estructura[event.idx_est].id_bsc;
        event.persp = this.estructura[event.idx_est].id_persp;
        this._bscDashboardService.setValueObj(event).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
                this.estructura[event.idx_est].objetivos[event.idx_obj].v_amarillo = event.valor_amarillo;
                this.estructura[event.idx_est].objetivos[event.idx_obj].zona_riesgo = event.zona_riesgo;
            },
            error => {
                error = JSON.parse(error._body);

            }
        )
    }

    realoadResp(resp, i) {
        this.estructura[i].responsables = this.estructura[i].responsables.concat(resp);
    }

    savePesoPersp(event) {
        event.year = this.year_selected;
        event.token = this.token;
        this._bscDashboardService.savePesoPersp(event).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
            },
            error => {

            }
        )
    }

    savePesoObj(event) {
        event.year = this.year_selected;
        event.token = this.token;
        this._bscDashboardService.savePesoObj(event).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
                this.estructura[event.idx_est].objetivos[event.idx_obj].peso = event.peso;
            },
            error => {

            }
        )
    }

    savePesoInd(event) {
        event.year = this.year_selected;
        event.token = this.token;
        this._bscDashboardService.savePesoInd(event).subscribe(
            result => {
                this._snackBar.open(result.msj, 'cerrar', {
                    duration: 2000,
                });
            },
            error => {

            }
        )
    }

    onRemoveResp(event) {
        for (let i in this.estructura[event.idx_persp].responsables) {
            if (this.estructura[event.idx_persp].responsables[i].id_persona == event.pers) {
                this.estructura[event.idx_persp].responsables.splice(i, 1);
                break;
            }
        }
    }
}