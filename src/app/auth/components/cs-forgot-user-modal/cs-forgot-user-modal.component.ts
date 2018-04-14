import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'cs-forgot-user-modal',
    templateUrl: 'cs-forgot-user-modal.component.html',
    styleUrls: ['cs-forgot-user-modal.component.scss']
})

export class CsForgotUserModalComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    documento = new FormControl('', [Validators.required]);

    type: any;

    types = [
        {
            title: '¿Has olvidado tu contraseña?',
            type: 'password',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua.'
        },
        {
            title: '¿Has olvidado tu usuario?',
            type: 'usuario',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua.'
        },
    ];

    constructor(
        public dialogRef: MatDialogRef<CsForgotUserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.setTypes(data.type);
        console.log(data.type);
    }

    ngOnInit() { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    sendForm() {
        console.log(this.email.valid + ' ' + this.documento.valid)
    }

    setTypes(typeTmp: string) {
        this.types.map(type => {
            if (type.type == typeTmp) {
                this.type = type;
            }
        });
    }
}