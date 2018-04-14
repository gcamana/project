import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './modulos/services/user.service';
import { BscWelcomeService } from 'app/modulos/balanced-scorecard/pages/bsc-welcome/bsc-welcome.service';
import { SharedConstants } from 'app/shared/shared.constants';

@Injectable()
export class AuthguardGuard implements CanActivate {
    constructor(
        private user: UserService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private bscWelcomeService: BscWelcomeService) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        var session = this.user.getUserLoggedIn();
        var secretaria = sessionStorage.persona;
        if (!session) {
            if (sessionStorage.getItem('token') == null) {
                window.location.href = SharedConstants.links.SMILEDU;
                return false;
            }
            let obj = { token: sessionStorage.getItem('token') };
            this.bscWelcomeService.validateToken(obj).subscribe(
                result => {
                    if (result.error == 2) {
                        window.location.href = SharedConstants.links.SMILEDU;
                    } else if (result.error == 0) {
                        sessionStorage.setItem('token', result.token);
                        sessionStorage.setItem('metadata', result.data_sess);
                    }
                    if (sessionStorage.getItem('token') == null) {
                        window.location.href = SharedConstants.links.SMILEDU;
                    }
                },
                error => {
                    window.location.href = SharedConstants.links.SMILEDU;
                }
            )
        }
        return true;
    }
}
