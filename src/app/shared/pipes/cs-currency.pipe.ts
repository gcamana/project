import { Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'csCurrency'
})
export class CsCurrencyPipe {

    transform(value: any, digits: any = 0) {
        if (value === 0) digits = 0;
        digits = `.${digits}-${digits}`;

        try {
            if (!value) value = 0;
            if (typeof value == 'string') value = Number(value);

            // TODO: review locale 'en-US' correct value for CurrencyPipe
            return new CurrencyPipe('en-US').transform(value, 'USD', true, digits);
        } catch (e) {
            return new CurrencyPipe('en-US').transform(0, 'USD', true, digits);
        }
    }

}