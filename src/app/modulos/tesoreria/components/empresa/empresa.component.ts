import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Empresa} from './empresa';
import {saveAs} from 'file-saver';



@Component({
    selector: 'empresa',
    templateUrl: './empresa.component.html',
    providers: [EmpresaService],
    styleUrls: ['empresa.component.css'],

})

export class EmpresaComponent{
    
    public checkboxValue:boolean;
    public empresaNombre:string;
    public empresaRuc:string;
    public empresaRazonSocial:string;
    public bancos;
    public clients;
    public empresas;
    public sedes;
    public empresaid;
    public nuevaEmpresa:Empresa;
    public nombreEmpresa;
    public concat;
    public parametrosexport;
    public bancosvalues;
    public archivoBancoimportado;
    public progrres_empresa=false;

    public offset = 0;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _empresaService: EmpresaService,
        private snackBar:MatSnackBar
            ){
        this.clients=[],
        this.empresas=[];
        this.bancos=[]; 
        this.sedes=[];  
        this.empresas=[];
        this.archivoBancoimportado=[];
 }
    ngOnInit(){
         this.getAllSedexEmpresa();
        // this.importarArchivo("banbif.txt");
    }

     generartxt(i) {

 /*     Date.prototype.yyyymmddy= function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};*/

    var mes = new Date();
    mes.getMonth();
    var dia = new Date();
    dia.getDay();
    var año = new Date();
    año.getFullYear();
    var fecha = año + '' + mes + '' + dia;
    var blob:Blob = new Blob([this.empresas[3].nombre], {type: 'text/plain;charset=utf-8'});
    console.log(blob);
    saveAs(blob,'parametrica' + fecha + 'emp' + i + '.txt');
   }


   prueba(){
    var concat="";
    var prueba=[{nombre:"a",id:"1"},{nombre:"b",id:"2"},{nombre:"c",id:"3"},{nombre:"d",id:"4"}];
    var prueba2=this.empresas;
    for(var i=0;i<prueba.length;i++){
       concat=concat+" "+prueba2[i].razonSocial+" "+prueba2[i].nombre+"";
    }
     console.log(concat);
   }

   setSedesEmpresa(banco,sede,empresa,nombreEmpresa,id_empresa){
    this.bancos = banco;
    this.sedes = sede.toString();
    this.empresaid = empresa;
    this.nombreEmpresa = nombreEmpresa;
    console.log(this.empresas);
    }
    getAllSedexEmpresa(){
     this._empresaService.getAllSedexEmpresa().subscribe(
            result => {
                  console.log(result);
                  this.empresas = result;
            },
            error => {
                console.log(<any>error);
            }
        )
}

    importarArchivo(archivo)
    {
        var archivobanco;
        switch(archivo){
              case 'Banco de Crédito del Perú': archivobanco = 'bcp.txt'; break;

              case 'Scotiabank': archivobanco = 'scotiabank.txt'; break;

              case 'Banco de Comercio': archivobanco = 'comercio.txt'; break;

              case 'Banco Interamericano de Finanzas':archivobanco= 'banbif.txt'; break;

              case 'Banco Continental': archivobanco = 'bbva.txt'; break;
        }
        var params={banco:archivobanco};
        this.snackBar.open('Movimientos Importados','',{duration:3000});
        this._empresaService.importarArchivo(params).subscribe(
            result => 
               {
                this.archivoBancoimportado=result;
               //console.log("xd:"+this.archivoBancoimportado[0].nombres);


        }
                 
               
            , 
            error => {
                console.log(<any>error);
            }
        )





    }


    getAllInfoBanco(banco)
    {  

          this.progrres_empresa = true;
            this.parametrosexport = {banco:banco, sede:this.sedes, empresa:this.empresaid};


     this._empresaService.getAllInfoBanco(this.parametrosexport).subscribe(
            result => 
               {

                   var infobanco=[];
                   infobanco=result;
               switch(banco)
              {
                case "Banco de Crédito del Perú": this.mostrarinfoBCP(infobanco); break;

                case "Scotiabank": this.mostrarinfoScotiabank(infobanco); break;

                case "Banco de Comercio": this.mostrarinfoBanComercio(infobanco); break;

                case "Banco Interamericano de Finanzas": this.mostrarinfoBanBif(infobanco); break;

                case "Banco Continental": this.mostrarinfoBBVA(infobanco); break;


              
            
              }

                this.generarTxt(this.concat);
                 this.progrres_empresa = false;

                 
                 /*+"  "+infobanco[i].cod_subconcepto_1+"  "+infobanco[i].val_subconcepto_1+"  "+
                 infobanco[i].cod_subconcepto_2+"  "+infobanco[i].val_subconcepto_2+"  "+infobanco[i].cod_subconcepto_3+"  "+infobanco[i].val_subconcepto_3+"  "+infobanco[i].cod_subconcepto_4+"  "+infobanco[i].val_subconcepto_4+"  "+
                 infobanco[i].cod_subconcepto_5+"  "+infobanco[i].val_subconcepto_5+"  "+infobanco[i].cod_subconcepto_6+"  "+infobanco[i].val_subconcepto_6+"  "+
                 infobanco[i].cod_subconcepto_7+"  "+infobanco[i].val_subconcepto_7+"  "+infobanco[i].cod_subconcepto_8+"  "+infobanco[i].val_subconcepto_8+"  "+
                 infobanco[i].num_cuenta_cliente+"  "+infobanco[i].tipo_identificacion+"  "+infobanco[i].cod_alumno_temp+"  "+infobanco[i].vacio+"\n";
*/
     }
    
   , 
            error => {
                console.log(<any>error);
            }
    
    )
}
    


    generarTxt(texto)
    {
    var blob = new Blob([texto], {type: "text/plain;charset=utf-8"});
 

     console.log(blob);
     
    
     saveAs(blob,'prueba.txt');
           
            
    }
                 
    mostrarinfoBCP(infobanco)
    {

        this.concat='';
        for(var i=0;i<infobanco.length;i++)
          {
             this.concat=this.concat+"DD19401128277"+this.rellenarCero(6)+infobanco[i].cod_alumno_temp+this.rellenarEspacios(40,infobanco[i].nombre_completo)+this.rellenarEspacios(30,infobanco[i].nombre_completo.slice(0,30))+infobanco[i].fecha_actual+infobanco[i].fecha_vencimiento+infobanco[i].monto+
                          this.rellenarCero(24)+'R'+this.rellenarCero(47)+'\n';
          }

    }



   mostrarinfoScotiabank(infobanco) {
        this.concat='';
        for(var i=0;i<infobanco.length;i++)
          {

             this.concat=this.concat+"D"+this.rellenarEspacios(14,'000000000000')+"001"+this.rellenarEspacios(15,infobanco[i].cod_banco)+this.rellenarEspacios(15,'')+this.rellenarEspacios(11,'')+"0"+"0000"+infobanco[i].nombres.slice(0,20)+this.rellenarEspacios(30,infobanco[i].desc_detalle_crono)+'01'+infobanco[i].monto_concepto.slice(1)+this.rellenarCero(65)+
                         infobanco[i].monto.slice(1)+infobanco[i].monto.slice(1)+this.rellenarCero(8)+this.rellenarCero(1)+this.rellenarCero(8)+infobanco[i].fecha_vencimiento+this.rellenarCero(3)+this.rellenarEspacios(15,'')+'*\n';
             
         }
                           console.log(this.concat);



               //  this.concat=this.concat.substring(9); 


   }     

    mostrarinfoBanBif(infobanco)
    {           

         this.concat='';


     for(var i=0;i<infobanco.length;i++)
          {

             this.concat=this.concat+this.rellenarCero(20)+this.rellenarEspacios(20,"0"+infobanco[i].cod_alumno_temp)+this.rellenarEspacios(20,infobanco[i].ape_pate_pers)+this.rellenarEspacios(20,infobanco[i].ape_mate_pers)+this.rellenarEspacios(20,infobanco[i].nom_persona)+"0001"+infobanco[i].fecha_emision+infobanco[i].fecha_vencimiento+infobanco[i].moneda+
                         this.rellenarEspacios(12,'')+this.rellenarEspacios(40,infobanco[i].desc_detalle_crono)+this.rellenarEspacios(60,'')+infobanco[i].flg_mora+'002'+infobanco[i].monto+this.rellenarCero(65)+'\n';
             
         }

         console.log(this.concat);


               //  this.concat=this.concat.substring(9); 


      }     
           
    mostrarinfoBanComercio(infobanco)
   {           

         this.concat='';


     for(var i=0;i<infobanco.length;i++)
          {

             this.concat=this.concat+'D'+infobanco[i].cod_servicio+'000'+this.rellenarEspacios(20,infobanco[i].cod_alumno_temp)+this.rellenarEspacios(40,infobanco[i].ape_pate_pers+' '+infobanco[i].ape_mate_pers+' '+infobanco[i].nom_persona)+this.rellenarCero(18)+'-2'+this.rellenarCero(20)+infobanco[i].fecha_emision+infobanco[i].fecha_vencimiento+infobanco[i].moneda_comercio+
                        infobanco[i].monto_comercio+this.rellenarCero(50)+this.rellenarCero(14)+this.rellenarCero(180)+this.rellenarCero(14)+'\n'; //se agrego 14 ceros para que coincida con ejemplo enviado 
             
         }

         console.log(this.concat);


               //  this.concat=this.concat.substring(9); 


    }

    mostrarinfoBBVA(infobanco)
    {           

         this.concat='';

        var cont=0;

     for(var i=0;i<infobanco.length;i++)
          {

             this.concat=this.concat+infobanco[i].tipo_registro+this.rellenarEspacios(30,infobanco[i].nombres)+this.rellenarEspacios(14,'0'+infobanco[i].cod_alumno_temp)+infobanco[i].fecha_vencimiento_aux+this.rellenarEspacios(26,infobanco[i].desc_detalle_crono)+infobanco[i].fecha_vencimiento_aux+
             infobanco[i].fecha_bloqueo+infobanco[i].periodo+infobanco[i].monto+infobanco[i].total+infobanco[i].info_adicional+infobanco[i].cod_subconcepto_1+infobanco[i].val_subconcepto_1+infobanco[i].cod_subconcepto_2+infobanco[i].val_subconcepto_2+
             infobanco[i].cod_subconcepto_3+infobanco[i].val_subconcepto_3+infobanco[i].cod_subconcepto_4+infobanco[i].val_subconcepto_4+infobanco[i].cod_subconcepto_5+infobanco[i].val_subconcepto_5+infobanco[i].cod_subconcepto_6+infobanco[i].val_subconcepto_6+
             infobanco[i].cod_subconcepto_7+infobanco[i].val_subconcepto_7+infobanco[i].cod_subconcepto_8+infobanco[i].val_subconcepto_8+infobanco[i].num_cuenta_cliente+'\n';
             cont=infobanco[i].total.length;
             console.log(cont);
         }

         console.log(this.concat);

    }         

    rellenarEspacios(longitud,texto)
    {

        var lengthTexto=texto.length;
        var espacioenblanco=longitud-lengthTexto;

        while(espacioenblanco!=0)
        {
            texto=texto+' ';
            espacioenblanco--;
         }

        return texto;
}
  
    rellenarCero(longitud)
    {
        var texto='';
        while(longitud!=0)
        {
        texto=texto+'0';
        longitud--;
        }
        return texto;
    }


}

 
