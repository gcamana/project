import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
    selector: 'cs-table-nested-component',
    templateUrl: './cs-table-nested.component.html',
    styleUrls: ['cs-table-nested.component.scss']
})

export class CsTableNestedComponent {
    isShort: string = "giovanni order";
    isRateLimitReached = false;
    @Input('resultsLength') resultsLength = 0;
    @Input('dataDetalle') dataDetalle;
    @Input() tipo_calc;
    @Input() unidad_med :string = '%';
    @Input('isLoadingResults') isLoadingResults;
    @Output('emitSaveCurrent') emitSaveCurrent = new EventEmitter();
    @Output('pagination') pagination = new EventEmitter();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        this._changeDetectorRef.detectChanges();
    }

    sendDataSaveIndi(event) {
        this.emitSaveCurrent.emit(event);
    }

    onPaginatedChange(event) {
        this.pagination.emit(event);
    }
}
