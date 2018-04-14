import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { BscWelcomeService } from 'app/modulos/balanced-scorecard/pages/bsc-welcome/bsc-welcome.service';
import { ShrinkHeaderService } from 'app/shared/providers/utils/shrink-header.service';


@Component({
    selector: 'bsc-welcome-component',
    templateUrl: './bsc-welcome.component.html',
    styleUrls: ['bsc-welcome.component.scss'],
    providers: [MediaMatcher, BscWelcomeService]

})
export class BscWelcomeComponent {
    public metadata = {foto_usuario : null};
    message:string;
    mobileQuery: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    cambiar_por_data_dinamica: string = SharedConstants.PATHS.CARLOS;
    DOODLE: string = SharedConstants.PATHS.BSC.FRAME_1;
    title: string = "Balance Scorecard";
    ARROW_MAGIC = SharedConstants.PATHS.BSC.ARROW_MAGIC;
    displayTitle: boolean = false;
    private _mobileQueryListener: () => void;

    constructor(
        private _location: Location,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private bscWelcomeService: BscWelcomeService,
        private _shrinkHeaderSrv: ShrinkHeaderService
    ) {
        this.mobileQuery = this._media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(){
        let token = sessionStorage.getItem('token');

        this._activatedRoute.params.forEach(params => {
            if(params['token'] != null){
                let obj = {token : params['token']};
                this.verifyTokenInit(obj,params['token']);
            } else if(token != null){
                let obj = {token : token};
                this.verifyTokenInit(obj,token);
            } else{
                //window.location.href = SharedConstants.links.SMILEDU;
            }
        });
    }

    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }
    
    verifyTokenInit(obj,token){
        this.bscWelcomeService.validateToken(obj).subscribe(
            result => {
                if(result.error == 0){
                    this.metadata = JSON.parse(result.data_sess);
                    sessionStorage.setItem('token'   ,result.token);
                    sessionStorage.setItem('metadata',result.data_sess);

                    this._shrinkHeaderSrv.changeMessage("Hello from Sibling");
                }
                if(sessionStorage.getItem('token') == null){
                    window.location.href = SharedConstants.links.SMILEDU;
                }
                //------------------
            },
            error => {
                window.location.href = SharedConstants.links.SMILEDU;
            }
        )
    }

    goToDashboard() {
        this._router.navigate(['/bsc/dashboard'], { relativeTo: this._activatedRoute });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    backPage() {
        this._location.back();
    }
}
