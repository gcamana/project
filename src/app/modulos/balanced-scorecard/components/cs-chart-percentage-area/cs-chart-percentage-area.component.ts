import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-chart-percentage-area',
    template: `<chart [options]="options"></chart>`,
    styleUrls:['cs-chart-percentage-area.component.scss']
})

export class CsChartPercentageAreaComponent {

    options: any = {};
    private categorias   :any[] = [];
    private rojo         :any[] = [];
    private amarillo     :any[] = [];
    private actual       :any[] = [];
    private meta         :any[] = [];
    private zona_confort :any[] = [];
    @Input('dataGrafig') dataGrafig: any;

    constructor() { }

    ngOnChanges() {
        if(this.dataGrafig != undefined && this.dataGrafig.categorias != undefined) {
            this.categorias   = this.dataGrafig.categorias;
            this.rojo         = this.dataGrafig.rojo;
            this.amarillo     = this.dataGrafig.amarillo;
            this.actual       = this.dataGrafig.actual;
            this.meta         = this.dataGrafig.meta;
            this.zona_confort = this.dataGrafig.zona_confort;
            this.buildChart();
        }
    }

    ngAfterViewInit() {
        this.buildChart();
    }

    buildChart() {

        let type        = this.categorias.length > 1 ? 'area' : 'column';
        let plotOptions = this.categorias.length > 1 ? {area: {fillOpacity: 1,dataLabels: {enabled: true}}} : 
                                                       {column: { grouping: false, shadow: false, borderWidth: 0, dataLabels: {enabled: true} }};
        this.options = {
            chart: {
                type: type/*,
                zoomType: 'xy'*/
            },
            title: {
                text: ''
            },/*
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1
            },*/
            xAxis: {
                categories: this.categorias
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: plotOptions,
            credits: {
                enabled: false
            },
            series: [{
                name: (this.dataGrafig.tipo_indi == 'C' ? 'Zona óptima': 'Zona de criticidad'),
                color: (this.dataGrafig.tipo_indi == 'C' ? '#43ACA1'    : '#FF3504'),
                data: (this.dataGrafig.tipo_indi == 'C' ? this.zona_confort : this.rojo)
            }, {
                name: 'Zona vulnerable',
                data: this.amarillo,
                color: '#FFC324'
            }, {
                name:  (this.dataGrafig.tipo_indi == 'C' ? 'Zona de criticidad' : 'Zona óptima'),
                data:  (this.dataGrafig.tipo_indi == 'C' ? this.rojo            : this.zona_confort),
                color: (this.dataGrafig.tipo_indi == 'C' ? '#FF3504'            : '#43ACA1')
            }, {
                name: 'Actual',
                type: 'line',
                color: '#FEFEFE',
                data: this.actual
            }, {
                name: 'Meta',
                type: 'line',
                color: '#1E1E1E',
                data: this.meta
            }]
        }
    }
}