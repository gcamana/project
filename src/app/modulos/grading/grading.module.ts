import { NgModule } from '@angular/core';

import { CommonModule , registerLocaleData} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule
    ],
    exports: [],
    declarations: [],
    entryComponents:[],
    providers: [],

})
export class GradingModule { }