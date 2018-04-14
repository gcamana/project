import { NgModule } from '@angular/core';
import { CommonModule , registerLocaleData} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'angular-calendar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { SharedModule } from '../../shared/shared.module';
import { TesoreriaRoutingModule } from './tesoreria.routing.module';
import { TesoreriaComponent } from './pages/main/tesoreria.component';
import { tsrMovementsComponent } from './pages/tsr-movements/tsr-movements.component';
import { tsrBankComponent } from './pages/tsr-bank/tsr-bank.component';
import { tsrMigrationComponent } from './pages/tsr-migration/tsr-migration.component';
import { tsrGeneralBanksComponent } from './pages/tsr-general-banks/tsr-general-banks.component';
import { DataSource } from '@angular/cdk/collections';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatChipsModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';

import { MatTableModule } from '@angular/material/table';
import { CsUserConnectedComponent } from './components/cs-user-connected/cs-user-connected.component';
import { CsUserLastRegisterComponent } from './components/cs-user-last-register/cs-user-last-register.component';
import { CsPayModalComponent } from './components/cs-pay-modal/cs-pay-modal.component';
import { CsPaymentCommitmentModalComponent } from './components/cs-payment-commitment/cs-payment-commitment.component';
import { CsMovementsZoomModalComponent } from './components/cs-movements-zoom-modal/cs-movements-zoom-modal.component';
import { CsEliminateDebtModalComponent } from './components/cs-eliminate-debt-modal/cs-eliminate-debt-modal.component';
import { CsDiscountComponent } from './components/cs-discount-modal/cs-discount-modal.component';
import { CsAssingBecaComponent } from './components/cs-assing-beca-modal/cs-assing-beca-modal.component';
import { CsShareCashModalComponent } from './components/cs-share-cash-modal/cs-share-cash-modal.component';
import { CsOpenCashModalComponent } from './components/cs-open-cash-modal/cs-open-cash-modal.component';
import { CsWantBillModelComponent } from './components/cs-want-bill-modal/cs-want-bill-modal.component';
import { CsScheduleModalComponent } from './components/cs-schedule-modal/cs-schedule-modal.component';
import { CsCancelCommitmentModalComponent } from './components/cs-cancel-commitment-modal/cs-cancel-commitment-modal.component';
import { CsRefundMoneyModalComponent } from './components/cs-refund-money-modal/cs-refund-money-modal.component';
import { CsPassCreditModalComponent } from './components/cs-pass-credit-modal/cs-pass-credit-modal.component';
import { CsVaucherModalComponent } from './components/cs-vaucher-modal/cs-vaucher-modal.component';
import { CsCreateConceptModalComponent } from './components/cs-create-concept-modal/cs-create-concept-modal.component';
import { CsCreateProviderModalComponent } from './components/cs-create-provider-modal/cs-create-provider-modal.component';
import { CsFamilyModalComponent } from './components/cs-family-modal/cs-family-modal.component';
import { CsReturnExpensesComponent } from './components/cs-return-expenses-modal/cs-return-expenses-modal.component';
import { CsCancelExpenseComponent } from './components/cs-cancel-expenses-modal/cs-cancel-expenses-modal.component';
import { CsFamilySonModalComponent } from './components/cs-family-son-modal/cs-family-son-modal.component';
import { CsImportModalComponent } from './components/cs-import-modal/cs-import-modal.component';
import { CsExportModalComponent } from './components/cs-export-modal/cs-export-modal.component';
import { CsSiscontModalComponent } from './components/cs-siscont-modal/cs-siscont-modal.component';
import { CsIncidentsModalComponent } from './components/cs-incidents-modal/cs-incidents-modal.component';
import { CsRefundHistoricalModalComponent } from './components/cs-refund-historical-modal/cs-refund-historical-modal.component';
import { CsChartBankZoomComponent } from './components/cs-chart-bank-zoom/cs-chart-bank-zoom.component';
import { CsIncidentCalendarModalComponent } from './components/cs-incident-calendar-modal/cs-incident-calendar-modal.component';
import { tsrSettingsComponent } from './pages/tsr-settings/tsr-settings.component';
import { CsSettingTableGroupComponent, CsSettingTableComponent } from './components/cs-setting-table/cs-setting-table.component';
import { tsrReportsComponent } from './pages/tsr-reports/tsr-reports.component';
import { CsReportsHistoryComponent } from './pages/tsr-reports/components/cs-reports-history/cs-reports-history.component';
import { CsExpiredPensionsComponent } from './pages/tsr-reports/components/cs-expired-pensions/cs-expired-pensions.component';
import { CsBanksModalComponent } from './components/cs-banks-modal/cs-banks-modal.component';
import { tsrExpensesComponent } from './pages/tsr-expenses/tsr-expenses.component';
import { CsMigrationCantModalComponent } from './components/cs-migration-cant-modal/cs-migration-cant-modal.component';
import { CsCreateVoucherModalComponent } from './components/cs-create-voucher-modal/cs-create-voucher-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TesoreriaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CalendarModule.forRoot(),
        //MATERIAL
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatTabsModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatChipsModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatExpansionModule
    ],
    declarations: [
        TesoreriaComponent,
        tsrMovementsComponent,
        tsrBankComponent,
        tsrMigrationComponent,
        tsrGeneralBanksComponent,
        tsrReportsComponent,
        tsrExpensesComponent,

        //Compoenent
        CsUserConnectedComponent,
        CsUserLastRegisterComponent,
        CsPayModalComponent,
        CsPaymentCommitmentModalComponent,
        CsSettingTableGroupComponent,
        CsSettingTableComponent,
        CsReportsHistoryComponent,
        CsExpiredPensionsComponent,

        //Modal
        CsMovementsZoomModalComponent,
        CsEliminateDebtModalComponent,
        CsDiscountComponent,
        CsAssingBecaComponent,
        CsShareCashModalComponent,
        CsOpenCashModalComponent,
        CsWantBillModelComponent,
        CsScheduleModalComponent,
        CsCancelCommitmentModalComponent,
        CsRefundMoneyModalComponent,
        CsPassCreditModalComponent,
        CsVaucherModalComponent,
        CsCreateConceptModalComponent,
        CsCreateProviderModalComponent,
        CsFamilyModalComponent,
        CsCancelExpenseComponent,
        CsReturnExpensesComponent,
        CsFamilySonModalComponent,
        CsImportModalComponent,
        CsExportModalComponent,
        CsSiscontModalComponent,
        CsIncidentsModalComponent,
        CsChartBankZoomComponent,
        CsRefundHistoricalModalComponent,
        CsIncidentCalendarModalComponent,
        tsrSettingsComponent,
        CsBanksModalComponent,
        CsMigrationCantModalComponent,
        CsCreateVoucherModalComponent

    ],
    entryComponents: [
        CsPayModalComponent,
        CsPaymentCommitmentModalComponent,
        CsMovementsZoomModalComponent,
        CsEliminateDebtModalComponent,
        CsDiscountComponent,
        CsAssingBecaComponent,
        CsShareCashModalComponent,
        CsOpenCashModalComponent,
        CsWantBillModelComponent,
        CsScheduleModalComponent,
        CsCancelCommitmentModalComponent,
        CsRefundMoneyModalComponent,
        CsPassCreditModalComponent,
        CsVaucherModalComponent,
        CsCreateConceptModalComponent,
        CsCreateProviderModalComponent,
        CsFamilyModalComponent,
        CsCancelExpenseComponent,
        CsReturnExpensesComponent,
        CsFamilySonModalComponent,
        CsImportModalComponent,
        CsExportModalComponent,
        CsSiscontModalComponent,
        CsIncidentsModalComponent,
        CsChartBankZoomComponent,
        CsRefundHistoricalModalComponent,
        CsIncidentCalendarModalComponent,
        CsBanksModalComponent,
        CsMigrationCantModalComponent,
        CsCreateVoucherModalComponent
    ],
    providers: [

    ]
})
export class TesoreriaModule { }