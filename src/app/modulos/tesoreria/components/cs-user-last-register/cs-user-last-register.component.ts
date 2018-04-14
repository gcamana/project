import { Component, OnInit, Input } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-user-last-register',
    templateUrl: 'cs-user-last-register.component.html',
    styleUrls: ['cs-user-last-register.component.scss']
})
export class CsUserLastRegisterComponent {
    @Input() users: IUser[] = [];
    @Input() current_money : number;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    carlos: string = SharedConstants.PATHS.CARLOS;
    ALUMNO: string = SharedConstants.ROLES.ALUMNO;
    EGRESO: string = SharedConstants.ACCION.EGRESO;
    isOpen: boolean;
    elements: any;
    scroll:any;

    constructor() {
        console.table(this.users);
    }

    ngAfterViewInit(){
        this.scroll = new PerfectScrollbar('.cs-side-wrapper');
    }

    openToggle() {
        this.isOpen = !this.isOpen;
        this.scroll.update();
    }
    ngOnDestroy() {
        this.scroll.destroy();
    }
}
