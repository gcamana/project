import { NgModule } from "@angular/core";
import { CsCurrencyPipe } from "./cs-currency.pipe";
import { CsCapitalizePipe } from "./cs-capitalize.pipe";
import { CsTruncateTextPipe } from "./cs-truncate-text.pipe";

@NgModule({
    declarations: [
        CsCurrencyPipe,
        CsCapitalizePipe,
        CsTruncateTextPipe
    ],
    exports: [
        CsCurrencyPipe,
        CsCapitalizePipe,
        CsTruncateTextPipe
    ]
})
export class PipesModule { }