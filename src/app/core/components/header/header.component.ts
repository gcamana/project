import { Component, Input, OnChanges, ElementRef, HostListener, Output, EventEmitter, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from './../../common.service';
import { SharedConstants } from './../../../shared/shared.constants';
import { ShrinkHeaderService } from '../../../shared/providers/utils/shrink-header.service';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent  {
    @Input() color: string;
    @Input() themeHeader: string;
    @Output('onToggleMode') onToggleMode = new EventEmitter();
    @Output('onToggleSide') onToggleSide = new EventEmitter();
    @Input() title: string;
    @Input() moduleChange: string;
    @Input() displayTitle: boolean;
    isToggleSide: boolean;
    hideHeader: boolean;
    private sub: any;
    theme: string = "";
    id: string;

    constructor(
        private _iconRegistry: MatIconRegistry,
        private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _location: Location,
        private _commonSrv: CommonService,
        private _element: ElementRef,
        private _renderer: Renderer,

    ) {
        this.setIconSvg();
    }

    ngAfterViewInit() {
        let element = document.querySelector('mat-sidenav-content');
        this._renderer.listen(element, 'scroll', (event) => {
            this.onScrollTop(event);
        });
    }

    onScrollTop(ev) {
        let scrollHeightTmp = ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight;
        let header = document.querySelector('header-component .mat-toolbar');

        if (ev.currentTarget.scrollTop !== scrollHeightTmp) {
            if (header != null) {
                if (ev.currentTarget.scrollTop <= 64) {
                    header.classList.remove('shadow');
                } else {
                    header.classList.add('shadow');
                }
            }
        }
    }

    setIconSvg() {
        this._iconRegistry.addSvgIcon(
            'magic_search',
            this._sanitizer.bypassSecurityTrustResourceUrl(SharedConstants.ICONS.MAGIC_SEARCH));
    }

    toggleMode() {
        this.onToggleMode.emit();
    }

    toggleSide() {
        this.onToggleSide.emit();
        this.isToggleSide = !this.isToggleSide;
    }
}
