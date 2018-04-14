import { Component, OnInit, ViewChild, ElementRef, Renderer, TemplateRef, ChangeDetectorRef, ViewEncapsulation, Input } from '@angular/core';
import { SharedConstants } from '../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../../core/providers/session/auth.service';
import { CsGhostComponentService } from '../../../shared/components/cs-ghost-loading/cs-ghost-loading.component';
import { MatDialog } from '@angular/material';
import { CsForgotUserModalComponent } from '../../components/cs-forgot-user-modal/cs-forgot-user-modal.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

var colorTmp: string = '';

@Component({
    selector: 'cs-login',
    templateUrl: 'cs-login.component.html',
    styles: [`
        mat-form-field.mat-focused .mat-form-field-label {
            color : ${colorTmp} !important;
        }
        .mat-form-field-ripple {
            background-color: ${colorTmp} !important;
        }
        .mat-nav-list .mat-list-item:hover {
            background: ${colorTmp} !important;
        }
    `],
    providers: [MediaMatcher],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cs-login.component.scss'],
})

export class CsLoginComponent implements OnInit {

    @Input() color: string = '';
    @ViewChild('formColor') formColor: TemplateRef<any>;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    primary: string = '#E3E3E3';
    secondary: string = '#EBEBEB';
    light: string = '#FCFCFC';
    userCache: any;
    SMILEDU_ICO: string = SharedConstants.ICONS.SMILEDU_ICO;
    LOVE_SCHOOL: string = SharedConstants.ICONS.LOVE_SCHOOL;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    ICON_FACEBOOK: string = SharedConstants.ICONS.ICON_FACEBOOK;
    ICON_GOOGLE: string = SharedConstants.ICONS.ICON_GOOGLE;
    ICON_OUTLOOK: string = SharedConstants.ICONS.ICON_OUTLOOK;
    MESSAGE_HELP: string = SharedConstants.ICONS.MESSAGE_HELP;
    isSkeletonPage: boolean = false;

    collegePage: any;
    usernameControl: FormControl;
    newUserForm: FormGroup;
    usersTmp = [
        {
            fullName: 'Giovanni Camana',
            email: 'gzci24@gmail.com'
        },
        {
            fullName: 'Ramos Huerto',
            email: 'ramos@mail.com'
        },
        {
            fullName: 'Carlos Humberto',
            email: 'carlos@mail.com'
        }
    ];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer: Renderer,
        private _authService: AuthService,
        private _media: MediaMatcher,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _authSrv: AuthService,
        private _csGhostSrv: CsGhostComponentService
    ) {
        this.setMediaQuery();
        this.getDomain();
        this._csGhostSrv.setLoading(true)
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 767px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    selectUser(user) {
        this.userCache = user;
    }

    ngAfterViewInit() {
        // this.getDomain();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    getDomain() {
        //let domain = window.location.hostname;
        let domain = "testcdn2";
        //let domain = "localhost";
        this._authService.getDomain(domain)
            .subscribe(theme => {
                console.log(theme);
                setTimeout(() => {
                    this.collegePage = theme;
                    this.setColor(this.collegePage.color);
                    this._csGhostSrv.setLoading(false)
                }, 2000);
            });
    }

    ngOnInit() {
        this.newUserForm = this._builderForm();
    }

    login() {

    }

    setColor(color: string) {
        this.primary = color;
        colorTmp = this.primary;
        this.isSkeletonPage = true;
        console.log('Theme color general' + colorTmp);
    }

    setTheme() {
        try {
            document.querySelector('mat-form-field.mat-focused .mat-form-field-label')["style"].color = this.primary;
        } catch (error) {

        }
    }

    openFortgotUser(type: string) {

        let dialogRef = this.dialog.open(CsForgotUserModalComponent, {
            width: '640px',
            panelClass: 'cs-forgot-modal',
            data: { type: type, color: this.primary }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    private _builderForm() {
        this.usernameControl = new FormControl('', Validators.required);
        let form = this._formBuilder.group({
            username: this.usernameControl,
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.usernameControl.valueChanges
            .subscribe(text => {
                if (text == 'gzci24@gmail.com' ) {
                    this.userCache = this.usersTmp[0];
                } else {
                    this.userCache = undefined;
                }
            });

            // this.usernameControl.valueChanges
			// .debounceTime(400)
			// .distinctUntilChanged()
			// .flatMap(text => this._authSrv.validateUsername(text))
			// .subscribe(usernameExists => {
			// 	if (usernameExists) {
			// 		this.usernameControl.setErrors({ usernameExists });
			// 		this.usernameErrorMsg = 'Email is already used';
			// 		this._toastrSrv.show(this.usernameErrorMsg);
			// 	} else {
			// 		this.usernameErrorMsg = undefined;
			// 		this.usernameControl.setErrors(null);
			// 	};
			// });

        return form;
    }
}