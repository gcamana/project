import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SharedConstants } from '../../shared.constants';

@Component({
    selector: 'cs-welcome-card',
    templateUrl: 'cs-welcome-card.component.html',
    styleUrls: ['cs-welcome-card.component.scss']
})

export class CsWelcomeCardComponent {
    @Input() metadata:any;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    cambiar_por_data_dinamica: string = SharedConstants.PATHS.CARLOS;
    DOODLE: string = SharedConstants.PATHS.BSC.FRAME_1;

    constructor() {
    }

    ngOnChanges() {
        this.metadata = this.metadata || [];
        console.log(this.metadata);
    }
}