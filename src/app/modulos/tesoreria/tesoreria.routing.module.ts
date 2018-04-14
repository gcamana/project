import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TesoreriaComponent } from './pages/main/tesoreria.component';
import { tsrMovementsComponent } from './pages/tsr-movements/tsr-movements.component';
import { tsrBankComponent } from './pages/tsr-bank/tsr-bank.component';
import { tsrMigrationComponent } from './pages/tsr-migration/tsr-migration.component';
import { tsrGeneralBanksComponent } from './pages/tsr-general-banks/tsr-general-banks.component';
import { tsrSettingsComponent } from './pages/tsr-settings/tsr-settings.component';

import { tsrReportsComponent } from './pages/tsr-reports/tsr-reports.component';
import { tsrExpensesComponent } from './pages/tsr-expenses/tsr-expenses.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TesoreriaComponent },
        { path: 'movimientos/:token', component: tsrMovementsComponent },
        { path: 'caja', component: tsrBankComponent },
        { path: 'cajas', component: tsrGeneralBanksComponent },
        { path: 'migracion', component: tsrMigrationComponent },
        { path: 'configuracion', component: tsrSettingsComponent },
        { path: 'reportes', component: tsrReportsComponent },
        { path: 'egresos', component: tsrExpensesComponent },
    ])],
    exports: [RouterModule]
})

export class TesoreriaRoutingModule { }
