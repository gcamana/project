import { Component, ViewChild } from '@angular/core';
import { ErrorStateMatcher} from '@angular/material/core';//(MAT-ERROR) Implementacion del error matcher 
import { CronogramaService } from './cronograma.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms'; // (MAT-ERROR) Importar estas  directivas para
                                                                                     // que funcione los validadores del mat error
//Implementar la clase del error matcher para poder utilizar correctamente los metodos.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
    selector: 'client-tag',
    templateUrl: './cronograma.component.html',
    providers: [CronogramaService],
    styleUrls: ['./cronograma.css']
})

export class CronogramaComponent{
    @ViewChild('ingresarCronograma') ingresarCronograma;
    @ViewChild   ('modalCronograma')    modalCronograma;
    matcher = new MyErrorStateMatcher();//(MAT-ERROR) Marcador de error para el html
    index:number = 0;//(MAT-TAB-GROUP)indice de cada MAT TAB (1º = 0, 2º = 1, ...)
    //public numberRegex = /^\d{4}$/;//(MAT-ERROR) Regex que verifica el año ({4} = 4 caracteres) Buscar regex para lo que necesites en google.
    public numberRegex = /^(199[0-9]|20[0-9][0-9]|2100)$/;///^[0-9]+([.][0-9]+)?$/;
    public sedes;
    public contador;
    public cronogramas;
    public flag_sede;//Activador del formulario 'Crear Cronograma'
    public flag_cronograma;//Activador de la tabla cronograma
    public flag_ver;
    public flag_ocultar;
    public progress_crearCrono = false;
    //(MAT-ERROR)Controladores que sirven para controlar los errores de los imput - buscar '[formControl]="yearFormControl" [errorStateMatcher]="matcher"' en el html
    yearFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberRegex)]);//el pattern sirve para controlar el input dependiendo del parametro, en este caso el REGEX
    cronogramaFormControl = new FormControl('', [
        Validators.required]);
    //Controlador de los select . El required sirve para saber si esta el input vacio.
    selectTipoCronogramaFormControl = new FormControl('', [
        Validators.required]);
    selectPlantillaFormControl = new FormControl('', [
            Validators.required]);
    
    //Fecha - - -
    public fechaHoy;
    public Mes;
    public Dia;
    public Año;
    public FechaCompleta;
    //Fecha - - -

    public sede;
    public nid_sede;
    public cronograma;
    public anio;
    public tipoDeCronograma;
    public plantillaCronogramas;
    public datosCronograma;
    public data = []; 
    private flag_plantilla=false;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cronogramaService: CronogramaService,
        public snackBar: MatSnackBar
    ){
      this.sedes = [];  
      this.tipoDeCronograma = [];
      this.plantillaCronogramas=[];
      this.contador = 1;
      this.cronogramas = [];
      this.flag_sede = false;
      this.flag_cronograma = false;
      this.flag_ver = true;
      this.flag_ocultar = false;
      
      this.calcularFecha();
      this.Mes = this.fechaHoy.getMonth();
      this.nid_sede=null;
      this.sede=null;
      this.cronograma="";
      this.anio="";
      this.datosCronograma = [];
    }
    calcularFecha(){
    this.fechaHoy = new Date();
    this.Mes = this.fechaHoy.getMonth()+1;  
    this.Dia = this.fechaHoy.getDate();  
    this.Año = this.fechaHoy.getFullYear();  
    this.FechaCompleta = this.Año + '-' + this.Mes + '-' + this.Dia ;  
    }
    ngOnInit(){
        this.datosSedes();
        this.tiposDeCronograma();
        this.plantillaCronograma();
        
        //$('#tb_sedes_crono').bootstrapTable({});
        //this._cronogramaService.getSedes();
    }
    
    datosSedes(){
         this._cronogramaService.getSedes(this.contador).subscribe(
            result => {

                //console.log(result.length);
                if(result.length!=0)
                this.sedes = result;
                else
                this.contador--;
                 }, 
            error => {
                console.log(<any>error);
            }
        )
    }
    //** Recibe los tipos de cronograma 
    tiposDeCronograma(){
        
        this._cronogramaService.getTipoDeCronograma().subscribe(
            result => {
              
                this.tipoDeCronograma = result;
               
                 }, 
            error => {
                
                console.log(<any>error);
            }
        )
    }
    //** Recibe los id y desc DE TODOS los cronogramas
    plantillaCronograma(){
        this._cronogramaService.getPlantillaCronograma().subscribe(
            result => {
              
                this.plantillaCronogramas = result;
                
                 }, 
            error => {
                console.log(<any>error);
            }
        )
    }
    next(){
        this.contador++;
        this.datosSedes();
    }
    back(){
        this.contador--;
        if(this.contador!=0)
        this.datosSedes();
        else this.contador = 1;
    }
    ver(variable){
        this.flag_cronograma = true;
        this.flag_ver = false;
        this.flag_ocultar = true;
        
        this._cronogramaService.getCronograma(variable).subscribe(
            result => {
               this.cronogramas = result; 
               this.openmodalCronograma();     
                   
                 }, 
            error => {
                console.log(<any>error);
            }
        )
    }
    //Detecta el cambio de tabs en el modal nuevo cronograma
    
    ocultar()
    {
        this.flag_sede=false;

    }
    ocultarCronograma()
    {
        this.flag_cronograma = false;
        this.flag_ver = true;
        this.flag_ocultar = false;
    }
    //abre el modal ingresar cronograma y resetea todos los campos
    mostrarFormulario(_nid_sede,_sede)
    {
        console.log(" index "+this.index);
        //(MAT-ERROR) Resetea el input completamente y los parametros del mat error , esto se hace al abrir el modal nuevamente
        //            para que no se queden con el campo en color rojo.
        this.yearFormControl.reset();
        this.cronogramaFormControl.reset();
        this.selectPlantillaFormControl.reset();
        this.selectTipoCronogramaFormControl.reset();
        //-/(MAT-ERROR)

        this.nid_sede=_nid_sede;
        this.sede=_sede;
        this.flag_sede=true;
        this.openmodalIngresarCronograma();
        this.progress_crearCrono = false;
        this.flag_plantilla=false;
    }
    tabChange()
    {
        if(this.index==0)
        {
            //(MAT-ERROR) El has error verifica si se ha tenido algun error en el input que contiene el FormControl, 
            //            required para inputs vacios.
            if(this.yearFormControl.hasError('required'))
            this.yearFormControl.reset(); 
            if(this.cronogramaFormControl.hasError('required'))
            this.cronogramaFormControl.reset();
            this.selectTipoCronogramaFormControl.reset();
        }else
        {
            if(this.yearFormControl.hasError('required'))
            this.yearFormControl.reset(); 
            if(this.cronogramaFormControl.hasError('required'))
            this.cronogramaFormControl.reset();
            this.selectPlantillaFormControl.reset();
        }
    }
    eliminarCronograma(_id_cronograma,indice)
    {
    this._cronogramaService.deleteCronograma(_id_cronograma).subscribe(
            result => {
               
               if(result.val == null) 
                {
                       this.snackBar.open("No se puede eliminar el cronograma !","Aceptar", {
                        duration: 3000,
                        });
                }  
               else  
                {    
                   this.cronogramas.splice(indice,1);
                   console.log("eliminado"); 
                }    
                 }, 
            error => {
                console.log(<any>error);
            }
        )
    }
    validacionesGuardarCronograma(tipoCronogramaID)
    {
        //(MAT-ERROR)El has error verifica si existe algun error en el input que contiene el form control, el patter tambien sirve aqui.
        //Nota**: Incluso si el input no esta sombreado de rojo, pero esta vacio o contiene algun error. El hasError botará el error como true.
       if(  this.yearFormControl.hasError('required') ||
            (this.yearFormControl.hasError('pattern') && !this.yearFormControl.hasError('required')) ||
            tipoCronogramaID == undefined || 
            this.cronogramaFormControl.hasError('required')
        )return true;
        else return false;
    }
    validacionesGuardarCronogramaPlantilla(cronogramaID)
    {
        //(MAT-ERROR)
       if(  this.yearFormControl.hasError('required') ||
            (this.yearFormControl.hasError('pattern') && !this.yearFormControl.hasError('required')) ||
            cronogramaID == undefined || 
            this.cronogramaFormControl.hasError('required')
        )return true;
        else return false;
    }
    insertarCronograma(tipoCronogramaID,cronogramaID,opcion)
    {
        this.progress_crearCrono = true;
        if(this.index == 0)
        {
            if(this.validacionesGuardarCronograma(tipoCronogramaID))
            {
            console.log("error en tipo de cronograma");
                //(MAT-ERROR) El markAsDirty hace que el input se sombree de rojo, esto sirve para que puedas controlarlo desde botones en el component.
                //            ya que si hay algun error y el usuario no manipula el input, el input no se sombrea. Por eso se hace manualmente.
            this.yearFormControl.markAsDirty();
            this.cronogramaFormControl.markAsDirty();
            this.selectTipoCronogramaFormControl.markAsDirty();
            return;
            }
            let obj = {desc_cronograma : this.cronograma,
                fechaHoy        : this.FechaCompleta,
                anio            : this.anio,
                id_sede         : this.nid_sede,
                id_tCronograma  : tipoCronogramaID
               }
               
            this._cronogramaService.saveCronograma(obj).subscribe(
                result => {
             console.log(result);
             var msj = (result.val == null) ? "No se puede crear el cronograma !" : "Se guardo el cronograma exitosamente!";
            // setTimeout(function(){
                 this.snackBar.open(msj,"Aceptar", {
                     duration: 5000,
                 });
                 this.progress_crearCrono = false;
                 if(result.val != null) {
                     this.closemodalIngresarCronograma();
                 }
            // },1000);       
            }, 
             error => {
             console.log(<any>error);
            }
        )

        }else
        {
            if(this.validacionesGuardarCronogramaPlantilla(cronogramaID))
            {
                    console.log("error cronograma plantilla");
                    //(MAT-ERROR)
            this.yearFormControl.markAsDirty();
            this.cronogramaFormControl.markAsDirty();
            this.selectPlantillaFormControl.markAsDirty();
            return;
            }
            let obj = {
                desc_cronograma : this.cronograma,
                fechaHoy        : this.FechaCompleta,
                anio            : this.anio,
                id_sede         : this.nid_sede,
                id_cronograma   : cronogramaID
                      }
               
     
            this._cronogramaService.saveCronogramaP(obj).subscribe(
                result => {
            
                this.ordenarCronogramas(this.tipoDeCronograma[result[0]._id_tipo_cronograma].desc_tipo_cronograma,
                result[0].id_cronograma);   
                this.snackBar.open("Se guardo el cronograma exitosamente!","Aceptar", {
                        duration: 5000,
                    });
                 this.progress_crearCrono = false;  
                this.closemodalIngresarCronograma();
                       
                    }, 
                error => {
                console.log(<any>error);
                    }
     )
             

        }
    
        
        

    }

    openmodalIngresarCronograma(){
        this.ingresarCronograma.nativeElement.className = 'modal fade show in';
    }

    closemodalIngresarCronograma(){
        this.ingresarCronograma.nativeElement.className = 'modal fade';
    }
    openmodalCronograma(){
        this.modalCronograma.nativeElement.className = 'modal fade show in';
    }

    closemodalCronograma(){
        this.modalCronograma.nativeElement.className = 'modal fade';
    }


    ordenarCronogramas(tipoCronograma,_id_cronograma){
    let n = this.cronogramas.length;
    for(let i=1; i<n; i++)
    {
        console.log("this "+this.anio+ " -anterior "+ this.cronogramas[i-1].year+ " -siguiente "+this.cronogramas[i].year);
        if(this.anio < this.cronogramas[i-1].year){
      
            if(this.anio >= this.cronogramas[i].year)
            {
                 this.cronogramas.splice(i, 0,
                 {desc_cronograma: tipoCronograma+" "+this.cronograma, year: this.anio, 
                 desc_tipo_cronograma: tipoCronograma, id_cronograma:_id_cronograma }
                 );  
                 return;
            }
        }else{
        this.cronogramas.splice(0, 0,
        {desc_cronograma: tipoCronograma+" "+this.cronograma, year: this.anio, 
        desc_tipo_cronograma: tipoCronograma, id_cronograma:_id_cronograma }
        );  
        return;
        }
        if(i==n-1){
            this.cronogramas.push(
                {desc_cronograma: tipoCronograma+" "+this.cronograma, year: this.anio, 
                 desc_tipo_cronograma: tipoCronograma, id_cronograma:_id_cronograma });
        }
    }    
    
       
        
    }
    //Ir a detalle de cronograma
    goDetalleCronograma(detalle_cronograma_id : number){
        this._router.navigate(['/tesoreria/detalle_crono/'+detalle_cronograma_id]);
    }
    
}