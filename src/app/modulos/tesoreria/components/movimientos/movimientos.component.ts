import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MovimientosService } from '../movimientos/movimientos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedConstants } from 'app/shared/shared.constants';

@Component({
    selector: 'movimientos',
    templateUrl: './movimientos.component.html',
    styleUrls: ['./movimientos.component.css'],
    providers: [MovimientosService]
})

export class MovimientosComponent {
    @ViewChild('modalFiltroIngresos') modalFiltroIngresos;
    @ViewChild('modalFiltroEgresos') modalFiltroEgresos;
    public token = sessionStorage.getItem('token');
    public estudiantes = [];
    public colaboradores = [];
    public listYears   = [];
    /****************NG MODEL****************/
    public proggres_ingresos = false;
    public proggres_egresos = false;
    public searchIngresos = '';
    public searchEgresos = '';
    public filtroYear     = null;
    public filtroSede     = null;
    public filtroPrograma = null;
    public filtroGrado    = null;
    public filtroAula     = null;
    public _estu_selected = null;
    public flg_empty_ingresos = true;
    public flg_empty_egresos = true;
    public flg_empty_colaboradores = true;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _movimientosService: MovimientosService
    ){
        
    }
    
    ngOnInit(){
        this.getYearsConfig();
    }

    openModalIngresos(){
        this.modalFiltroIngresos.nativeElement.className = 'modal fade show in';
    }

    closeModalIngresos(){
        this.modalFiltroIngresos.nativeElement.className = 'modal fade';
    }

    openModalEgresos(){
        this.modalFiltroEgresos.nativeElement.className = 'modal fade show in';
    }

    closeModalEgresos(){
        this.modalFiltroEgresos.nativeElement.className = 'modal fade';
    }
    getEstudiantes(){
        if((this.searchIngresos).length > 2){
            this.proggres_ingresos = true;
            var obj = {search   : this.searchIngresos,
                       sede     : this.filtroSede,
                       year     : this.filtroYear,
                       programa : this.filtroPrograma,
                       grado    : this.filtroGrado,
                       aula     : this.filtroAula,
                       token    : this.token};
            this._movimientosService.getEstudiantes(obj).subscribe(
                result => {
                    if(result.error == 2){
                        window.location.href = SharedConstants.links.SMILEDU;
                    }
                    this.estudiantes = result;
                    this.flg_empty_ingresos = (this.estudiantes.length == 0) ? true : false;
                    this.proggres_ingresos = false;
                }, 
                error => {
                    console.log(<any>error);
                }
            );
        } else{
            console.log('entra');
        }
    }

    getColaboradores(){
        if((this.searchEgresos).length > 2){
            this.proggres_egresos = true;
            var obj = {search   : this.searchEgresos, token : this.token};        
            this._movimientosService.getColaboradores(obj).subscribe(
                result => {
                    this.colaboradores = result;
                    this.flg_empty_egresos = (this.colaboradores.length == 0) ? true : false;
                   this.proggres_egresos = false;
                }, 
                error => {
                   this.proggres_egresos = false;
                    console.log(<any>error);

                }
          );
        } else{
            console.log('entra');
        }
      }
    

    getYearsConfig(){
        var obj = {sede : null, token : this.token};
        this._movimientosService.getYears(obj).subscribe(
            result => {
                this.listYears = result;
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }
    
    goToDetalleIngresos(estu){
        var permiso = 'ingresos';
        //this._router.navigate(['/tesoreria',  { outlets: { mod : [permiso] } } ]);
        this._router.navigate(['/tesoreria/ingresos/'+estu]);
    }

    goToDetalleEgresos(colab){
        var permiso = 'ingresos';
        //this._router.navigate(['/tesoreria',  { outlets: { mod : [permiso] } } ]);
        this._router.navigate(['/tesoreria/egresos/'+ colab]);
    }

    getSedesByYear(){
      console.log(this.filtroYear);
    }
    
}

/*export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. 
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}*/