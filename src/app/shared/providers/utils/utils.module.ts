import { ModuleWithProviders, NgModule } from '@angular/core';
import { GeolocationService } from "./geolocation.service";
import { ShrinkHeaderService } from './shrink-header.service';


@NgModule()

export class UtilsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UtilsModule,
            providers: [
                GeolocationService,
                ShrinkHeaderService,
            ]
        };
    }
}

