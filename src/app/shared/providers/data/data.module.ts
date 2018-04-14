import { ModuleWithProviders, NgModule } from "@angular/core";
import { OwnerService } from "./owner.service";

@NgModule()

export class DataModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataModule,
            providers: [
                OwnerService
            ]
        };
    }
}