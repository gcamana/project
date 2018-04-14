import { Component, OnInit, ViewChild, ElementRef, Renderer, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { SharedConstants } from '../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';

var colorTmp: string = '';

@Component({
    selector: 'cs-skeleton-login',
    templateUrl: 'cs-skeleton-login.component.html',
    styleUrls: ['./cs-skeleton-login.component.scss'],
    providers: [MediaMatcher]
})

export class CsSkeletonLoginComponent implements OnInit {
    @ViewChild('formColor') formColor: TemplateRef<any>;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    primary: string = '#163981';
    secondary: string = '#EBEBEB';
    light: string = '#FCFCFC';
    ICON_FACEBOOK: string = SharedConstants.ICONS.ICON_FACEBOOK;
    ICON_GOOGLE: string = SharedConstants.ICONS.ICON_GOOGLE;
    ICON_OUTLOOK: string = SharedConstants.ICONS.ICON_OUTLOOK;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer: Renderer,
        private _media: MediaMatcher,
    ) {
        this.setMediaQuery();
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 767px)');

        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngAfterViewInit() {
        this.setColor();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit() { }
    setColor() {
        colorTmp = this.primary;
    }
}