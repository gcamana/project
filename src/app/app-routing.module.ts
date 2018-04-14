
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AuthguardGuard } from './authguard.guard';
import { CsLoginComponent } from './auth/pages/cs-login/cs-login.component';
import { CsMainComponent } from './main/pages/cs-main.component';

const ROUTES: Routes = [
    { path: '', component: CsMainComponent },
    { path: 'login', component: CsLoginComponent },
    { path: 'tesoreria'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/tesoreria/tesoreria.module#TesoreriaModule' },
    { path: 'bsc'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/balanced-scorecard/balanced-scorecard.module#BalancedScorecardModule' },
    { path: 'rrhh'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/resources/resources.module#ResourcesModule' },
    { path: 'notas'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/grading/grading.module#GradingModule' },
    { path: 'prog'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/programming/programming.module#ProgrammingModule' },
    { path: 'plan-inst'/*, canActivate: [AuthguardGuard]*/, loadChildren: 'app/modulos/planning/planning.module#PlanningModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }