import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'modulo_detalle',
  templateUrl: './modulo_detalle.component.html'
})
export class ModuloDetalleComponent {
    public modulo_id   : number;
    public flag_botonCronograma;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private _location: Location
    ){
        this.flag_botonCronograma = true;
    }

    ngOnInit() {
        this.route.params.forEach(params => {
            this.modulo_id = +params['id'];
            if (this.modulo_id == 1) {
                this.flag_botonCronograma = false; 
            };
        });
    }

    goBack() {
        this._location.back();
    }

    goToPermiso(permiso) {
        if(permiso == 1) {
            this.router.navigate(['/base',  { outlets: { mod : ['cronograma' ] } } ]);
        } else if(permiso == 4) {
            this.router.navigate(['/base',  { outlets: { mod : ['caja' ] } } ]);
        }
    }
    

}