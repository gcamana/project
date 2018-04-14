import { Component, ElementRef, Output, EventEmitter, Input, Renderer, Renderer2, NgZone } from '@angular/core';
@Component({
    selector: 'cs-shrinking-header-component',
    template: `<ng-content></ng-content>`
})

export class CsShrinkingHeaderComponent {
    @Input() headerHeight: number = 256;
    @Input() isToolbar: boolean = true;
    @Input() offset: number = 64;
    @Input() margin: number = 4;
    @Input() fontSize: number = 56;

    constructor(
        private _element: ElementRef,
        private _renderer: Renderer,
    ) { }

    ngAfterViewInit() {
        document.querySelector('header-component .mat-toolbar').classList.remove('shadow');
        let element = document.querySelector('mat-sidenav-content');
        this._renderer.setElementStyle(this._element.nativeElement, 'height', this.headerHeight + 'px');

        this._renderer.listen(element, 'scroll', (event) => {
            this.onScrollTop(event);
        });
    }

    onScrollTop(ev) {
        let titleElement = document.querySelector('.font-size-56');
        let header = document.querySelector('header-component .mat-toolbar');
        let scrollHeightTmp = ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight;

        if (titleElement != null) {
            if (ev.currentTarget.scrollTop > (this.headerHeight / 2)) {
                titleElement.classList.add('hideTitle');
            } else {
                titleElement.classList.remove('hideTitle');
            }
        }

        if (ev.currentTarget.scrollTop !== scrollHeightTmp) {
            // let titleElement = document.querySelector('.font-size-56');
            let fontSizeTmp = this.fontSize;
            let marginBottom = 0;

            if (ev.currentTarget.scrollTop <= this.headerHeight) {
                marginBottom = ev.currentTarget.scrollTop / this.margin;
                header.classList.remove('shadow');
            } else {
                marginBottom = this.offset;
                header.classList.add('shadow');
            }

            if (ev.currentTarget.clientHeight > 0) {
                fontSizeTmp = fontSizeTmp - (ev.currentTarget.scrollTop / 6);
            } else {
                fontSizeTmp = fontSizeTmp + (ev.currentTarget.scrollTop / 6);
            }

            if (this.isToolbar) {
                this._renderer.setElementStyle(this._element.nativeElement, 'margin-bottom', marginBottom + 'px');
            }
        }

        if(ev.currentTarget.scrollTop == 0) {
            header.classList.remove('shadow');
        }
    }
}
