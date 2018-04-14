import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-chart-spline',
    template: `<chart [options]="options || {}"></chart>`
})

export class CsChartSplineComponent {
    options: any = {};
    @Input() move_chart;
    yAxisLabels = ['VENCIDO', 'PENDIENTE', 'ATRASADO', 'REGULAR', 'PRONTO PAGO', null];
    @Input() role;
    @Input() height: number = 250;
    yAxis = {};
    constructor() { }

    ngAfterViewInit() {
        this.buildChart();
    }
    ngOnChanges() {
        this.buildChart();
    }

    buildChart() {
        let variables = this;
        this.move_chart.categorias = this.move_chart.categorias || [];
        this.move_chart.last_move = this.move_chart.last_move || [];

        this.options = {
            chart: {
                height: this.height,
                type: 'spline',
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                title: {
                    text: null
                },
                categories: this.move_chart.categorias
            },
            yAxis: {
                title: {
                    text: null
                },
                min: 0
            },
            tooltip: {
                formatter: function () {
                    return this.point.info;
                },
                borderWidth: 0,
                backgroundColor: "#ffffff"
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                },
                series: {
                    lineWidth: 1,
                    color: '#3b938b',
                    lineColor: '#009688',
                }
            },

            series: [
                {
                    name: 'Movimientos',
                    data: this.move_chart.last_move,
                    showInLegend: false
                }
            ]
        }
        /*if(this.role == 'ESTUDIANTE'){
            this.options.yAxis.labels = {
                formatter: function() {
                    return variables.yAxisLabels[this.value];
                }
            };
        } else{
            delete this.options.yAxis.labels;
        }*/
    }
}