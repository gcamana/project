import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from '../../../../shared/shared.constants';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'tsr-expenses-component',
    templateUrl: 'tsr-expenses.component.html',
    styleUrls : [ 'tsr-expenses.component.scss'

    ]
})

export class tsrExpensesComponent implements OnInit {
    _changeDetectorRef: any;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    //table
    displayedColumns = ['concept', 'register', 'date', 'amount', 'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _media: MediaMatcher,
        private _location: Location,
    ) {
        this.setMediaQuery();
     }

    ngOnInit() { }
    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    backPage() {
        this._location.back();
    }
    //table
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    //table finish
}
//table
export interface Element {
    amount: string;
    concept: string;
    date: string;
    register: string;
    action: string;
}

const ELEMENT_DATA: Element[] = [
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    { concept: "Pensi?n de marzo", register: "Angeline, quispe bartolomeo", date: "10/12/2018 - 11:00 a.m.", amount: "1000.00", action: "" },
    
];
//table finish