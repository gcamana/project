
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';


@Component({
    selector: 'cs-search-user',
    templateUrl: './cs-search-user.component.html',
    styleUrls: ['cs-search-user.component.scss']
})

export class CsSearchUserComponent {
    @Input() users: any[];
    UNKNOWN_USER_IMAGE = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    @ViewChild('searchResp') searchResp : ElementRef;
    @Input() isSearch :boolean = false;
    @Output() onSelect = new EventEmitter();

    isShowProgress :boolean = false;
    value:string = '';

    constructor() {}

    toggleSearch() {
        if(!this.isSearch){
            this.setFocusInput();
        }

        this.isSearch = !this.isSearch;
    }

    ngAfterViewInit() {
        if (this.isSearch) this.setFocusInput()
    }

    setFocusInput() {
        setTimeout(() => {
            if (this.searchResp !== undefined) {
                this.searchResp.nativeElement.focus();
            }
        }, 500);
    }
    ngOnChanges () {
        if (this.value.length > 0) {
            this.isShowProgress = true;
        }
    }
}