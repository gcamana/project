import { SharedConstants } from 'app/shared/shared.constants';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'cs-empty',
    templateUrl: './cs-empty.component.html',
    styleUrls: ['cs-empty.component.scss']
})

export class CsEmptyComponent {
    @Input() entity = '';
    @Input() image: string;
    @Input() message: string = SharedConstants.messages.empty.YOU_DO_NOT_HAVE_ANY;
    @Input() invite = false;
    @Input() title : string;
    @Input() loader = true;
    @Input() data : any[] = [];
    @Input() inviteMessage: string;
    fullMessage: string;

    active: boolean = false;

    constructor() {

    }

    ngOnInit() {
        this._validateData(this.data);
    }


    ngOnChanges(changes: SimpleChanges) {
        this.image = this.image || SharedConstants.EMPTY_PATHS.BANDEJA;
        this._validateData(this.data);

        if (!this.active) {
            if (!this.invite) {
                this.fullMessage = this.message + this.entity + '.';
            } else {
                this.fullMessage = SharedConstants.messages.empty.FULL_MESSAGE;
                this.inviteMessage = this.inviteMessage || SharedConstants.messages.empty.INVITE_MESSAGE;
            }

            let timeout = setTimeout(() => {
                this.loader = false, 2000
            });

            // if (!changes.data.firstChange && this.data) {
            //     this.loader = false;
            //     clearTimeout(timeout);
            // }
        }
    }

    private _validateData(data:any[]) {
        if (data.length > 0) return this.active = true;

        if (typeof (data) === 'object') {

            data["filteredData"] = data["filteredData"] || [];

            if (data["filteredData"].length > 0) {
                this.active = true
            }
        }

        return this.active = false;
    }
}