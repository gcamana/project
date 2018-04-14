
import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedConstants } from '../../shared.constants';
import { CsUserListModalComponent } from '../cs-user-list-modal/cs-user-list-modal.component';
import { CsFamilyModalComponent } from '../../../modulos/tesoreria/components/cs-family-modal/cs-family-modal.component';
import { CsFamilySonModalComponent } from '../../../modulos/tesoreria/components/cs-family-son-modal/cs-family-son-modal.component';

@Component({
    selector: 'cs-user-avatar',
    templateUrl: './cs-user-avatar.component.html',
    styleUrls: ['cs-user-avatar.component.scss']
})

export class CsUserAvatarComponent {
    @Input() idx_ind: number;
    @Input() users: any[];
    @Input() zoom: number = 30;
    @Input() metadata: any;
    @Input() title: string;
    @Input() usersCount: number;
    @Input() onlyCount: boolean = false;
    @Input() hideName: boolean = false;
    @Input() type: string;
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    @Output() goToStudent = new EventEmitter();
    @Output() onRemove = new EventEmitter();

    showAvatarCount: boolean = true;
    hideAvatarCount: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
    ) {
    }


    ngAfterViewInit() {
        this.getEntityClass();
    }

    goToListUser() {
        let modal;

        if (this.type == 'family') {
            modal = this._dialog.open(CsFamilyModalComponent, {
                width: ' 320px',
                data: { users: this.users, metadata: this.metadata, title: this.title },
                panelClass: 'cs-family-modal'
            });

        } else if (this.type == 'son') {
            modal = this._dialog.open(CsFamilySonModalComponent, {
                width: ' 320px',
                data: { users: this.users, title: this.title },
                panelClass: 'cs-family-son-modal'
            });
        } else {
            modal = this._dialog.open(CsUserListModalComponent, {
                width: ' 400px',
                data: { responsables: this.users, metadata: this.metadata, title: this.title, type : this.type},
                panelClass: 'cs-user-list-modal'
            });
            modal.componentInstance.goToStudent.subscribe(
                result => {
                    this.goToStudent.emit(result);
                    modal.close();
                }
            )
            modal.componentInstance.onRemove
                .subscribe(result => {
                    this.onRemove.emit(result);
                });

        }
    }

    getEntityClass(): string {
        let baseClass = 'cs-avatars ';
        let numberText: string;

        if (!this.onlyCount) {
            switch (this.users.length) {
                case 0:
                    this.hideAvatarCount = true;
                    return baseClass.trim();
                case 1:
                    this.hideAvatarCount = true;
                    numberText = 'one';
                    this.showAvatarCount = true;
                    break;
                case 2:
                case 3:
                    this.hideAvatarCount = true;
                    numberText = 'more-images';
                    break;
                // case 4: numberText = 'four'; break;
                default:
                    this.hideAvatarCount = false;
                    numberText = 'more-images';
                    break;
            }

            return baseClass + numberText;

        } else {
            switch (this.users.length) {
                case 0:
                    this.hideAvatarCount = true;
                    return baseClass.trim()
                case 1:
                    numberText = 'one';
                    this.hideAvatarCount = true;
                    break;
                default:
                    this.showAvatarCount = false;
                    this.hideAvatarCount = false;
                    break;
            }
            return baseClass + numberText;
        }
    }

    ngOnChanges() {
        this.getEntityClass();
    }
}