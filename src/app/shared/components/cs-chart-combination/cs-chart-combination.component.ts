import { Component, Input} from '@angular/core';

@Component({
    selector    : 'cs-chart-combination',
    templateUrl : './cs-chart-combination.component.html',
    styleUrls   : ['cs-chart-combination.component.scss']
})

export class CsChartCombinationComponent {
    options: any = {};
    chart: any;
    @Input('dataGrafig')  dataGrafig: any;
    private valor_actual   :any[] = [];
    private valor_meta     :any[] = [];
    private fecha_medicion :any[] = [];
    private color          :any[] = [];

    
    constructor() {}

    ngOnChanges() {
        if(this.dataGrafig !== undefined) {
            let act_ant         = this.dataGrafig.actual_and_anterior;
            this.valor_meta     = [];
            this.valor_actual   = [];
            this.fecha_medicion = [];
            this.color          = [];
            for(let i in act_ant) {
                let valor_actual = parseInt(act_ant[i].valor_actual)
                this.valor_actual.push(valor_actual);
                this.fecha_medicion.push(act_ant[i].fecha_medicion);
                this.valor_meta.push(parseInt(act_ant[i].valor_meta));
                if(valor_actual <= act_ant[i].zona_riesgo) {
                    this.color.push('#FF3504');
                }else if(valor_actual > act_ant[i].zona_riesgo && valor_actual <= act_ant[i].valor_amarillo) {
                    this.color.push('#FFC324');
                }else  {
                    this.color.push('#43ACA1');
                }
            }
            if(this.dataGrafig.year_actual == this.dataGrafig.year) {
                this.valor_meta.push(this.dataGrafig.valor_meta);
                this.fecha_medicion.push(this.dataGrafig.fecha_actual);
            }
            this.buildChart();
        }
    }
    ngAfterViewInit() {
        this.buildChart();
    }

    buildChart() {
        this.options = {
            colors: this.color,
            title: {
                text: ''
			},
			legend: {
				enabled: false
			},
            xAxis: {
				categories: this.fecha_medicion,
				lineWidth: 13,
				lineColor:'#fff',
				offset: -12,
				tickWidth: 0,
				title: {
					enabled: true,
					text: '',
				},
				labels: {
					y: 30
				}
            },
            yAxis: {
				title: {
					enabled: true,
					text: '',
				},
				labels: {
					y: 15,
					x: 15
				}
            },
            labels: {
                items: [{
                    html: '',
                }]
            },
            plotOptions: {
                series: {
					lineWidth: 3,
					color:'#3b938b',
					lineColor:'#E2E2E2',
					allowPointSelect: true,
					borderRadius: 10,
					maxPointWidth: 20,
					states: {
                        hover: {
                            enabled: false
						}
					}
                }
            },
            series: [{
                type: 'column',
                name: 'Sedes',
                colorByPoint: true,
                //barras
				data: this.valor_actual,
            }, {
                type: 'spline',
                name: 'Meta',
                //lines
                data: this.valor_meta,
                marker: {
                    lineWidth: 5,
                    lineColor: '#3b938b',
					fillColor: '#3b938b'
                }
            }]
        }
    }
}