import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthguardGuard } from './authguard.guard';
import { DataSource } from '@angular/cdk/collections';
// import { ChartModule } from 'angular-highcharts';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';

import { CsLoginComponent } from './auth/pages/cs-login/cs-login.component';
import { CsMainComponent } from './main/pages/cs-main.component';

import { CsForgotUserModalComponent } from './auth/components/cs-forgot-user-modal/cs-forgot-user-modal.component';

import { CsSkeletonLoginComponent } from './auth/components/cs-skeleton-login/cs-skeleton-login.component';

import { BaseComponent } from './main/base.component';
import { PermisosComponent } from './main/permisos.component';
import { ModuloComponent } from './modulos/modulo.component';
import { ModuloDetalleComponent } from './modulos/modulo_detalle.component';

//Services
import { UserService } from './modulos/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatSnackBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { BscWelcomeService } from 'app/modulos/balanced-scorecard/pages/bsc-welcome/bsc-welcome.service';
import { AuthService } from './core/providers/session/auth.service';


// import { TesoreriaModule } from "app/modulos/tesoreria/tesoreria.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        BaseComponent,
        ModuloComponent,
        ModuloDetalleComponent,
        //components
        CsLoginComponent,
        CsSkeletonLoginComponent,
        CsForgotUserModalComponent,
        CsMainComponent
    ],
    entryComponents: [
        CsForgotUserModalComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule.forRoot(),
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        //mat
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
        MatFormFieldModule,
        MatProgressBarModule,
        MatDialogModule,
    ],
    providers: [
        UserService,
        AuthService,
        AuthguardGuard,
        BscWelcomeService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
