import { Component, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';

@Component({
    selector: 'cs-chart-line',
    templateUrl:'./cs-chart-line.component.html',
    styleUrls: ['cs-chart-line.component.scss']
})

export class CsChartLineComponent implements OnInit {
    options: any = {};
    chart: any;
    data: any;
    xAxisCategories: any = [];
    yAxisPercentage: any = [];
    fakeData = [
        { "percentage": "10", "anio": "2012" },
        { "percentage": "22", "anio": "2013" },
        { "percentage": "10", "anio": "2014" },
        { "percentage": "48", "anio": "2015" },
        { "percentage": "40", "anio": "2016" },
        { "percentage": "95", "anio": "2017" }
    ];

    optionsSelect = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    constructor() {
        this.fakeData.forEach(data => {
            this.xAxisCategories.push(data.anio);
            this.yAxisPercentage.push(parseFloat(data.percentage));
        });

    }

    ngOnInit() {
        if (this.xAxisCategories && this.yAxisPercentage) {
            this.buildChart();
        }
    }

    ngAfterViewInit(){

    }

    buildChart() {
        this.options = {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ' '
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: this.xAxisCategories
            },
            yAxis: {
                title: {
                    text: 'Porcentaje'
                },
                tickInterval: 25,
                labels: {
                    formatter: function () {
                        return this.value + ' %';
                    }
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true
                }
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'valor',
                data: this.yAxisPercentage,
            }]
        }
    }
}