import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'cs-trend',
    templateUrl: 'cs-trend.component.html',
    styleUrls: ['cs-trend.component.scss']
})

export class CsTrendComponent {
    @Input() value       : number;
    @Input() trendFlag   : number;
    @Input() red         : number;
    @Input() orange      : number;
    @Input() flgCreasing : string;
    @Input() onlyColor   : boolean;
    @Input() color       : string;
    stateClass: string;
    trendIcon: string = 'trending_flat';

    // 0 : down
    // 1 : up
    // 2 : win copita
    // default : flat

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }
    ngOnInit() { }

    ngAfterViewInit() {
        this.setTrend(this.trendFlag)
        this.setTrenState();
        this._changeDetectorRef.detectChanges();
    }
    
    ngOnChanges(){
        this.setTrenState();
    }

    setTrend(flag) {
        switch (flag) {
            case 0:
                this.trendIcon = "trending_down";
                break;
            case 1:
                this.trendIcon = "trending_up";
                break
            case 2:
                //svg
                this.trendIcon = "cup";
                break
            default:
                this.trendIcon = null;
                break;
        }
    }

    setTrenState() {
        if(this.onlyColor){
            this.stateClass = this.color;
        } else{
            if(this.flgCreasing == 'C'){
                if (this.value > 0 && this.value <= this.red) {
                    this.stateClass = 'red';
                } else if (this.value > this.red && this.value <= this.orange) {
                    this.stateClass = 'orange';
                } else {
                    this.stateClass = 'green';
                }
            } else {
                if(this.value < this.orange){
                    this.stateClass = 'green';
                } else if(this.value <= this.orange && this.value > this.red) {
                    this.stateClass = 'orange';
                } else{
                    this.stateClass = 'red';
                }
            }
        }
        this._changeDetectorRef.detectChanges();
    }
}