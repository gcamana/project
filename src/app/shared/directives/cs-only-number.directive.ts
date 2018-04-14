import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { CommonService } from './../../core/common.service';

@Directive({
    selector: '[onlyNumber]'
})
export class CsOnlyNumberDirective {
    @Input() onlyNumber: boolean;

    constructor(
        private _el: ElementRef,
        private _commonSrv: CommonService
    ) {
        // _el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        try {
            this._commonSrv.validateOnlyNumber(event)
        } catch (error) {
            console.log(error)
        }

    }
}
