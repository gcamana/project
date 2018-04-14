import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../modulos/services/user.service';
import { Usuario } from '../objetos/Usuario';
@Component({
  selector: 'base',
  styleUrls: ['base.css'],
  templateUrl: './base.component.html'
})
export class BaseComponent {
    private id;
    subscription;
    public logo_acti = 'assets/img/header/logo_sistema.png';
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _userService : UserService ) {
      /*this.subscription = this._userService.__getUserData(1).subscribe(
        res => {
          if(!res.results) {
            this.usuario = new Usuario(res.nombre, res.email);
          } else {
            this.usuario = new Usuario(res.results[0].name.first, res.results[0].email);
          }
          console.log(this.usuario);
        }, 
        error => console.log(error)
      );*/
    }

    ngOnInit() {
      //console.log(this._userService.usuario);
      // this.route.params.subscribe((params: {id: string}) => {
      //    console.log(JSON.stringify(params['res']) );
      // });
    }
    
    goToModulo(modulo_id : number) {
      this.router.navigate(['/tesoreria']);
      //this.router.navigate(['/base',  { outlets: { mod : ['modulo_detalle', modulo_id ] } } ]);
   }
}