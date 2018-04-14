import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[csFullScreen]'
})
export class CsFullScreenDirective {
    numberOfClicks = 0;
    constructor() { }

    @HostListener('click' )
    onFullScreen():void {

        if ((document.fullscreenElement && document.fullscreenElement !== null) ||  (!(document as any).mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if ((document as any).documentElement.mozRequestFullScreen) {
                (document as any).documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullScreen) {
                (document as any).documentElement.webkitRequestFullScreen(Element["ALLOW_KEYBOARD_INPUT"]);
            }

        } else {
            if ((document as any).cancelFullScreen) {
                (document as any).cancelFullScreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
        // this.isZoom = !this.isZoom;
    }
}