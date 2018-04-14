import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { SharedModule } from '../../shared/shared.module';
import { BalancedScorecardRoutingModule } from './balanced-scorecard-routing.module';

import { BscWelcomeComponent } from './pages/bsc-welcome/bsc-welcome.component';
import { BscDashboardComponent } from './pages/bsc-dashboard/bsc-dashboard.component';
import { BscIndicatorsDetailComponent } from './pages/bsc-indicator-detail/bsc-indicator-detail.component';
import { BscSelfIndicatorsComponent } from './pages/bsc-self-indicators/bsc-self-indicators.component';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import {
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatMenuModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCheckboxModule,

} from '@angular/material';

import { CsAccordion, CsAccordionGroupComponent } from './components/cs-accordion/cs-accordion.component';
import { CsGoalComponent } from './components/cs-goal/cs-goal.component';
import { CsIndicatorsComponent } from './components/cs-indicators/cs-indicators.component';
import { CsHistorical, CsHistoricalGroupComponent } from './components/cs-historical/cs-historical.component';
import { CsTableNestedComponent } from './components/cs-table-nested/cs-table-nested.component';
import { CsTableGroupComponent, CsTableComponent } from './components/cs-table/cs-table.component';
import { CsTableDialogComponent } from './components/cs-table-dialog/cs-table-dialog.component';
import { CsFilterModalComponent } from './components/cs-filter-modal/cs-filter-modal.component';
import { CsTrendComponent } from './components/cs-trend/cs-trend.component';
import { CsGaugeModalComponent } from './components/cs-gauge-modal/cs-gauge-modal.component';
import { CsPesoModalComponent } from './components/cs-peso-modal/cs-peso-modal.component';
import { CsAccordionModalComponent } from './components/cs-accordion-modal/cs-accordion-modal.component';
import { CsTrendTableComponent } from './components/cs-trend-table/cs-trend-table.component';
import { CsSearchUserComponent } from './components/cs-search-user/cs-search-user.component';
import { CsUserResponsableModalComponent } from './components/cs-user-responsable-modal/cs-user-responsable-modal.component';
import { CsHistoryTableModalComponent } from './components/cs-history-table-modal/cs-history-table-modal.component';
import { CsChartZoomModalComponent } from './components/cs-chart-zoom-modal/cs-chart-zoom-modal.component';
import { CsSkeletonAccordion } from './components/cs-skeleton-accordion/cs-skeleton-accordion.component';
import { CsIndicatorInformationModalComponent } from './components/cs-indicator-information-modal/cs-indicator-information-modal.component';
import { ShrinkHeaderService } from 'app/shared/providers/utils/shrink-header.service';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        CdkTableModule,
        HttpModule,
        BalancedScorecardRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,

        ScrollDispatchModule,
        // material
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatMenuModule,
        MatGridListModule,
        MatSelectModule,
        MatListModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        MatTabsModule,
        MatDatepickerModule,
        MatCheckboxModule,

    ],
    declarations: [
        //Page
        BscWelcomeComponent,
        BscDashboardComponent,
        BscIndicatorsDetailComponent,
        BscSelfIndicatorsComponent,

        //Components
        CsAccordion,
        CsAccordionGroupComponent,
        CsGoalComponent,
        CsIndicatorsComponent,
        CsHistorical,
        CsHistoricalGroupComponent,
        CsTableNestedComponent,
        CsTableGroupComponent,
        CsTableComponent,
        CsTrendComponent,
        CsTrendTableComponent,
        CsSearchUserComponent,
        CsSkeletonAccordion,

        //Modal
        CsTableDialogComponent,
        CsFilterModalComponent,
        CsGaugeModalComponent,
        CsPesoModalComponent,

        CsAccordionModalComponent,
        CsUserResponsableModalComponent,
        CsHistoryTableModalComponent,
        CsChartZoomModalComponent,
        CsIndicatorInformationModalComponent

    ],
    entryComponents: [
        CsTableDialogComponent,
        CsFilterModalComponent,
        CsGaugeModalComponent,
        CsPesoModalComponent,
        CsAccordionModalComponent,
        CsIndicatorsComponent,
        CsUserResponsableModalComponent,
        CsHistoryTableModalComponent,
        CsChartZoomModalComponent,
        CsIndicatorInformationModalComponent
    ],
    bootstrap: [],
    providers: [
        ShrinkHeaderService
        // DemoService,
        // UserService
    ]
})
export class BalancedScorecardModule { }