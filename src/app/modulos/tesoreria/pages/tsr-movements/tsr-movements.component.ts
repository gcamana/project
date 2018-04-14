import { Location } from '@angular/common';
import { Component, ChangeDetectorRef, ViewChild, Renderer, HostListener } from '@angular/core';
import { SharedConstants } from '../../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
import * as jsPDF from 'jspdf';
import { IUser } from './../../models/user';
import { MatTableDataSource, MatPaginator, MatDialog, MatIconRegistry, MatSnackBar } from '@angular/material';
import { TsrMovementsService } from './tsr-movements.service';
import { TsrBankService } from '../tsr-bank/tsr-bank.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { CsPayModalComponent } from '../../components/cs-pay-modal/cs-pay-modal.component';
import { CsPaymentCommitmentModalComponent } from '../../components/cs-payment-commitment/cs-payment-commitment.component';
import { ActivatedRoute } from '@angular/router';
import { CsMovementsZoomModalComponent } from '../../components/cs-movements-zoom-modal/cs-movements-zoom-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { CsDiscountComponent } from '../../components/cs-discount-modal/cs-discount-modal.component';
import { CsEliminateDebtModalComponent } from '../../components/cs-eliminate-debt-modal/cs-eliminate-debt-modal.component';
import { CsAssingBecaComponent } from '../../components/cs-assing-beca-modal/cs-assing-beca-modal.component';
import { CsShareCashModalComponent } from '../../components/cs-share-cash-modal/cs-share-cash-modal.component';
import { CsOpenCashModalComponent } from '../../components/cs-open-cash-modal/cs-open-cash-modal.component';
import { CsWantBillModelComponent } from '../../components/cs-want-bill-modal/cs-want-bill-modal.component';
import { CsScheduleModalComponent } from '../../components/cs-schedule-modal/cs-schedule-modal.component';
import { CsCancelCommitmentModalComponent } from '../../components/cs-cancel-commitment-modal/cs-cancel-commitment-modal.component';
import { CsRefundMoneyModalComponent } from '../../components/cs-refund-money-modal/cs-refund-money-modal.component';
import { CsPassCreditModalComponent } from '../../components/cs-pass-credit-modal/cs-pass-credit-modal.component';
import { CsVaucherModalComponent } from '../../components/cs-vaucher-modal/cs-vaucher-modal.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { CsCreateConceptModalComponent } from '../../components/cs-create-concept-modal/cs-create-concept-modal.component';
import { CsCreateProviderModalComponent } from '../../components/cs-create-provider-modal/cs-create-provider-modal.component';
import { CsReturnExpensesComponent } from '../../components/cs-return-expenses-modal/cs-return-expenses-modal.component';
import { CsCancelExpenseComponent } from '../../components/cs-cancel-expenses-modal/cs-cancel-expenses-modal.component';
import { CsCreateVoucherModalComponent } from '../../components/cs-create-voucher-modal/cs-create-voucher-modal.component';

@Component({
    selector: 'tsr-movements-component',
    templateUrl: './tsr-movements.component.html',
    styleUrls: ['tsr-movements.component.scss'],
    providers: [TsrMovementsService, TsrBankService]
})


export class tsrMovementsComponent {
    private _mobileQueryListener: () => void;
    token: string;
    @ViewChild('tsrsidenav') tsrsidenav;
    mobileQuery: MediaQueryList;
    mobileQuery1: MediaQueryList;
    users: IUser[] = [];
    users_historical: IUser[] = [];

    mobileQuerySide: MediaQueryList;
    hideHeader: boolean = false;

    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    EMPTY_TESORERIA: string = SharedConstants.EMPTY_PATHS.EMPTY_TESORERIA;
    PAGADO: string = SharedConstants.ACCION.PAGADO;
    POR_PAGAR: string = SharedConstants.ACCION.POR_PAGAR;
    VENCIDO: string = SharedConstants.ACCION.VENCIDO;
    ANULADO: string = SharedConstants.ACCION.ANULADO;
    ESTUDIANTE: string = SharedConstants.ROLES.ESTUDIANTE;
    COLABORADOR: string = SharedConstants.ROLES.COLABORADOR;
    PROVEEDOR: string = SharedConstants.ROLES.PROVEEDOR;
    displayTitle: boolean = false;
    filter: string = null;
    current_money: number = null;
    move_chart = {};
    isEmpty: boolean = false;
    isEmptyTable: boolean = false;
    titleTable: string;
    user_selected = { first_name: null, last_name: null, last_name2: null, profile_image: null, role: null, id_user: null, has_prom : false, beca : null};
    messageEmpty: string = 'Realiza los pagos de una manera fácil desde una sola pantalla  mantente siempre informado de todos los registros';

    displayedColumns = ['select', 'description', 'total', 'paid', 'debt', 'action'];
    dataMovemets = new MatTableDataSource<Element>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public movementSel = [];
    public dataUser = {};
    public familiares = [];
    public hermanos = [];
    public conceptos = [];
    tipo_filtro = 1;
    selection = new SelectionModel<Element>(true, []);

    isOpen: boolean;
    isOpenFab: boolean;
    messageUserConnect: string;
    itemCheckList: any[] = [];
    isConfirm: boolean;
    filter_name: string;
    estado_caja: string;
    isOpenInformation: boolean = false;
    scroll: any;
    caja_share: any = { name : null, user : null, foto : null };
    metadata_move: any = {};
    data_secretaria:any = {document : 'TICKET'};

    collaboratorSon: any = [
        {
            foto_persona: "https://s3.amazonaws.com/smiledu/public/general/img/profile/nouser.svg",
            nombres: "Juan Carlos Ram��N Davila"
        }
    ]

    constructor(
        private _location: Location,
        private _media: MediaMatcher,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        public _tsrMovementsSrv: TsrMovementsService,
        public _tsrBankService: TsrBankService,
        public dialog: MatDialog,
        private _iconRegistry: MatIconRegistry,
        private _sanitizer: DomSanitizer,
        private _snackBar: MatSnackBar,
        private _renderer: Renderer
    ) {
        this.users = [];
        this.setMediaQuery();
        this.setIconSvg();
    }

    setIconSvg() {
        this._iconRegistry.addSvgIcon(
            'create_more',
            this._sanitizer.bypassSecurityTrustResourceUrl(SharedConstants.ICONS.CREATE_MORE));
    }

    setMediaQuery() {
        this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
        this.mobileQuery1 = this._media.matchMedia('(max-width: 768px)');
        this.mobileQuerySide = this._media.matchMedia('(max-width: 1279px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();

        this.mobileQuery.addListener(this._mobileQueryListener);
        this.mobileQuery1.addListener(this._mobileQueryListener);
        this.mobileQuerySide.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        let variables = this;
        this._activatedRoute.params.forEach(params => {
            sessionStorage.setItem('token', params.token);
            variables.token = params.token;
        });
        var obj = { token: this.token };
        this._tsrMovementsSrv.getHistoricBySecretary(obj).subscribe(
            result => {
                this.estado_caja = result.estado_caja;
                this.caja_share = {name : result.name, foto : result.foto, user : result.user, role : result.role};
                this.users_historical = result.movements;
                this.current_money = result.actual;
            },
            error => {
            }
        )
    }

    openInformation(id_movimiento) {
        let obj = { token   : this.token,
                    id_move : id_movimiento };
        this._tsrMovementsSrv.getInfoMovement(obj).subscribe(
            result => {
                this.metadata_move = result;
                this.isOpenInformation = true;
            },
            error => {

            }
        )
    }

    openToggle() {
        this.isOpen = !this.isOpen;
        console.log(this.token)
    }

    ngAfterViewInit() {
        this.dataMovemets.paginator = this.paginator;
        document.querySelector('mat-sidenav-content').scrollTop = 0;
        // this.scroll = new PerfectScrollbar('.cs-container__table');
    }

    @HostListener('scroll', ['$event'])
    onScrollOne(event) {
        this.setShadowOne(event);
    }

    @HostListener('scroll', ['$event'])
    onScrollTwo(event) {
        this.setShadowTwo(event);
    }

    setShadowOne(event) {
        let element = document.getElementById(`cs-click-1`);
        this.setClass(element, event)
    }

    setShadowTwo(event) {
        let element = document.getElementById('cs-click-2');
        let element2 = document.querySelector('.cs-figure-title');

        if (event.target.scrollTop == 0) {
            element2.classList.remove('sombra');
        } else {
            element2.classList.add('sombra');
        }

        this.setClass(element, event)
    }

    setClass(element, event) {
        let heighScroll = event.target.scrollHeight - event.target.clientHeight
        if (heighScroll == event.target.scrollTop) {
            element.classList.remove('sombra_1');
        } else {
            element.classList.add('sombra_1');
        }
    }

    backPage() {
        this._location.back();
    }

    goTofullscreen() {
        let dialogRef = this.dialog.open(CsMovementsZoomModalComponent, {
            panelClass: "cs-zoom-modal",
            data: {
                user_selected: this.user_selected,
                familiares: this.familiares,
                hermanos: this.hermanos,
                dataUser: this.dataUser,
                movementSel: this.movementSel,
                itemCheckList: this.itemCheckList,
                dataMovemets: this.dataMovemets,
                move_chart: this.move_chart
            },
            height: '100vh',
            width: '100vw'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.movementSel = result || this.movementSel;
        });
    }

    goToDiscount() {
        let dialogRef = this.dialog.open(CsDiscountComponent, {
            width: '320px',
            data: {},
            // panelClass:'cs-error-control cs-discount-modal'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
    goToCancelExpenses(element, idx) {
        let dialogRef = this.dialog.open(CsCancelExpenseComponent, {
            width: '640px',
            data: {element : element},
            // panelClass:'cs-error-control cs-discount-modal'
        });
        dialogRef.componentInstance.cancelExpense.subscribe(
            datos => {
                let params = {
                    token: this.token,
                    id_mov: datos.id_move,
                    observacion: datos.observation,
                    role: this.user_selected.role
                };
                this._tsrMovementsSrv.anularEgreso(params).subscribe(
                    result => {
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                        dialogRef.close();
                        this.move_chart = { categorias: result.categorias, last_move: result.last_move };
                        this.current_money = this.current_money + parseFloat(result.monto);
                        this.dataMovemets["filteredData"].splice(idx,1);
                        this.dataMovemets = new MatTableDataSource<Element>(this.dataMovemets["filteredData"]);
                        this.dataMovemets.paginator = this.paginator;
                    },
                    error => {
                        error = JSON.parse(error._body);
                        this._snackBar.open(error.msj, 'cerrar', {
                            duration: 2000,
                        });
                    }
                )
            }
        )
    }
    goToRetunExpenses(elemen, idx) {
        let dialogRef = this.dialog.open(CsReturnExpensesComponent, {
            width: '320px',
            data: {idx : idx}
        });
        dialogRef.componentInstance.saveReturn.subscribe(
            datos => {
                let obj = {token      : this.token,
                           id_mov     : elemen.id_move,
                           amount     : datos.values.amount,
                           observation: datos.values.observation};
                this._tsrMovementsSrv.saveReturnMoney(obj).subscribe(
                    result => {
                        this.current_money = parseFloat((this.current_money + parseFloat(datos.values.amount)).toFixed(2));
                        dialogRef.close();
                        elemen.flg_vuelto = true;
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                    },
                    error => {
                        error = JSON.parse(error._body);
                        this._snackBar.open(error.msj, 'cerrar', {
                            duration: 2000,
                        });
                    }
                )
                
            }
        )
    }

    goToEliminateDebt(idx) {
        let dialogRef = this.dialog.open(CsEliminateDebtModalComponent, {
            width: '320px',
            data: {}
        });
        console.log(this.dataMovemets);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    goToAssingBeca() {
        let obj = { token   : this.token,
                    id_estu : this.user_selected.id_user };
        this._tsrMovementsSrv.getDataBeca(obj).subscribe(
            result => {
                let dialogRef = this.dialog.open(CsAssingBecaComponent, {
                    width: '280px',
                    data: {element : this.user_selected, dataCombo : result}
                });

                dialogRef.componentInstance.assingRemoveProm.subscribe(
                    data => {
                        let obj = { token          : this.token,
                                    id_estu        : this.user_selected.id_user,
                                    id_condicion   : data.beca,
                                    year_condicion : data.year,
                                    flg_prom       : data.flg_prom};
                        this._tsrMovementsSrv.assingRemovePromotion(obj).subscribe(
                            result => {
                                this.dataMovemets = new MatTableDataSource<Element>(result.movements);
                                this.dataMovemets["filteredData"] = this.dataMovemets["filteredData"] || [];
                                if (this.dataMovemets["filteredData"].length != 0) {
                                    this.displayedColumns = ['select', 'description', 'total', 'paid', 'debt', 'date_pay', 'action', 'more'];
                                    this.dataMovemets.paginator = this.paginator;
                                    document.querySelector('mat-sidenav-content').scrollTop = 0;
                                    this.isEmptyTable = true;
                                } else {
                                    this.isEmptyTable = false;
                                }
                                this._snackBar.open(result.msj, 'cerrar', {
                                    duration: 2000,
                                });
                                dialogRef.close();
                                if(data.flg_prom == '1'){
                                    this.user_selected.has_prom = true;
                                    this.user_selected.beca     = result.json_beca;
                                } else{
                                    this.user_selected.has_prom = false;
                                    this.user_selected.beca     = null;
                                }
                            },
                            error => {
                                error = JSON.parse(error._body);
                                this._snackBar.open(error.msj, 'cerrar', {
                                    duration: 2000,
                                });
                            }
                        )
                    }
                )
            },
            error => {
                console.log(error);
            }
        )
    }

    goToWantBill() {
        let dialogRef = this.dialog.open(CsWantBillModelComponent, {
            width: '280px',
            data: { data_secretaria : this.data_secretaria,
                    data_user       : this.user_selected }
        });
        dialogRef.componentInstance.saveBill.subscribe(
            data => {
                let obj = { token       : this.token,
                            ruc         : data.ruc,
                            razonSocial : data.razonSocial,
                            direction   : data.direction,
                            id_user : this.user_selected.id_user };
                this._tsrMovementsSrv.saveFactura(obj).subscribe(
                    result => {
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                        dialogRef.close();
                    },
                    error => {
                        error = JSON.parse(error._body);
                        this._snackBar.open(error.msj, 'cerrar', {
                            duration: 2000,
                        });
                    }
                );
            }
        )

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openDialogCash(flg) {
        let dialogRef = this.dialog.open(CsOpenCashModalComponent, {
            width: "680px",
            data: { flg: flg }
        });

        dialogRef.componentInstance.actionCaja.subscribe(result => {
            var obj = {
                token: this.token,
                flg: result
            };
            this._tsrMovementsSrv.actionCaja(obj).subscribe(
                result => {
                    this.estado_caja = result.estado;
                    this._snackBar.open(result.msj, 'cerrar', {
                        duration: 2000,
                    });
                    dialogRef.close();
                },
                error => {
                    error = JSON.parse(error._body);
                    this._snackBar.open(error.msj, 'cerrar', {
                        duration: 2000,
                    });
                }
            )
        });
    }

    closeSidenav() {
        this.tsrsidenav.close();

        this.hideHeader = false;

        document.querySelectorAll('.mat-drawer-content')[0].classList.remove('cs-overflow');
        document.querySelectorAll('header-component')[0].classList.remove('display-none');
    }
    openSidenav() {
        this.tsrsidenav.toggle();

        this.hideHeader = true;
        document.querySelectorAll('.mat-drawer-content')[0].classList.add('cs-overflow');
        document.querySelectorAll('header-component')[0].classList.add('display-none');
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.mobileQuery1.removeListener(this._mobileQueryListener);
        this.mobileQuerySide.removeListener(this._mobileQueryListener);
        // this.scroll.destroy()
    }

    filterUsers(event, flg) {
        if ((event != null && event.keyCode == 13 && this.filter.length > 3) || flg == 1) {
            this.isOpen = true;
            var obj = {
                token: this.token,
                filter: this.filter,
                tipo_filtro: this.tipo_filtro
            };
            this._tsrMovementsSrv.getUsersFilter(obj).subscribe(
                result => {
                    this.users = result;
                    if (this.users.length == 0)
                        this.messageUserConnect = "No se encontraron resultados"
                    else
                        this.messageUserConnect = ""
                },
                error => {

                }
            )
        }
    }

    toggleMoreFabs() {
        this.isOpenFab = !this.isOpenFab;
    }

    openPayDialog(): void {
        let dialogRef = this.dialog.open(CsPayModalComponent, {
            width: '360px',
            backdropClass: 'cs-pay-modal-backdrop',
            panelClass: 'cs-pay-modal',
            data: { user: this.user_selected, concepts: this.movementSel }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

    openShareCash() {
        let dialogRef = this.dialog.open(CsShareCashModalComponent, {
            width: '320px',
            panelClass: 'cs-share-cash-modal',
            data: {caja_share : this.caja_share}
        });
        dialogRef.componentInstance.shareCash.subscribe(
            result => {
                this.caja_share = result;
            }
        )
    }

    openCancelCommitment(element, idx) {
        let dialogRef = this.dialog.open(CsCancelCommitmentModalComponent, {
            width: '640px',
            panelClass: 'cs-cancel-commitment-modal',
            data: {element : element}
        });
        dialogRef.componentInstance.saveCancel.subscribe(
            data_mov => {
                idx
                let obj = { token       : this.token,
                            observacion : data_mov.observation,
                            id_mov      : data_mov.id_move};
                this._tsrMovementsSrv.cancelCommitment(obj).subscribe(
                    result => {
                        console.log(result);
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                        dialogRef.close();
                    },
                    error => {
                        console.log(error);
                        error = JSON.parse(error._body);
                        this._snackBar.open(error.msj, 'cerrar', {
                            duration: 2000,
                        });
                    }
                )
                console.log(data_mov);
            }
        );
        
    }

    openRefundMoney() {
        let dialogRef = this.dialog.open(CsRefundMoneyModalComponent, {
            width: '320px',
            panelClass: 'cs-refund-money-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        })
    }
    openPassCredit() {
        let dialogRef = this.dialog.open(CsPassCreditModalComponent, {
            width: '280px',
            panelClass: 'cs-pass-credit-modal',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        })
    }

    openVaucher(element) {
        let obj = { token  : this.token,
                    id_move: element.id_move };
        this._tsrMovementsSrv.getDocumentsByMovement(obj).subscribe(
            result => {
                console.log(result);
                let dialogRef = this.dialog.open(CsVaucherModalComponent, {
                    width: '320px',
                    panelClass: 'cs-vaucher-modal',
                    data: {id_move : element.id_move, documents : result.documents}
                });
            },
            error => {
                console.log(error);
            }
        )
    }

    openScheduleModal() {
        let dialogRef = this.dialog.open(CsScheduleModalComponent, {
            width: "640px",
            data: {},
            panelClass: 'cs-schedule-modal'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    openCreateConcept() {
        let obj = { token : this.token };
        this._tsrMovementsSrv.getDataConceptos(obj).subscribe(
            result => {
                let dialogRef = this.dialog.open(CsCreateConceptModalComponent, {
                    width: "640px",
                    panelClass: "",
                    data: {result : result}
                });
                dialogRef.componentInstance.refreshConcepts.subscribe(
                    result => {
                        if( (result.type_move == SharedConstants.ACCION.INGRESO && this.user_selected.role == SharedConstants.ROLES.ESTUDIANTE) ||
                            (result.type_move == SharedConstants.ACCION.EGRESO && (this.user_selected.role == SharedConstants.ROLES.PROVEEDOR || this.user_selected.role == SharedConstants.ROLES.COLABORADOR))  ){
                            this.conceptos.splice(0 , 0, result);
                        }
                    }
                )
            },
            error => {

            }
        )
    }

    openCreateProvider() {
        let obj = { token : this.token };
        this._tsrMovementsSrv.getProvidersData(obj).subscribe(
            result => {
                let dialogRef = this.dialog.open(CsCreateProviderModalComponent, {
                    width: "640px",
                    panelClass: "",
                    data: {result : result}
                });
            },
            error => {

            }
        )
    }
    openCreateVoucher() {
        let obj = { token : this.token };
        this._tsrMovementsSrv.getProvidersData(obj).subscribe(
            result => {
                let dialogRef = this.dialog.open(CsCreateVoucherModalComponent, {
                    width: "860px",
                    data: {}
                });
            },
            error => {

            }
        )
    }

    openRegisterConcept() {
        let dialogRef = this.dialog.open(CsPaymentCommitmentModalComponent, {
            width: '320px',
            data: {
                conceptos: this.conceptos,
                role: this.user_selected.role,
                profile_image: this.user_selected.profile_image,
                first_name: this.user_selected.first_name,
                last_name: this.user_selected.last_name,
                last_name2: this.user_selected.last_name2,
            }
        });

        dialogRef.componentInstance.registerComp.subscribe(
            result => {
                let obj = {
                    concepto: result.concepto,
                    monto: result.monto,
                    observacion: result.observacion,
                    role: this.user_selected.role,
                    token: this.token,
                    id_user: this.user_selected.id_user
                };
                this._tsrMovementsSrv.saveComp(obj).subscribe(
                    result => {
                        this.dataMovemets = new MatTableDataSource<Element>(result.movements);
                        this.dataMovemets.paginator = this.paginator;
                        this._snackBar.open(result.msj, 'cerrar', {
                            duration: 2000,
                        });
                        dialogRef.close();
                        if (this.user_selected.role != this.ESTUDIANTE) {
                            this.current_money = result.actual;
                            this.crearReciboEgreso(result.recibo);
                        }
                    },
                    error => {
                        this._snackBar.open(error._body, 'cerrar', {
                            duration: 2000,
                        });
                    }
                );
            }
        )
    }

    selectUser(event) {
        console.log(event);
        this.isOpenInformation = false;
        this.user_selected = event;
        //this.idx_estu_selected = 
        this.titleTable = `${event.first_name} ${event.last_name}`;
        this.messageEmpty = "No tiene información pendiente";
        var obj = {
            id_user: event.id_user,
            role: event.role,
            token: this.token
        };

        this.movementSel = [];
        this._tsrMovementsSrv.getDataMovements(obj).subscribe(
            result => {
                this.dataMovemets = new MatTableDataSource<Element>(result.movements);
                this.move_chart = result;
                this.conceptos = result.conceptos;
                this.dataMovemets["filteredData"] = this.dataMovemets["filteredData"] || [];
                if (this.dataMovemets["filteredData"].length != 0) {
                    if (event.role == 'ESTUDIANTE') {
                        this.displayedColumns = ['select', 'description', 'total', 'paid', 'debt', 'date_pay', 'action', 'more'];
                    } else {
                        this.displayedColumns = ['description', 'total', 'date_regi', 'more'];
                    }
                    this.dataMovemets.paginator = this.paginator;
                    document.querySelector('mat-sidenav-content').scrollTop = 0;
                    this.isEmptyTable = true;

                } else {
                    this.isEmptyTable = false;
                }
            },
            error => {

            }
        )

        this._tsrMovementsSrv.personalInfoUser(obj).subscribe(
            result => {
                this.dataUser = result;

                this.isEmpty = true;

                this.familiares = result.json_familiares || [];
                this.hermanos = result.json_hermanos || [];
            },
            error => {
                console.log(error);
            }
        )
    }

    checkedMovement(event, element) {
        if (event.checked) {
            this.itemCheckList.push(this.selection.selected);
            this.movementSel.push({
                id: element.id_move,
                desc: element.description,
                total: element.debt
            });

        } else {
            for (let i in this.movementSel) {
                if (element.id_move == this.movementSel[i].id) {
                    this.movementSel.splice(parseInt(i), 1);
                }
            }
        }
    }

    getMovimientosPendientes(flg_mov) {
        var obj = {
            token: this.token,
            user: this.user_selected,
            flg_mov: flg_mov
        };
        this.isOpenInformation = false;
        this._tsrMovementsSrv.filterMovimientosByFlg(obj).subscribe(
            result => {
                this.dataMovemets = new MatTableDataSource<Element>(result.movements);
                this.dataMovemets.paginator = this.paginator;
                this.dataMovemets["filteredData"] = this.dataMovemets["filteredData"] || [];
                this.isEmptyTable = this.dataMovemets["filteredData"].length != 0 ? true : false;
            },
            error => {
                console.log(error);
            }
        )

        console.log(this.user_selected)
    }

    crearReciboEgreso(recibo) {
        const doc = new jsPDF({
            orientation : 'p', 
            unit        : 'cm',
            format      : [11, 7.5]});
        var currentdate = new Date(); 
        var datetime =    currentdate.getDate() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getFullYear() + " "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        doc.setFontSize(12);
        doc.setFont("helvetica");
        var filaInicioDetalle = 0.7;
        var aumento 		  = 0.5;
        var filaInicio        = 3.5;
        filaInicioDetalle = filaInicioDetalle + aumento;
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('RUC: '+ recibo.ruc) / 4.5);
        doc.text(xOffset, filaInicioDetalle, 'RUC: '+ recibo.ruc);
        filaInicioDetalle = filaInicioDetalle + aumento;
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Fecha: ' + recibo.fecha) / 4.5);
        doc.text(xOffset, filaInicioDetalle, 'Fecha: ' + recibo.fecha);
        filaInicioDetalle = filaInicioDetalle + aumento;
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Hora: '  + recibo.hora) / 4.5);
        doc.text(xOffset, filaInicioDetalle, 'Hora: '  + recibo.hora);
        filaInicioDetalle = filaInicioDetalle + aumento;
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Secretaria: ' + recibo.usuario) / 4.5);
        doc.text(xOffset, filaInicioDetalle, 'Secretaria: ' + recibo.usu_reg);
        filaInicioDetalle = filaInicioDetalle + aumento;
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Num Ope : ' + recibo.nro_documento) / 4.5);
        doc.text(xOffset, filaInicioDetalle, 'Num Ope : ' + recibo.nro_documento);
        //CUOTA
        doc.text(0.8  , (filaInicioDetalle+1.5) , recibo.desc_concepto);
        doc.text(0.8  , (filaInicioDetalle+2.2) , 'Total');
        //TOTAL
        doc.text(5 , (filaInicioDetalle+1.5) , recibo.monto);
        doc.text(5 , (filaInicioDetalle+2.2) , recibo.monto);
        doc.setFontSize(11);
        doc.text(1 , (filaInicioDetalle+3.5) , 'Cliente : ' + recibo.nombre);
        doc.save('ticket.pdf');
    }

    filterByTipo(tipo_filtro, title) {
        this.filter_name = title;
        this.tipo_filtro = tipo_filtro;
        this.filterUsers(null, 1);
    }
}

