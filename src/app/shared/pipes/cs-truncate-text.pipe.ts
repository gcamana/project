import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class CsTruncateTextPipe implements PipeTransform {
    transform(value: string, args: string[]): string {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}

//USE IN PUG
// {{ str | truncate:[100] }} // or
// {{ str | truncate:[100, '...'] }} // or

// USE DIRECTAMENTE
// p {{ str.length > 100 ? (str | slice:0:100)+'...':(str)  }}