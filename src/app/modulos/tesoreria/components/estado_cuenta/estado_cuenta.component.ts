import { Component,ViewChild } from '@angular/core';
import { EstadoCuentaService } from '../estado_cuenta/estado_cuenta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';

export interface ElementCuenta {
    id_movimiento:any;
    monto:any;
    estado:any;
    _id_concepto:any;
    desc_cuota:any;
    fec_vencimiento:any;
    fecha_descuento:any;
    descuento_acumulado:any;
    fecha_pago:any;
    class:any;
    monto_final:any;
    monto_adelanto:any;
    monto_pendiente:any;
    mora_acumulada:any;
    lugar_pago:any;
    flg_lugar_pago:any;
}

@Component({
    selector: 'estado-cuenta-tag',
    templateUrl: './estado_cuenta.component.html',
    styleUrls: ['estado_cuenta.component.css'],
    providers: [EstadoCuentaService]
})

export class EstadoCuentaComponent{
    public usuario: Usuario;
    public sede_sesion;
    public usuario_sesion;
    public nombre_usuario;
    //DATOS ESTADO
    public hijos;
    public infohijos;
    public cod_familia;
    public nid_persona;
    public ano;
    public id_hijo;
    public nombre_hijo;
    public flagHijo;
    public flagCuota;
    public numDeuda;
    public cantDeuda;
    public flagMensaje;
    public flagMensaje1;

    displayedColumnsCuenta = ['desc_cuota','monto','fecha_descuento','descuento_acumulado','fec_vencimiento','mora_acumulada','monto_final','l_pago'];
    dataSourceCuenta = new MatTableDataSource<ElementCuenta>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _estadoCuentaService: EstadoCuentaService,
        private _userService: UserService
    ){

        var root = this;
        setTimeout(function () {
            root.sede_sesion = _userService.usuario.sede;
            root.usuario_sesion = _userService.usuario.persona;
            root.nombre_usuario = _userService.usuario.nombre;
            root.cod_familia    = _userService.usuario.cod_familiar;
        }, 1000);

        this.hijos        = [];
        this.infohijos    = []; 
        this.nid_persona  = null;
        this.id_hijo      = null;   //5257
        this.nombre_hijo  = null;
        this.flagHijo     = false;  //activa/desactiva datos del hijo
        this.flagCuota    = false;  //activa/desactiva datos de cuota
        this.numDeuda     = null;
        this.cantDeuda    = null;
        this.flagMensaje  = null;
    }
    ngOnInit(){
        this.ano = new Date().getFullYear();
        var root = this;

        setTimeout(function () {
            root.mostrarHijos();
            root.mostrarDetalleHijos();
        }, 1000);
    }

    cambiarAno(num){
        switch (num) {
            case 0:
                this.ano=this.ano-1;
                break;
            case 1:
                this.ano=this.ano+1;
                break;
        }
        this.mostrarDetalleHijos();
        this.getDeudas(this.id_hijo, this.ano);
    }

    //Cuando haces click en un hijo, se cambia el valor y se traen los valores.
    verHijo(_id_hijo,_nombre_hijo){
        this.flagHijo    = true;
        this.id_hijo     = _id_hijo;
        this.nombre_hijo = _nombre_hijo;

        this.mostrarDetalleHijos();
        this.getDeudas(this.id_hijo, this.ano);
    }


    getDeudas(hijo, ano){
        this._estadoCuentaService.getDeudas(hijo, ano).subscribe(
                    result => {
                            this.numDeuda=result[0].sin_pagar;
                            this.cantDeuda=result[0].sum_sin_pagar;
                            if(this.numDeuda==null||this.cantDeuda==null){
                                this.flagMensaje=false;
                            }
                            else{
                                this.flagMensaje=true;
                            }
                    }, 
                    error => {
                        console.log(<any>error);
                    }
                );
                
    }

    //Muestra los nombres de los hijos
    mostrarHijos(){
        this._estadoCuentaService.getHijos(this.cod_familia).subscribe(
            result => {
                    this.hijos = result;
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }

    //Muestra informacion de los pagos de los hijos y las deudas
    mostrarDetalleHijos(){
        this._estadoCuentaService.getDetalleHijos(this.id_hijo,this.ano).subscribe(
            result => {
                    this.infohijos = result;
                    this.dataSourceCuenta = new MatTableDataSource<ElementCuenta>(result);
                    this.dataSourceCuenta.paginator = this.paginator;
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }



}