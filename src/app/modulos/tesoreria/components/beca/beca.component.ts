import { Component, ViewChild } from '@angular/core';
import { BecaService } from './beca.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'beca-tag',
    templateUrl: './beca.component.html',
    providers: [BecaService],
    styleUrls: ['./beca.css']
})

export class BecaComponent{
    @ViewChild('modalFiltroEstudiantes') modalFiltroEstudiantes;
    @ViewChild('modalAsignarBecas') modalRegistroBeca;
    @ViewChild('modalQuitarBecas') modalAnulacionBeca;

    becaFormControl = new FormControl('', [
        Validators.required]);
    anhioFormControl = new FormControl('', [
        Validators.required]);    

        

    public estudiantes = [];
    public beca = [];
    public anhio = [];
    public flag_ocultar = [];
    public disabled = [];
    public datosRegistroBeca;
    public result;

    public indiceUpdate;
    public searchEstudiantes = '';
    public c_id_estudiante = '';
    public id_persona; 

    public progress_registrar = false;
    public flg_estudiantes = false;

    constructor(
        private _route          : ActivatedRoute,
        private _router         : Router,
        private _becaService    : BecaService,
        private snackBar        : MatSnackBar,
        private _userService    : UserService

    ){
        
        var root = this;
        setTimeout(function () {
            //root.id_Sede = _userService.usuario.sede;
            root.id_persona = _userService.usuario.persona;
        }, 1000);

    }

    ngOnInit(){
        
                this._route.params.forEach(params => {
                  
              });
                this.verAnhios();
                this.verBecas();
            }

    
    verBecas(){
                this._becaService.getBecas().subscribe(
                result => {
                   this.beca = result;  
                   console.log(result);         
                     }, 
                error => {
                    console.log(<any>error);
                    }
                )
            }

    openModalFiltrarEstudiante(){
        this.modalFiltroEstudiantes.nativeElement.className = 'modal fade show in';
    }

    closeModalFiltrarEstudiante(){
        this.modalFiltroEstudiantes.nativeElement.className = 'modal fade';
    }
     
    openModalRegistrarBeca(){
        this.modalRegistroBeca.nativeElement.className = 'modal fade show in';
    }

    closeModalRegistrarBeca(){
        this.estudiantes[this.indiceUpdate].flg_beca = 0;
        this.modalRegistroBeca.nativeElement.className = 'modal fade';
        //this.getEstudiantes();
    }
    openModalAnularBeca(){
        this.modalAnulacionBeca.nativeElement.className = 'modal fade show in';
        
    }

    closeModalAnularBeca(){
        this.estudiantes[this.indiceUpdate].flg_beca = 1;
        this.modalAnulacionBeca.nativeElement.className = 'modal fade';
        //this.getEstudiantes();
    }

    getEstudiantes(){
        if((this.searchEstudiantes).length > 2){
            this.progress_registrar = true;
            var obj = {search   : this.searchEstudiantes};        
            this._becaService.getEstudiantes(obj).subscribe(
                result => {
                    this.estudiantes = result;
                    console.log(result);
                    this.flg_estudiantes = (this.estudiantes.length == 0) ? false : true;

                    console.log('QUE ES ESTO?: '+this.flg_estudiantes);
                    this.progress_registrar = false;
                }, 
                error => {
                  // this.proggres_egresos = false;
                    console.log(<any>error);

                }
          );
        } else{
            console.log('entra');
        }
    }
    verAnhios(){
        this._becaService.getAnhios().subscribe(
        result => {
           this.anhio = result;
           console.log(result);         
             }, 
        error => {
            console.log(<any>error);
            }
        )
    }

    notificacion(msj, accion){
        var duration = 3000;
        this.snackBar.open(msj,accion,{duration: duration});
    }

    mostrarFormularioRegistrarBeca(indice,nid_persona,desc_condicion){
        console.log('INDICE: '+indice);
            this.datosRegistroBeca = {
                    nid_persona    : nid_persona,
                    id_persona     : this.id_persona,
                    desc_condicion : desc_condicion
                    };
                this.indiceUpdate = indice;
                console.log('variable buleana: '+desc_condicion);
                console.log(this.estudiantes[indice].flg_beca == 0);    
                if(this.estudiantes[indice].flg_beca == 0)
                {
                    this.becaFormControl.reset();
                    this.anhioFormControl.reset();
                    console.log('debe asignar beca')
                    this.openModalRegistrarBeca();
                    this.estudiantes[indice].flg_beca =  1;
                }
                else
                {
                    console.log('solo se puede quitar beca: '+desc_condicion);
                    this.openModalAnularBeca();
                    this.estudiantes[indice].flg_beca =  0;
                }            
                console.log('SALE DEL FORMULARIO');
        }
    validacionesRegistrarBeca(condicion,anio)
    {
            //(MAT-ERROR)
            if( condicion == undefined || anio == undefined)
                return true;
                else return false;
    }

    RegistrarBeca(condicion,anio){
        this.progress_registrar = true; 
        if(this.validacionesRegistrarBeca(condicion,anio))
        {
            console.log('condicion registro: '+condicion);
            console.log('anio escogido: '+anio);
            this.result = 'Ingrese datos Validos y/o complete Campos';
            console.log("error en tipo de BECA");
            //(MAT-ERROR) El markAsDirty hace que el input se sombree de rojo, esto sirve para que puedas controlarlo desde botones en el component.
            //            ya que si hay algun error y el usuario no manipula el input, el input no se sombrea. Por eso se hace manualmente.
         
            this.becaFormControl.markAsDirty();
            this.anhioFormControl.markAsDirty();
            this.progress_registrar = false; 
       
         return;
        }

        console.log('ENTRA AL MODAL REGISTRAR');

            this.datosRegistroBeca.id_condicion = condicion;
            this.datosRegistroBeca.anio = anio;
                               
                 console.log(this.datosRegistroBeca);
                this._becaService.RegistrarBeca(this.datosRegistroBeca).subscribe(
                result => {
                    console.log(result);
                    if(result.error == 0){
                        
                        this.closeModalRegistrarBeca();
                        this.getEstudiantes();
                        this.estudiantes[this.indiceUpdate].flg_beca = 1;
                        this.notificacion(this.result,'Hecho');
                      }
                      this.progress_registrar = false;
                      this.notificacion(result.msj,'Hecho');
           
                }, 
                error => {
                    console.log(<any>error);
                }
            );
        }
    
    AnularBeca(){
        console.log('ESTA EN ANULAR BECA');
        this.progress_registrar = true; 
        this.result = 'No se pudo anular El egreso';                       
        console.log(this.datosRegistroBeca);
                this._becaService.AnularBeca(this.datosRegistroBeca).subscribe(
                result => {
                    if(result.error == 0){
                        this.closeModalAnularBeca();
                        this.getEstudiantes();
                        this.estudiantes[this.indiceUpdate].flg_beca = 0;
                        this.notificacion(this.result,'Hecho');
                      }
                      this.progress_registrar = false;
                      this.notificacion(result.msj,'Hecho');

           
                }, 
                error => {
                    console.log(<any>error);
                }
            );
        }



}