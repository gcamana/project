import { SharedConstants } from 'app/shared/shared.constants';
import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from './../../../core/common.service';
import { ShrinkHeaderService } from 'app/shared/providers/utils/shrink-header.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'cs-user-permission',
    templateUrl: './cs-user-permission.component.html',
    styleUrls: ['cs-user-permission.component.scss'],
    animations: [
        trigger('slideInOut', [
          state('in', style({
            overflow: 'hidden',
            height: '*',
            opacity:'1'
          })),
          state('out', style({
            opacity: '0',
            overflow: 'hidden',
            height: '0px',
          })),
          transition('in => out', animate('400ms ease-in-out')),
          transition('out => in', animate('400ms ease-in-out'))
        ])
      ]
})

export class CsUserPermissionComponent implements OnInit {
    // private metadata = {foto_usuario : null};
    @Output('onToggleMode') onToggleMode = new EventEmitter();
    @Input() userId: string = "";
    @Input() user: any;
    @Input() reason: number;
    @Input() color: string = '';
    @Input() modules: any;
    @Input() metadata: any[] = [];
    isSetting: boolean = true;
    isZoom: boolean = true;
    DEFAULT_BG_IMAGE: string = SharedConstants.PATHS.DEFAULT_BG_IMAGE;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    elementBackdrop: any;
    //TODO:FakeData Limpiar
    selectedModule: any;
    selectedPage: any;
    helpMenuOpen;

    constructor(
        private _sharedSrv: CommonService,
        private _router: Router,
        private _renderer2: Renderer2,
        private _activatedRoute: ActivatedRoute,
        private _shrinkHeaderSrv: ShrinkHeaderService

    ) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    selectModule(item, uri?) {
        this.selectedModule = (this.selectedModule === item ? null : item);
        // this._router.navigate([uri], { relativeTo: this._activatedRoute });
    }

    selectPage(item) {
        this.selectedPage = (this.selectedPage === item ? null : item);
        this.onToggleMode.emit();
        // this._router.navigate([item], { relativeTo: this._activatedRoute });
    }


    isActiveModule(item) {
        return this.selectedModule === item;
    }
    isActivePage(item) {
        return this.selectedPage === item;
    }

    ngOnChanges() {
        if (this.reason) {
            this.isSetting = true;
        }
    }

    setBackground() {
        if (this.user)
            return this._sharedSrv.setBackgroundStyle(this.user.banner_profile || this.DEFAULT_BG_IMAGE);
    }

    togglePermission() {
        this.isSetting = !this.isSetting;
    }

    getFullscreenElement(): void {
        if ((document.fullscreenElement && document.fullscreenElement !== null) || (!(document as any).mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if ((document as any).documentElement.mozRequestFullScreen) {
                (document as any).documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullScreen) {
                (document as any).documentElement.webkitRequestFullScreen(Element["ALLOW_KEYBOARD_INPUT"]);
            }
            this.isZoom = false;
        } else {
            if ((document as any).cancelFullScreen) {
                (document as any).cancelFullScreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            this.isZoom = true;
        }
    }

    gotoPage(uri: string) {
        this._router.navigate([uri], { relativeTo: this._activatedRoute });
        this.onToggleMode.emit();
    }

    goToProfile() {
        alert("Implementandoo :)");
    }
}