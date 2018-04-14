import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'modulo',
  templateUrl: './modulo.component.html'
})
export class ModuloComponent {
    constructor(private route: ActivatedRoute,
                private router: Router) { }

   goToModulo(modulo_id : number) {
      this.router.navigate(['/base',  { outlets: { mod : ['modulo_detalle', modulo_id ] } } ]);
   }
}