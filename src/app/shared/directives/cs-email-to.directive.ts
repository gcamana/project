import { Directive, Input, HostListener } from '@angular/core';
@Directive({
    selector: '[csEmailTo]'
})
export class CsEmailToDirective {
    @Input('csEmailTo') email: string;
    @Input() subject: string;
    @Input() body: string = 'BODY';
    @HostListener('click')
    emailTo(): void {
        let mailto = `mailto:${this.email}`;
        if (this.subject) mailto += `?subject=${this.subject}`;
        if (this.body) mailto += (!this.subject ? '?' : '&') + `body=${this.body}`;

        window.open(mailto, "_self");
    }
}