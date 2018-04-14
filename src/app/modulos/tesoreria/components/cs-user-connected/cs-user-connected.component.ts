import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';

@Component({
    selector: 'cs-user-connented',
    templateUrl: 'cs-user-connected.component.html',
    styleUrls: ['cs-user-connected.component.scss']
})
export class CsUserConnectedComponent {
    @Input() users: IUser[] = [];
    @Output() selectUser = new EventEmitter;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    carlos: string = SharedConstants.PATHS.CARLOS;
    ALUMNO: string = SharedConstants.ROLES.ALUMNO;
    isOpen: boolean;
    elements: any;
    scroll:any;
    constructor() {

    }


    ngAfterViewInit() {
        this.elements = document.querySelectorAll('.cs-figure__list figure') || [];
        this.scroll = new PerfectScrollbar('.cs-side-wrapper');
    }

    selectedUser(event, user, idx) {
        this.setSelectedUser();
        event.currentTarget.classList.add('active');
        user.idx = idx;
        this.selectUser.emit(user);
    }

    setSelectedUser() {
        this.elements = document.querySelectorAll('.cs-figure__list figure') || [];
        for (let index = 0; index < this.elements.length; index++) {
            this.elements[index].classList.remove('active');
        }
    }
    ngOnDestroy() {
        this.scroll.destroy()
    }

    openToggle() {
        this.isOpen = !this.isOpen;
        this.scroll.update()
    }
}
