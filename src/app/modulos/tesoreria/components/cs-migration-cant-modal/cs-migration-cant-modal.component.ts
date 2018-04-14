import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MatTableDataSource, MatPaginator, MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cs-migration-cant-modal',
    templateUrl: 'cs-migration-cant-modal.component.html',
    styleUrls : [ 'cs-migration-cant-modal.component.scss'],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'es-ES'
        },
    ]
})

export class CsMigrationCantModalComponent implements OnInit {
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    displayedColumns = ['coute', 'student', 'quantity'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    viewDate: Date = new Date();

    constructor(
        private _media: MediaMatcher,
        public dialogRef: MatDialogRef<CsMigrationCantModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any)
     {
        this.dataSource = new MatTableDataSource<Element>(this.data.data);
        this.viewDate = this.data.data[0].fecha_migracion;
     }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    //table
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    //table finish
}

//table
export interface Element {
    coute: string;
    student: string;
    quantity: string;
}

const ELEMENT_DATA: Element[] = [
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},
    {coute: "Pensión de marzo", student: "Angeline, quispe bartolomeo", quantity: "100"},

];
//table finish