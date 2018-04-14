import { ModuleWithProviders, NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { OwnerStorageService } from './owner-storage.service';

@NgModule()

export class StorageModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StorageModule,
            providers: [
                LocalStorageService,
                OwnerStorageService
            ]
        };
    }
}