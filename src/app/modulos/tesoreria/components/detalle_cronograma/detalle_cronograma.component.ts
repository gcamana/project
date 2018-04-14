import { Component, ViewChild } from '@angular/core';
import { ErrorStateMatcher} from '@angular/material/core';//(MAT-ERROR) Implementacion del error matcher 
import { Detalle_CronogramaService } from './detalle_cronograma.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms'; 

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'egresos-tag',
    templateUrl: './detalle_cronograma.component.html',
    providers: [Detalle_CronogramaService],
    styleUrls: ['./detalle_cronograma.css']
})

export class Detalle_CronogramaComponent{
    @ViewChild('modalDetalleCronograma') modalDetalleCronograma;
    myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
      }
   verificarCuotas: boolean = true;
   matcher = new MyErrorStateMatcher();
   public stringMeses = [];
   a = "2";
   public moraRegex = /^[0-9]+([.][0-9]+)?$/;
   
   

   public cuotaFormControl=[];
   moraFormControl = new FormControl('', [
   Validators.required,
   Validators.pattern(this.moraRegex)]);//el pattern sirve para controlar el input dependiendo del parametro, en este caso el REGEX
   conceptoFormControl = new FormControl('', [
   Validators.required]);
   fechaDescFormControl = new FormControl(new Date());
  

   
   public cronograma_id;
   public detalle_cronograma_datos;
   public cuota_x_mes_datos;
   public tipoCuotaDatos;
   public desc_cronograma;
   public mora;
   public flag_ocultar;
   public flag_cerrado;
   public cronograma_Nombre;
   public fechaVenc;
   public fechaDesc;
   public opcionModal;
   private flag_alerta;
   public disabled;
   public disable;
   public lockButton;
   public verificacion_datos;
   id_detalle_cronograma;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
        private _detalle_cronogramaService: Detalle_CronogramaService,
        dateAdapter: DateAdapter<NativeDateAdapter>,
        public snackBar: MatSnackBar
    ){
        dateAdapter.setLocale('es-ES');
        this.fechaVenc = new Date(Date.now());
        this.fechaDesc = new Date(Date.now());
        this.detalle_cronograma_datos = [];
        this.cuota_x_mes_datos= [];
        this.verificacion_datos = [];
        this.cronograma_id = 0;
        this.opcionModal=0;
        this.flag_ocultar=[];
        this.disabled=[];
        this.verificarCuotas =false;
        this.cronograma_Nombre = "";
        this.tipoCuotaDatos=[];
        this.lockButton=true;
        this.disable=false;
    }

    ngOnInit(){
        
        this._route.params.forEach(params => {
              this.cronograma_id = +params['id'];
              console.log(this.cronograma_id);
        });
         this.getDetalleCronograma();
         this.getTipoCuota();
        
        
    }
    llenarCuotaXMes(){
        for(let i = 0; i<12;i++){
            let str = this.stringMeses[i];
            let cuotaXMes = "^(0?["+str+"-9]|"+str+"[0"+str+"2])$";
            
            let cuotaXMesRegex =new RegExp(cuotaXMes);
            this.cuotaFormControl[i] =  new FormControl('', [
                Validators.required,
                Validators.pattern(cuotaXMesRegex)]);
        }
    }
    //verifica la cantidad de cuotas en cada mes 
    verificarCuotasXMes(){
        
        for(let i = 0;i < 12;i++){
            let contador = 0; 
            for(let j = 0;j< this.detalle_cronograma_datos.length;j++){
                let fecha = this.detalle_cronograma_datos[j].fecha_vencimiento;
                let dateNew = new Date(this.stringToDate(fecha,"dd/MM/yyyy","/"));
                let mes  = dateNew.getMonth();
                if(i == mes)contador++;
             }
             this.stringMeses[i]=String(contador);
            
        }
        this.llenarCuotaXMes();
    }
    //Recibe todas las cuotas por mes
    getCuotaXMes(){

         this._detalle_cronogramaService.getCuotaXMes(this.cronograma_id).subscribe(
            result => {

                this.cuota_x_mes_datos = [];
                this.cuota_x_mes_datos = result;
                this.flag_cerrado = result[0].flg_cerrado;
                if(this.flag_cerrado==1)this.deshabilitar();
                
                 }, 
            error => {
                console.log(<any>error);
            })
    }
    updateCuotaXMes(){
        let obj = { 1 : this.cuota_x_mes_datos[0].cant_cuotas,
                    2 : this.cuota_x_mes_datos[1].cant_cuotas,
                    3 : this.cuota_x_mes_datos[2].cant_cuotas,
                    4 : this.cuota_x_mes_datos[3].cant_cuotas,
                    5 : this.cuota_x_mes_datos[4].cant_cuotas,
                    6 : this.cuota_x_mes_datos[5].cant_cuotas,
                    7 : this.cuota_x_mes_datos[6].cant_cuotas,
                    8 : this.cuota_x_mes_datos[7].cant_cuotas,
                    9 : this.cuota_x_mes_datos[8].cant_cuotas,
                    10 :this.cuota_x_mes_datos[9].cant_cuotas,
                    11 :this.cuota_x_mes_datos[10].cant_cuotas,
                    12 :this.cuota_x_mes_datos[11].cant_cuotas 
        };
        this._detalle_cronogramaService.updateCuotaXMes(obj).subscribe(
            result => {

                this.getDetalleCronograma();
                
                 }, 
            error => {
                console.log(<any>error);
            });
    }
   //Recibe todos los detalle de cronograma
    getDetalleCronograma(){

         this._detalle_cronogramaService.getDetalleCronograma(this.cronograma_id).subscribe(
            result => {

                this.detalle_cronograma_datos = [];
                this.detalle_cronograma_datos = result;
                this.verificarCuotasXMes();
                
                this.verificarBecas();
                this.cronograma_Nombre = this.detalle_cronograma_datos[0].nombrecronograma;
                this.getCuotaXMes();
                 }, 
            error => {
                console.log(<any>error);
            })
    }
    //Recibe todos los tipos de cuota para el modal de nuevo concepto
    getTipoCuota(){

         this._detalle_cronogramaService.getTipoCuota(this.cronograma_id).subscribe(
            result => {

                this.tipoCuotaDatos = [];
                this.tipoCuotaDatos = result;
                console.log("a "+this.tipoCuotaDatos[0].desc_tipo_cuota);
                
                 }, 
            error => {
                console.log(<any>error);
            })
    }
    //Regresar a la pagina anterior
    regresarCronograma(){
       this._location.back();
    }
    //Llenar los campos del modal
    editar(dC,M,fV,fD,idc){
    this.openmodalIngresarCronograma();
    this.moraFormControl.reset();
    this.conceptoFormControl.reset();
    this.id_detalle_cronograma=idc;
    this.opcionModal = 1;
    this.desc_cronograma = dC;
    this.mora=M;
    let fechaD = new Date(this.stringToDate(fD,"dd/MM/yyyy","/"));
    let fechaV = new Date(this.stringToDate(fV,"dd/MM/yyyy","/"));
    //console.log("m "+fecha.getMonth()+" "+fV.toString());
    if(fV!=" - ")this.fechaVenc= fechaV;
    if(fD!=" - ")this.fechaDesc= fechaD;   
   }
   
   //cambia formato del date que recibe de la BD
    stringToDate(_date,_format,_delimiter)
    {
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
    }
    //Limpiar los campos del modal
    openmodalIngresarCronograma(){
    this.moraFormControl.reset();
    this.conceptoFormControl.reset();
    this.modalDetalleCronograma.nativeElement.className = 'modal fade show in';
    }

    closemodalIngresarCronograma(){
    this.modalDetalleCronograma.nativeElement.className = 'modal fade';
    }   
   //Borrar detalle de Cronograma
    eliminarDetalle(indice,detalle_cronograma_id){
       this._detalle_cronogramaService.verificarDetalleMovimiento(detalle_cronograma_id).subscribe(
            result => {
                    
                    this.verificacion_datos = result;
                    console.log("result "+this.verificacion_datos.length);
                    if(this.verificacion_datos.length >= 1){
                    // this.detalle_cronograma_datos.splice(i,1);
                    
                    this.snackBar.open("No se puede eliminar el concepto !","Aceptar", {
                        duration: 3000,
                        });  
                    }else{ 
                       this.eliminarSi(indice,detalle_cronograma_id); 
                     }
                 }, 
            error => {
                console.log(<any>error);
            })
      
    }
    //limpiar fecha descuento
    limpiarFechaDesc()
    {
        this.fechaDesc = undefined ; 
       
    }
    eliminarSi(indice,detalle_cronograma_id){
         this._detalle_cronogramaService.deleteDetalleCronograma(detalle_cronograma_id).subscribe(
            result => {
                    if(result.rowCount == 1){
                    // this.detalle_cronograma_datos.splice(i,1);
                    this.detalle_cronograma_datos.splice(indice,1);
                }
                 }, 
            error => {
                console.log(<any>error);
            })
    }
    //Validaciones crear detalle Cronograma
    validacionesGuardarDetalleCronograma()
    {
        //(MAT-ERROR)El has error verifica si existe algun error en el input que contiene el form control, el patter tambien sirve aqui.
        //Nota**: Incluso si el input no esta sombreado de rojo, pero esta vacio o contiene algun error. El hasError botará el error como true.
       if(  this.moraFormControl.hasError('required') ||
            (this.moraFormControl.hasError('pattern') && !this.moraFormControl.hasError('required')) ||
            this.conceptoFormControl.hasError('required')
        )return true;
        else return false;
    }
    //Crear detalle de Cronograma
    crearDetalleCronograma(){
       
        if(this.validacionesGuardarDetalleCronograma())
        {
            console.log("errorrrr ");
            //(MAT-ERROR) El markAsDirty hace que el input se sombree de rojo, esto sirve para que puedas controlarlo desde botones en el component.
            //            ya que si hay algun error y el usuario no manipula el input, el input no se sombrea. Por eso se hace manualmente.
        this.moraFormControl.markAsDirty();
        this.conceptoFormControl.markAsDirty();
        return;
        }
        let obj={desc_detalle        :  this.desc_cronograma,
                 mora                :  this.mora,
                 fecha_vencimiento   :  this.fechaVenc,
                 fecha_descuento     :  this.fechaDesc,
                 _id_cronograma      :  this.cronograma_id,
                 flg_tipo: 1,
                 flg_beca: 0,
                 id_pers_registro: 62,
                 nombre_pers_registro: "Maria Fernanda Castro Suarez",
                 id_paquete: 0,
                 id_detalle_cronograma: this.id_detalle_cronograma
                 }
        if(this.opcionModal==0) {    
        this._detalle_cronogramaService.createDetalleCronograma(obj).subscribe(
            result => {
                this.closemodalIngresarCronograma()   
                this.getDetalleCronograma();
                 }, 
            error => {
                console.log(<any>error);
            });
        }else{
          
            this._detalle_cronogramaService.updateDetalleCronograma(obj).subscribe(
            result => {
                this.closemodalIngresarCronograma();  
                this.getDetalleCronograma();
                
                 }, 
            error => {
                console.log(<any>error);
            });
        }

}
//verificar todos los botones de toggle beca
verificarBecas(){
    for(let i=0;i<this.detalle_cronograma_datos.length;i++){
     if(this.detalle_cronograma_datos[i].flg_beca==0)this.flag_ocultar[i]=false;
     else this.flag_ocultar[i]=true;
    }
}
//abrir modal detalle cronograma

updateFlagCronograma(){
        
        let obj = {id_cronograma : this.cronograma_id};
        this._detalle_cronogramaService.updateFlagCronograma(obj).subscribe(
            result => {
                   this.snackBar.open("Ya no se puede editar este cronograma","Aceptar", {
                        duration: 3000,
                        }); 
                 }, 
            error => {
                console.log(<any>error);
            })
}
deshabilitar(){
    console.log(" num "+this.detalle_cronograma_datos.length);
    if(this.detalle_cronograma_datos.length>0){
    for(let i=0;i<this.detalle_cronograma_datos.length;i++){
     this.disabled[i]=true;
    }
    this.lockButton = false;
    this.disable= true;
    this.updateFlagCronograma();
}else this.snackBar.open("No se puede definir si no hay conceptos","Aceptar", {
                        duration: 3000,
                        }); 
}
//Boton toggle beca
aplicaBeca(indice,_id_detalle_cronograma)
{
    if(this.flag_ocultar[indice]){
        //realiza el update del flg beca
        this._detalle_cronogramaService.updateBecaDetalleCronograma(0,_id_detalle_cronograma).subscribe(
            result => {
                   
                 }, 
            error => {
                console.log(<any>error);
            })
            //cambia el icono
        this.flag_ocultar[indice]=!this.flag_ocultar[indice];
    }else{
        //realiza el update del flg beca
        this._detalle_cronogramaService.updateBecaDetalleCronograma(1,_id_detalle_cronograma).subscribe(
            result => {
                   
                 }, 
            error => {
                console.log(<any>error);
            })
            //cambia el icono
        this.flag_ocultar[indice]=!this.flag_ocultar[indice];
    }
}
    crearModal(){
        this.opcionModal = 0;
    }


}

