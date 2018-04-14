
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from '../../shared/shared.constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cs-main',
    templateUrl: 'cs-main.component.html',
    styleUrls: ['cs-main.component.scss'],
    providers: [MediaMatcher]
})

export class CsMainComponent implements OnInit {
    mobileQuery: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    DOODLE: string = SharedConstants.PATHS.BSC.FRAME_1;
    SEARCH_MAGIC = SharedConstants.ICONS.SEARCH_MAGIC;
    private _mobileQueryListener: () => void;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
    ) {
        this.mobileQuery = this._media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
     }

    ngOnInit() { }

    ngAfterViewInit() {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}