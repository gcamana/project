import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataModule } from './providers/data/data.module';
import { UtilsModule } from './providers/utils/utils.module';
import { StorageModule } from './providers/storage/storage.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        DirectivesModule,
        PipesModule,
        UtilsModule.forRoot(),
        DataModule.forRoot(),
        StorageModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        DirectivesModule,
        PipesModule,
        ComponentsModule,
    ]
})
export class SharedModule { }