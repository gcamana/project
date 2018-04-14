import { Directive, Input, HostListener } from '@angular/core';
import { CommonService } from './../../core/common.service';

declare var window;

@Directive({
    selector: '[csCallTo]'
})
export class CsCallToDirective {

    @Input('csCallTo') phone: any;

    constructor(
        private _commonSrv: CommonService
    ) { }

    @HostListener('click')
    callTo(): void {
        try {
            let phoneNumber = this._commonSrv.validatePhone(this.phone);
            window.location = `tel:${phoneNumber}`;
        } catch (e) {
            console.log(e);
        }
    }

}