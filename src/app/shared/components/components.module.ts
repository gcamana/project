import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';

import { PipesModule } from '../pipes/pipes.module';
import { CsCircularGaugeComponent } from './cs-circular-gauge/cs-circular-gauge.component';
import { CsChartLineComponent } from './cs-chart-line/cs-chart-line.component';
import { CsUserPermissionComponent } from './cs-user-permission/cs-user-permission.component';
import { CsChatListComponent } from './cs-chat-list/cs-chat-list.component';
import { CsNewsListComponent } from './cs-news-list/cs-news-list.component';
import { CsChartCombinationComponent } from '../../shared/components/cs-chart-combination/cs-chart-combination.component';
import { CsEmptyComponent } from 'app/shared/components/cs-empty/cs-empty.component';
import { CsChartPercentageAreaComponent } from '../../modulos/balanced-scorecard/components/cs-chart-percentage-area/cs-chart-percentage-area.component';
import { CsGhostComponent, CsGhostComponentService } from './cs-ghost-loading/cs-ghost-loading.component';
import { CsShrinkingHeaderComponent } from './cs-shrinking-header/cs-shrinking-header.component';
import { CsWelcomeCardComponent } from './cs-welcome-card/cs-welcome-card.component';
import { CsUserAvatarComponent } from './cs-user-avatar/cs-user-avatar.component';
import { CsUserListModalComponent } from './cs-user-list-modal/cs-user-list-modal.component';
import { CsChartSplineComponent } from './cs-chart-spline/cs-chart-spline.component';
import { CsAcordionGlobalComponent, CsAcordionGlobalGroupComponent } from './cs-acordion-global/cs-acordion-global.component';
import { CsBankChartComponent } from './cs-bank-chart/cs-bank-chart.component';

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
import { RouterModule } from '@angular/router';

declare var require : any;

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ChartModule.forRoot(
            require('highcharts'),
            require('highcharts/modules/exporting'),
            require('highcharts/highcharts-more'),
            require('highcharts/modules/solid-gauge')
        ),
        FormsModule,
        PipesModule,
        // DropDownList
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
        CsShrinkingHeaderComponent,
        CsCircularGaugeComponent,
        CsCircularGaugeComponent,
        CsChartLineComponent,
        CsUserPermissionComponent,
        CsNewsListComponent,
        CsChatListComponent,
        CsChartCombinationComponent,
        CsEmptyComponent,
        CsChartPercentageAreaComponent,
        CsGhostComponent,
        CsWelcomeCardComponent,
        CsUserAvatarComponent,
        CsUserListModalComponent,
        CsChartSplineComponent,
        CsAcordionGlobalComponent,
        CsAcordionGlobalGroupComponent,
        CsBankChartComponent
    ],
    exports: [
        CsShrinkingHeaderComponent,
        CsCircularGaugeComponent,
        CsChartLineComponent,
        CsUserPermissionComponent,
        CsNewsListComponent,
        CsChatListComponent,
        CsChartCombinationComponent,
        CsEmptyComponent,
        CsChartPercentageAreaComponent,
        CsGhostComponent,
        CsWelcomeCardComponent,
        CsUserAvatarComponent,
        CsUserListModalComponent,
        CsChartSplineComponent,
        CsAcordionGlobalComponent,
        CsAcordionGlobalGroupComponent,
        CsBankChartComponent
    ],
    entryComponents:[
        CsChartCombinationComponent,
        CsChartLineComponent,
        CsCircularGaugeComponent,
        CsUserListModalComponent,
        CsChartSplineComponent
    ],
    providers: [
        CsGhostComponentService
    ]
})
export class ComponentsModule { }
