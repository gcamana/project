import { NgModule, Component, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class CsGhostComponentService {
    private _isLoading = new BehaviorSubject<Object>(false)
    public isLoading = this._isLoading.asObservable()
    public setLoading(isLoading: boolean, group: any = null) {
        this._isLoading.next({
            isLoading: isLoading,
            group: group
        })
    }
}

@Component({
    selector: 'ghost',
    host: { '[class.isLoading]': 'isLoading' },
    template: `<ng-content *ngIf="!isLoading"></ng-content>`,
    styles:[
        `
        .hide-ng-content {
            opacity: 0;
            visibility: hidden;
            width: 0;
            height: 0;
            transition: all .25s ease;
        }
        `
    ]
})

export class CsGhostComponent {
    @Input() group: any = null;
    public isLoading: boolean = true
    private isLoadingSubscription: Subscription
    private data: Object = {}
    public constructor(
        private _ghost: CsGhostComponentService
    ) {
        this.isLoadingSubscription = this._ghost.isLoading.subscribe(data => this.updateLoading(data))
    }

    public ngOnDestroy() {
        this.isLoadingSubscription.unsubscribe()
    }

    private updateLoading(data) {
        if (!data) {
            return
        }
        this.setData(data).process()
    }

    private setData(data: Object) {
        this.data = data
        return this
    }

    private process() {
        return this.group
            ? this.groupedLoading()
            : this.setLoading()
    }

    private groupedLoading() {
        return Array.isArray(this.data['group'])
            ? this.groupedByArray()
            : this.groupedByString()
    }

    private groupedByArray() {
        if (this.data['group'].indexOf(this.group) > -1) {
            return this.setLoading()
        }
    }

    private groupedByString() {
        if (this.data['group'] === this.group) {
            return this.setLoading()
        }
    }

    private setLoading() {
        this.isLoading = this.data['isLoading']
    }
}


