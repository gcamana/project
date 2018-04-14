import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'cs-trend-table',
    templateUrl: 'cs-trend-table.component.html',
    styleUrls: ['cs-trend-table.component.scss']
})

export class CsTrendTableComponent {
    @Input() value       : number;
    @Input() variation   : number;
    @Input() trendFlag   : number;
    @Input() unidad_med  : string = '%';
    @Input() red         : number;
    @Input() orange      : number;
    @Input() flgCreasing : string;

    stateClass: string = '';
    textClass: string = '';
    trendIcon: string = 'trending_flat';

    // 0 : down
    // 1 : up
    // 2 : win copita
    // default : flat

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngAfterViewInit() {
        this.setTrend(this.trendFlag)
        this.setTrendState();
        this._changeDetectorRef.detectChanges();
    }

    ngOnChanges() {
        this.setTrend(this.trendFlag);
    }

    setTrend(flag) {
        switch (flag) {
            case 0:
                this.trendIcon = "trending_down";
                this.textClass = 'red';
                break;
            case 1:
                this.trendIcon = "trending_up";
                this.textClass = 'green';
                break
            case 2:
                //svg
                this.trendIcon = "cup";
                this.textClass = 'cup';
                break
            default:
                this.trendIcon = "trending_flat";
                this.textClass = 'orange';
                break;
        }
    }

    setTrendState() {
        if(this.flgCreasing == 'C'){
            if (this.value > 0 && this.value <= this.red) {
                this.stateClass = 'red';
            } else if (this.value > this.red && this.value <= this.orange) {
                this.stateClass = 'orange';
            } else {
                this.stateClass = 'green';
            }
        } else {
            if(this.value > this.orange){
                this.stateClass = 'green';
            } else if(this.value <= this.orange && this.value > this.red) {
                this.stateClass = 'orange';
            } else{
                this.stateClass = 'red';
            }
        }

        this._changeDetectorRef.detectChanges();
    }
}