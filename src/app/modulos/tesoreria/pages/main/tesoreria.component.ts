import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedConstants } from 'app/shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'tesoreria',
    templateUrl: './tesoreria.component.html',
    styleUrls:['tesoreria.component.scss']
})
export class TesoreriaComponent {
    mobileQuery: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    DOODLE: string = SharedConstants.PATHS.BSC.FRAME_1;
    title: string = "Tesoreria";
    ARROW_MAGIC = SharedConstants.PATHS.BSC.ARROW_MAGIC;
    displayTitle: boolean = false;
    private _mobileQueryListener: () => void;

    constructor(
        private _media: MediaMatcher,
        private _location: Location,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
    ){
        this.setMediaQuery();
    }

    setMediaQuery(){
        this.mobileQuery = this._media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }
    backPage() {
        this._location.back();
    }
    goToTsc() {
        this._router.navigate(['/tesoreria/movimientos'], { relativeTo: this._activatedRoute });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}