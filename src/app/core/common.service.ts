import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

    constructor(private _configSrv: ConfigService) { }

    buildApiUrl(endPoint: string, ...params: string[]): string {
        if (!endPoint.endsWith('/')) endPoint += '/';

        let apiUrl = this._configSrv.BASE_URL + endPoint;
        return apiUrl + params.join('/');
    }

    normalizeQuery(endPoint: string, criteria: any): string {
        let apiUrl = this.buildApiUrl(endPoint).slice(0, -1);
        return apiUrl + this._getQueryString(criteria);
    }

    private _getQueryString(criteria: any): string {
        let keys = Object.keys(criteria);
        if (!keys.length) return '';
        let query = keys.map(key => `${key}=${criteria[key]}&`).join('');
        return '?' + query.slice(0, -1);
    }

    setBackgroundStyle(bgImage?: string): any {
        //-TODO:CommonImage
        bgImage = bgImage || '';

        return { 'background-image': `url(${bgImage})` };
    }

    validatePhone(phone: any): string {
        if (typeof (phone) === 'string') return phone;

        if (typeof (phone) === 'object') {
            let cell = phone['cell'];

            if (cell) return cell;

            for (let key in phone) {
                if (phone[key]) return phone[key];
            }
        }

        throw 'No phone number provided.';
    }

    validateOnlyNumber(event: any): any {
        let charCode = (event.which) ? event.which : event.keyCode
        if (charCode != 190 && charCode != 110 && charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && (charCode < 37 || charCode > 40)) {
            event.preventDefault();
            return false;
        }

        return true;
    }

    contains(text: string, val: string): boolean {
        return text.indexOf(val) > -1;
    }

    browserDetected():string {
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        let isOpera = !!(window as any).opr ||  !!(window as any).opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        isOpera

        // Firefox 1.0+
        let isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

        let isSafari = Object.prototype.toString.call((window as any).HTMLElement).indexOf('Constructor') > 0 ||  navigator.userAgent.indexOf("Safari") != -1;

        // Edge 20+
        let isIE = /*@cc_on!@*/false || !!(document as any).documentMode;   // At least IE6
        let isEdge = !isIE && !!(window as any).StyleMedia || (navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true);

        // At least Safari 3+: "[object HTMLElementConstructor]"
        let isChrome = !!(window as any).chrome && !isOpera || navigator.userAgent.indexOf("Chrome") != -1;

        if (isChrome) {
            return "isChrome"
        } else if (isFirefox) {
            return "isFirefox"
        } else if (isIE || isEdge) {
            return "isIE"
        } else if (isSafari) {
            return "isSafari"
        }
    }

    detectedModulePath(path:string):string {
        let pathTmp = path.slice(1);
        let n = pathTmp.indexOf('/');
        pathTmp = pathTmp.substring(0, n != -1 ? n : pathTmp.length);
        return pathTmp
    }
}