import { map } from 'rxjs/operators/map';
import { Component, ChangeDetectorRef, ViewChild, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from './shared/shared.constants';
import 'hammerjs';
import { OwnerIdentityService } from 'app/core/providers/session/owner-identity.service';
import { ShrinkHeaderService } from './shared/providers/utils/shrink-header.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { BscWelcomeService } from 'app/modulos/balanced-scorecard/pages/bsc-welcome/bsc-welcome.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from './core/providers/session/auth.service';
import { Location } from '@angular/common';
import { CommonService } from './core/common.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [MediaMatcher]
})

export class AppComponent {
    title = 'Balaced Score Card';
    modulesTmp: any;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    @ViewChild('modenav') modenav;
    @ViewChild('sidenav') sidenav;
    sideNavActive: boolean;
    themeHeader: string = "";
    user:any;
    reason: number = 0;
    displayTitle: boolean = false;
    private metadata = { foto_usuario: null };
    scroll: any;
    hideHeader: boolean;
    collegePage: any;
    isModule: boolean;
    moduleChange:any;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _ownerIdentitySrv: OwnerIdentityService,
        private _shrinkHeaderSrv: ShrinkHeaderService,
        private _media: MediaMatcher,
        private _location: Location,
        private bscWelcomeService: BscWelcomeService,
        private _commonSrv: CommonService,
        private _authService: AuthService,
        public scrollDispatcher: ScrollDispatcher
    ) {
        this.setUrl();
        this.getDomain();
        this.setMedia();
        this.setThemeWithPath(this._location.prepareExternalUrl(this._location.path()));
        //-TODO: Elimiar getModules(), this.login() fake Data
        this.getModules();
        this.login();
    }

    setThemeWithPath(url: string) {
        this.moduleChange = this._commonSrv.detectedModulePath(url);
        let moduleTmp = SharedConstants.modulos;

        if (this.moduleChange.length != 0) {
            this.isModule = true;
        } else {
            this.isModule = false;
        }

        switch (this.moduleChange) {
            case moduleTmp.TESORERIA.name:
                this.themeHeader = "theme-treasury";
                break;
            case moduleTmp.BSC.name:
                this.themeHeader = "theme-bsc";
                break;
            case moduleTmp.LOGIN:
                this.hideHeader = true;
                break;
            default:
                this.themeHeader = "";
                break;
        }
    }

    setColor(color: string) {
        if (!this.isModule) {
            let element = document.querySelector('cs-shrinking-header-component');
            if (element != undefined || element != null) {
                element["style"].backgroundColor = color;
            }
        }
    }

    setUrl() {
        let url = location.href.split('/');

        if (url[url.length - 2] == 'main') {
            this.verifyTokenInit({ token: url[url.length - 1] }, url[url.length - 1]);
        } else {
            this.metadata = JSON.parse(sessionStorage.getItem('metadata'));
        }
    }

    setMedia() {
        this.mobileQuery = this._media.matchMedia('(max-width: 800px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngAfterViewInit() {
        this.scrollDispatcher.register;
    }

    onToggleMode(event) {
        this.modenav.toggle();
        if (this.modenav.open) {
            this.sidenav.close();
            this.sideNavActive = false;
        }

        this.setThemeWithPath(this._location.prepareExternalUrl(this._location.path()));
    }

    getDomain() {
        // let domain = window.location.hostname;
        let domain = "testcdn2";
        //let domain = "localhost";
        this._authService.getDomain(domain)
            .subscribe(theme => {
                console.log(theme);
                setTimeout(() => {
                    this.collegePage = theme;
                    // console.log(theme.color);
                    this.setColor(this.collegePage.color);
                    // this._csGhostSrv.setLoading(false)
                }, 2000);
            });
    }

    getModules() {
        this.modulesTmp = [
            {
                moduleName: 'Tesorería',
                // uri:'/tesoreria',
                id:'01',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
            {
                moduleName: 'Matrícula',
                uri:'',
                id:'02',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria/movimientos'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
            {
                moduleName: 'Calificaciones',
                uri:'',
                id:'03',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria/movimientos'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
            {
                moduleName: 'Admisión',
                uri:'',
                id:'04',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria/movimientos'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
            {
                moduleName: 'Encuestas',
                uri:'',
                id:'05',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria/movimientos'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
            {
                moduleName: 'Doc. Institucionales',
                uri:'',
                id:'06',
                modules: [
                    {
                        name: 'Movimientos',
                        uri:'/tesoreria/movimientos'
                    },
                    {
                        name: 'caja',
                        uri:'/tesoreria/caja'
                    },
                    {
                        name: 'Reportes',
                        uri:'/tesoreria/reportes'
                    },
                    {
                        name: 'Mis egresos',
                        uri:'/tesoreria/egresos'
                    }
                ]
            },
        ]
    }

    login() {
        this._authService.login()
            .subscribe(user => {
                this.user = user;
            });
    }

    verifyTokenInit(obj, token) {
        this.bscWelcomeService.validateToken(obj).subscribe(
            result => {
                this.metadata = JSON.parse(result.data_sess);
                //------------------
            },
            error => {
                //window.location.href = SharedConstants.links.SMILEDU;
            }
        )
    }

    onToggleSide(event) {
        this.sidenav.toggle();
        this.sideNavActive = !this.sideNavActive;
    }
    close(reason: number) {
        reason++;

        this.reason = reason;
        this.sidenav.close();
        this.modenav.close();
    }

    ngOnDestroy() {
        this.scroll.destroy();
    }
}