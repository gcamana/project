import { NgModule } from '@angular/core';

import { HighlightDirective } from './highlight.directive';
import { CsEmailToDirective } from './cs-email-to.directive';
import { CsCallToDirective } from './cs-call-to.directive';
import { CsFullScreenDirective } from './cs-full-screen.directive';
import { CsOnlyNumberDirective } from './cs-only-number.directive';

@NgModule({
    declarations: [
        HighlightDirective,
        CsCallToDirective,
        CsEmailToDirective,
        CsFullScreenDirective,
        CsOnlyNumberDirective
    ],
    exports: [
        HighlightDirective,
        CsCallToDirective,
        CsEmailToDirective,
        CsFullScreenDirective,
        CsOnlyNumberDirective
    ]
})
export class DirectivesModule { }
