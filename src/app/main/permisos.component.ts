import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../modulos/services/user.service';

@Component({
  selector: 'permisos',
  styleUrls: ['base.css'],
  templateUrl: './permisos.component.html'
})

export class PermisosComponent {
    public selectedItem = null;
    public nom_abvr     = null;
    public desc_rol     = null;
    public id_cargo     = null;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _userService : UserService) {
        var root = this;
        setTimeout(function(){
            root.nom_abvr = _userService.usuario.nombre;
            root.desc_rol = _userService.usuario.rol;
            root.id_cargo = _userService.usuario.id_cargo;
        },2000);
    }

    changePermiso(permiso){
        this.router.navigate(['/tesoreria',  { outlets: { mod : [permiso] } } ]);
        this.selectedItem = permiso;
    }

    logout(){
        sessionStorage.removeItem('persona');
        sessionStorage.removeItem('flg_padre');
        window.location.reload();
    }
}