import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-skeleton-accordion',
    templateUrl: './cs-skeleton-accordion.component.html',
    styleUrls: ['cs-skeleton-accordion.component.scss']
})

export class CsSkeletonAccordion {
    @Input() data: any[] = [];
    active :boolean;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    EMPTY_CHART = SharedConstants.EMPTY_PATHS.FILTER
    isEmpty: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
    ) {
        this.setMediaQuery();
    }
    ngOnInit() {
        this.validateData(this.data);
    }

    ngOnChanges() {
        this.validateData(this.data);
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    validateData(data:any[]) {
        if (data.length > 0) {
            setTimeout(() => {
                this.isEmpty = false;
            }, 10000);
            return this.active = true;
        } else {
            setTimeout(() => {
                this.isEmpty = true;
            }, 10000);
            return this.active  = false;
        }

    }
}