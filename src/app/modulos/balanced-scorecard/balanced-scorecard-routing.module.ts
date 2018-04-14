import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BscWelcomeComponent } from './pages/bsc-welcome/bsc-welcome.component';
import { BscDashboardComponent } from './pages/bsc-dashboard/bsc-dashboard.component';
import { BscIndicatorsDetailComponent } from './pages/bsc-indicator-detail/bsc-indicator-detail.component';
import { AuthguardGuard } from 'app/authguard.guard';
import { BscSelfIndicatorsComponent } from './pages/bsc-self-indicators/bsc-self-indicators.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BscWelcomeComponent},
        { path: 'main/:token', component: BscWelcomeComponent},
        { path: 'main', canActivate : [AuthguardGuard], component: BscWelcomeComponent},
        { path: 'dashboard', canActivate : [AuthguardGuard], component: BscDashboardComponent },
        { path: 'self-indicator', canActivate : [AuthguardGuard], component: BscSelfIndicatorsComponent },
        { path: 'dashboard/indicator', canActivate : [AuthguardGuard], component: BscIndicatorsDetailComponent },
    ])],
    exports: [RouterModule]
})
export class BalancedScorecardRoutingModule {}