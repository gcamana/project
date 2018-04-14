import { Component, OnInit, AfterViewInit, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'cs-bank-chart',
    template: `<chart [options]="options"></chart>`
})

export class CsBankChartComponent implements AfterViewInit, OnChanges {
    @Input() egresos?:any;
    @Input() ingresos?:any;
    @Input() category?:any;
    @Input() height: number = 250;

    options: any = {};

    constructor() { }

    ngAfterViewInit() {
        this.buildChart();
    }

    ngOnChanges() {
        this.buildChart();
    }

    buildChart() {
        console.log(this.category);
        this.options = {
            chart: {
                type: 'spline',
                height: this.height,
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: this.category
            },
            yAxis: {
                title: {
                    text: null
                },
                min: 0,
                labels: {
                    formatter: function () {
                        return `S/ ${this.value}`;
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true,
                borderWidth: 0,
                backgroundColor: "#ffffff"
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    name: this.egresos.name,
                    color: "#FF3504",
                    lineWidth: 1,
                    lineColor: '#FF3504',
                    marker: {
                        symbol: 'circle'
                    },
                    data: this.egresos.data,
                    showInLegend: false
                }, {
                    name: this.ingresos.name,
                    color: "#009688",
                    lineColor: '#009688',
                    lineWidth: 1,
                    marker: {
                        symbol: 'circle'
                    },
                    data: this.ingresos.data,
                    showInLegend: false
                }
            ]
        }
    }
}