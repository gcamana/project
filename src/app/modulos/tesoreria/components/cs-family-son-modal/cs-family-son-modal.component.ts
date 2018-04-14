import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';

import { IUser } from './../../models/user';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'cs-family-son-modal',
    templateUrl: 'cs-family-son-modal.component.html',
    styleUrls: ['cs-family-son-modal.component.scss']
})
export class CsFamilySonModalComponent {
    private _userQueryListener: () => void;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    isSelect: boolean = false;
    value:string;
    user:any = {};
    users: any[] = [];
    title: string = "Hijos en la familia";
    isActiveButtom :boolean = false;
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    displayedColumns = ['description', 'amount', 'type'];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CsFamilySonModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.users = data.users;
    }

    onchange(event) {
        if(event) {
            this.isActiveButtom = true;
            this.user = event.value;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    selectUser() {
        this.isSelect = true;
        document.querySelector('.cs-family-son-modal').classList.add('w-640');
    }

    toggle() {
        this.isSelect = !this.isSelect;
        if(!this.isSelect) {
            document.querySelector('.cs-family-son-modal').classList.remove('w-640');
        }
    }

    // ngOnDestroy() {
    //     document.querySelector('.cs-family-son-modal').classList.remove('w-640');
    // }
}

export interface Element {
    amount: string;
    description: string;
    type: string;
}

const ELEMENT_DATA: Element[] = [
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '0,0', type: ''},
    { description: 'Pensión de Mayo', amount: '0,0', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '0,0', type: ''},
    { description: 'Pensión de Mayo', amount: '0,0', type: ''},
    { description: 'Pensión de Mayo', amount: '0,0', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
    { description: 'Pensión de Mayo', amount: '217.00', type: ''},
];