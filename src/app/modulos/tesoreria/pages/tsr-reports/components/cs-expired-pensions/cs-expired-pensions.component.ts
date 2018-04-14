import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedConstants } from '../../../../../../shared/shared.constants';

@Component({
    selector: 'cs-expired-pensions',
    templateUrl: 'cs-expired-pensions.component.html',
    styleUrls: ['cs-expired-pensions.component.scss'],
})

export class CsExpiredPensionsComponent implements OnInit {
    @Input() title: string;
    @Input() data: any[] = [];
    PIN_UP: string = SharedConstants.ICONS.PIN_UP
    constructor(
        private _iconRegistry: MatIconRegistry,
        private _sanitizer: DomSanitizer
    ) {
        this.setIcon();
        console.log(this.data);
    }

    ngOnInit() { }

    setIcon() {
        this._iconRegistry.addSvgIcon(
            'pin-up', this._sanitizer.bypassSecurityTrustResourceUrl(this.PIN_UP),
        );
    }
}