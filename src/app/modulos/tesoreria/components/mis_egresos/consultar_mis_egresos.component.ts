import { Component,ViewChild } from '@angular/core';
import { ConsultarMisEgresosService } from '../mis_egresos/consultar_mis_egresos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as jsPDF from 'jspdf';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../../objetos/Usuario';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

export interface ElementCME {
    monto:any;
    estado:any;
    fecha:any;
    desc_concepto:any;
    observacion:any;
    id_movimiento:any;
    desc_lugar_pago:any;
}

@Component({
    selector: 'consultar_mis_egresos-tag',
    templateUrl: './consultar_mis_egresos.component.html',
    styleUrls: ['consultar_mis_egresos.component.css'],
    providers: [ConsultarMisEgresosService]
})

export class ConsultarMisEgresosComponent{
    public usuario: Usuario;
    public sede_sesion;
    public usuario_sesion;
    public nombre_usuario;
    //DATOS Consultar
    public egresos;
    public ticket;
    public m_desc_concepto;
    public p_nid_persona;
    public m_id_movimiento;
    public datosTicket;
    public fecha_inicio;
    public fecha_fin;
    public fecha_inicio_parse;
    public fecha_fin_parse;

    displayedColumnsCME = ['monto','estado','fecha','desc_concepto','observacion','opciones'];
    dataSourceCME = new MatTableDataSource<ElementCME>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _consultarMisEgresosService: ConsultarMisEgresosService,
        private _snackBar : MatSnackBar,
        private _userService: UserService,
        dateAdapter: DateAdapter<NativeDateAdapter>

    ){
        var root = this;
        setTimeout(function () {
            root.sede_sesion = _userService.usuario.sede;
            root.usuario_sesion = _userService.usuario.persona;
            root.nombre_usuario = _userService.usuario.nombre;
            root.p_nid_persona = _userService.usuario.persona;
        }, 1000);

         dateAdapter.setLocale('es-ES');

        this.egresos = [];
        this.ticket = []; 
        this.fecha_inicio = "'inicio'";
        this.fecha_fin = "'fin'";
        this.fecha_inicio_parse = "'inicio'";
        this.fecha_fin_parse = "'fin'";
    }
    ngOnInit(){
        var root = this;
        setTimeout(function () {
            root.mostrar();
        }, 1000);
    }
    mostrar(){
        this._consultarMisEgresosService.getEgresos(this.p_nid_persona, this.fecha_inicio_parse, this.fecha_fin_parse).subscribe(
            result => {
                    this.egresos = result;
                    this.dataSourceCME = new MatTableDataSource<ElementCME>(result);
                    this.dataSourceCME.paginator = this.paginator;
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }
    reiniciarFiltro(){
        this.fecha_inicio = "'inicio'";
        this.fecha_fin = "'fin'";
        this.fecha_inicio_parse = "'inicio'";
        this.fecha_fin_parse = "'fin'";
        this.mostrar();
    }
    

    getFiltro(){
        console.log(this.fecha_inicio);
        console.log(this.fecha_fin);
        
        this.fecha_inicio_parse = this.parseDate(this.fecha_inicio);
        this.fecha_fin_parse = this.parseDate(this.fecha_fin);
        
        

        if(this.fecha_inicio_parse > this.fecha_fin_parse){
            this.notificacion("Error, la fecha de inicio debe ser posterior a la fecha de fin.", "CERRAR");
        }
        /*else if(this.fecha_inicio_parse == this.fecha_fin_parse){
            this.notificacion("Error, la fecha de inicio debe ser diferente a la fecha de fin.", "CERRAR");
        }*/
        else{
            this.mostrar();
        }
    }

    parseDate(fecha) {
        var yyyy = fecha.getFullYear().toString();
        var mm = (fecha.getMonth() + 1).toString();
        var dd = fecha.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + yyyy;
    }
    
    verDetalles(_desc_concepto, _m_id_movimiento){
        this.m_desc_concepto = _desc_concepto;
        this.m_id_movimiento = _m_id_movimiento;

        this._consultarMisEgresosService.getTicket(this.p_nid_persona, this.m_id_movimiento).subscribe(
            result => {
                if(result.length!=0){
                    this.ticket = result;
                    //console.log(this.ticket);
                } else {
                    console.log('Ocurrio un problema GETTICKET');
                } 
            }, 
            error => {
                console.log(<any>error);
            }
        );
        
    }

   

    crearTicket(){
        const doc = new jsPDF();
        //Horizontal,Vertical
        doc.text('SEDE: '       +this.ticket.sede          ,80,50);
        doc.text('RUC: '        +this.ticket.ruc           ,40,60);
        doc.text('Fecha: '      +this.ticket.fecha         ,40,70);
        doc.text('Hora: '       +this.ticket.hora          ,40,80);
        doc.text('Usu. Reg: '   +this.ticket.usu_reg       ,40,90);
        doc.text(''             +this.ticket.desc_concepto ,40,110);
        doc.text(''             +this.ticket.monto         ,170,110);
        doc.text('TOTAL: '                                 ,40,130);
        doc.text(''             +this.ticket.monto         ,170,130);
        doc.text('Colaborador: '+this.ticket.nombre        ,40,160);
        
        doc.save('ticket.pdf');
    }
    
    notificacion(msj, accion){
        var duration = 3000;
        this._snackBar.open(msj,accion,{duration: duration});
    }

}

