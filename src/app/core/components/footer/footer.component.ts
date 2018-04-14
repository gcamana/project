import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Owner } from '../../../shared/models/owner';
import { SharedConstants } from "../../../shared/shared.constants";
@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss'],
})
export class FooterComponent {
    @Input() subtitle = '';
    @Input() color: string;
    ICON_FACEBOOK: string = SharedConstants.ICONS.ICON_FACEBOOK_GRAY;
    ICON_INSTA_GRAY: string = SharedConstants.ICONS.ICON_INSTA_GRAY;
    ICON_TWITTER_GRAY: string = SharedConstants.ICONS.ICON_TWITTER_GRAY;
    ICON_LINKEDIN_GRAY: string = SharedConstants.ICONS.ICON_LINKEDIN_GRAY;
    LOGO_GRAY: string = SharedConstants.ICONS.LOGO_GRAY;


    constructor(
    ) {
        console.log(this.color);
    }
}

