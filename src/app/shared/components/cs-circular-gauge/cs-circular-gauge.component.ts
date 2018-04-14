import { Component, ViewEncapsulation, ViewChild, Input, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'cs-circular-gauge-component',
    template: `
    <div *ngIf="state" class="cs-gauge-state" [ngClass]="stateClass"></div>
    <chart [options]="options"></chart>
    `,
    styleUrls: ['cs-circular-gauge.component.scss']
})

export class CsCircularGaugeComponent {
    options: any = {};
    @Input() values: any;
    @Input() red: number;
    @Input() orange: number;
    @Input() ini: number = 0;
    @Input() fin: number = 100;
    @Input() green: number = this.fin;
    @Input() labelsDistance: number;
    @Input() borderWidth: number = 20;
    @Input() state: boolean = true;
    @Input() dialBaseWidth: number = 10;
    @Input() dialStrokeWidth: number = 6;
    @Input() dialBorderWidth: number = 4;
    @Input() dialRadius: string = '74%';
    @Input() tipo_g: string = 'C';

    stateClass: string = ' ';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnChanges() {
        this.setOptionsGauge();
    }

    ngAfterViewInit() {
        this.setOptionsGauge();
    }

    setOptionsGauge() {
        if(this.tipo_g == 'C'){
            this.options = {
                chart: {
                    type: 'gauge',
                    margin: [0, 0, 0, 0],
                    size:"100%",
                    backgroundColor: 'transparent',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    dataLabels: false
                },
                title: '',
                pane: {
                    startAngle: -105,
                    endAngle: 105,
                    background: [{
                        borderWidth: 0,
                        backgroundColor: 'transparent'
                    }]
                },
                credits: {
                    enabled: false
                },

                yAxis: {
                    min: this.ini,
                    max: this.fin,
                    minorTickInterval: 'auto',
                    minorTickWidth: 0,
                    minorTickLength: 100,
                    minorTickPosition: 'inside',
                    minorTickColor: '#8A8A8A',
                    tickPixelInterval: 0,
                    fontSize: 16,
                    lineWidth: 0,
                    tickWidth: 0,
                    tickPosition: 'inside',
                    tickLength: 0,
                    tickColor: '#8A8A8A',
                    tickPositions: (this.green == this.fin)?[this.red, this.orange]:[this.red, this.orange, this.green],

                        plotBands: [{
                            from: this.ini,
                            to: this.red,
                            color: '#FF3504',
                            borderWidth: this.borderWidth,
                            borderColor: '#FF3504',
                            innerRadius: '100%',
                            thickness: 100

                        }, {
                            from: this.red,
                            to: this.orange,
                            color: '#FFC324',
                            borderWidth: this.borderWidth,
                            borderColor: '#FFC324',
                            innerRadius: '100%',
                            zIndex: 1,
                            className: 'cs-orange-plot'
                        }, {
                            from: this.orange,
                            to: this.green,
                            color: '#43ACA1',
                            borderWidth: this.borderWidth,
                            borderColor: '#43ACA1',
                            innerRadius: '100%',
                        }, {
                            from: this.green,
                            to: this.fin,
                            color: '#43ACA1',
                            borderWidth: this.borderWidth,
                            borderColor: '#43ACA1',
                            innerRadius: '100%',
                        }],
                        labels: {
                            distance: this.labelsDistance || -16,
                        },
                    },

                    tooltip: {
                        enabled: false
                    },
                    plotOptions: {
                        gauge: {
                            borderColor: 'transparent',
                            borderWidth: this.borderWidth,
                            radius: 100,
                            innerRadius: '100%',
                            dataLabels: {
                                y: 10,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    series: [{
                        name: 'Logro',
                        data: [this.values],
                        tooltip: {
                            valueSuffix: '%',
                            enabled: false
                        },
                        dial: {
                            backgroundColor: '#8A8A8A',
                            baseLength: '1%',
                            baseWidth: this.dialBaseWidth,
                            borderColor: '#8A8A8A',
                            borderWidth: this.dialBorderWidth,
                            radius: this.dialRadius,
                            rearLength: 0,
                            topWidth: 1,
                            y: 10
                        },
                        dataLabels: {
                            formatter: function () {
                                return '<span style="color:gray; font-size:18px;">' + this.y + ' %</span><br/>'
                            },
                        },
                    }]
                };
        }else{
            this.options = {
                chart: {
                    type: 'gauge',
                    margin: [0, 0, 0, 0],
                    size:"100%",
                    backgroundColor: 'transparent',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    dataLabels: false
                },
                title: '',
                pane: {
                    startAngle: -105,
                    endAngle: 105,
                    background: [{
                        borderWidth: 0,
                        backgroundColor: 'transparent'
                    }]
                },
                credits: {
                    enabled: false
                },

                yAxis: {
                    min: this.ini,
                    max: this.fin,
                    minorTickInterval: 'auto',
                    minorTickWidth: 0,
                    minorTickLength: 100,
                    minorTickPosition: 'inside',
                    minorTickColor: '#8A8A8A',
                    tickPixelInterval: 0,
                    fontSize: 16,
                    lineWidth: 0,
                    tickWidth: 0,
                    tickPosition: 'inside',
                    tickLength: 0,
                    tickColor: '#8A8A8A',
                    tickPositions: (this.green == this.fin)?[this.red, this.orange]:[this.red, this.orange, this.green],

                    plotBands: [{
                        from: this.ini,
                        to: this.green,
                        color: '#43ACA1',
                        borderWidth: this.borderWidth,
                        borderColor: '#43ACA1',
                        innerRadius: '100%',
                        thickness: 100

                    }, {
                        from: this.green,
                        to: this.orange,
                        color: '#43ACA1',
                        borderWidth: this.borderWidth,
                        borderColor: '#43ACA1',
                        innerRadius: '100%',
                        zIndex: 1,
                        className: 'cs-orange-plot'
                    }, {
                        from: this.orange,
                        to: this.red,
                        color: '#FFC324',
                        borderWidth: this.borderWidth,
                        borderColor: '#FFC324',
                        innerRadius: '100%',
                        zIndex: 1,
                        className: 'cs-orange-plot_1'
                    }, {
                        from: this.red,
                        to: this.fin,
                        color: '#FF3504',
                        borderWidth: this.borderWidth,
                        borderColor: '#FF3504',
                        innerRadius: '100%',
                    }],
                    labels: {
                        distance: this.labelsDistance || -16,
                        fontSize: "8px"
                    },
                },

                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    gauge: {
                        borderColor: 'transparent',
                        borderWidth: this.borderWidth,
                        radius: 100,
                        innerRadius: '100%',
                        dataLabels: {
                            y: 10,
                            borderWidth: 0,
                            useHTML: true,
                        }
                    }
                },
                series: [{
                    name: 'Logro',
                    data: [this.values],
                    tooltip: {
                        valueSuffix: '%',
                        enabled: false
                    },
                    dial: {
                        backgroundColor: '#8A8A8A',
                        baseLength: '1%',
                        baseWidth: this.dialBaseWidth,
                        borderColor: '#8A8A8A',
                        borderWidth: this.dialBorderWidth,
                        radius: this.dialRadius,
                        rearLength: 0,
                        topWidth: 1,
                        y: 10
                    },
                    dataLabels: {
                        formatter: function () {
                            return '<span style="color:gray; font-size:18px;">' + this.y + ' %</span><br/>'
                        },
                    },
                }]
            };
        }

        this.setGaugeState();
        this.tweakSvg();

        try {
            document.querySelector('.highcharts-gauge-series .highcharts-pivot')["style"].strokeWidth = `${this.dialStrokeWidth}` + 'px';
        } catch (error) {

        }
        this._changeDetectorRef.detectChanges();
    }

    tweakSvg() {
        let svg;
        svg = document.getElementsByTagName('svg');
        if (svg.length > 0) {
            for (var i = 0; i < svg.length; i++) {
                let path = svg[i].getElementsByTagName('path');
                if (path.length > 1) {
                    // First path is gauge background
                    for (var j = 0; j < path.length; j++) {
                        path[j].setAttributeNS(null, 'stroke-linejoin', 'round');
                        try {
                            svg[i].querySelector('.cs-orange-plot').setAttributeNS(null, 'stroke-linejoin', 'bevel');
                            svg[i].querySelector('.cs-orange-plot_1').setAttributeNS(null, 'stroke-linejoin', 'bevel');
                            svg[i].querySelector('.highcharts-axis-labels').setAttributeNS(null, 'opacity', '0.5');
                        } catch (error) {
                        }
                    }
                }
            }
        }
    }

    setGaugeState() {

        if(this.tipo_g == 'C'){
            if (this.values > this.ini && this.values <= this.red) {
                this.stateClass = 'red'
            } else if (this.values > this.red && this.values <= this.orange) {
                this.stateClass = 'orange'
            } else {
                this.stateClass = 'green'
            }
        }else{
            if (this.values > this.ini && this.values <= this.orange) {
                this.stateClass = 'green'
            } else if (this.values > this.red && this.values <= this.orange) {
                this.stateClass = 'orange'
            } else {
                this.stateClass = 'red'
            }
        }

        this._changeDetectorRef.detectChanges();
    }
}