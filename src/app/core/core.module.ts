import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService, UserServiceConfig } from './providers/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { CommonService } from './common.service';
import { HeadersService } from './headers.service';
import { ConfigService } from './config.service';
import { OwnerIdentityService } from './providers/session/owner-identity.service';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,

        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [
        CommonService,
        HeadersService,
        ConfigService,
        OwnerIdentityService,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }
}
