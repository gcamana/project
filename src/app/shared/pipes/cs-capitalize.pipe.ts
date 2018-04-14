import { Injectable, Pipe } from '@angular/core';

@Pipe({
    name: 'csCapitalize'
})
@Injectable()

export class CsCapitalizePipe {
    transform(text: string, args: string = '') {
        if (!text || typeof (text) !== 'string') return '';

        let value = text.toLowerCase();
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        // if (args && args.equals('all')) return value.toUpperCase();
        return value;
    }
}