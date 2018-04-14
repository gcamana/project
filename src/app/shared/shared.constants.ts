var data = require('./../../../../api.json');
export class SharedConstants {
    static get STORAGE_KEYS() {
        return {
            OWNER: {
                TOKEN: 'owner-token',
                DATA: 'owner-data'
            },

        };
    }


    static get links() {
        return {
            GOOGLE_PLAY_URL: 'https://play.google.com/store?hl=en',
            ITUNES_URL: 'https://www.apple.com/itunes/',
            SMILEDU: 'https://avantgard.smiledu.pe'
        };
    }

    static get ICONS() {
        return {
            MAGIC_SEARCH: 'assets/images/icons/magic_search.svg',
            CUP: 'assets/images/icons/cup.svg',
            PIN_UP: 'assets/images/icons/pin-up.svg',
            CREATE_MORE: 'assets/images/icons/create_more.svg',
            VISA: 'assets/images/icons/visa.png',
            MASTERCARD: 'assets/images/icons/mastercard.png',
            ICON_FACEBOOK: 'assets/images/icons/icon-facebook.png',
            ICON_GOOGLE: 'assets/images/icons/icon-google.png',
            ICON_OUTLOOK: 'assets/images/icons/icon-outlook.png',
            LOGO_GRAY: 'assets/images/icons/icon_logo_gray.png',
            ICON_FACEBOOK_GRAY: 'assets/images/icons/icon_facebook_gray.png',
            ICON_INSTA_GRAY: 'assets/images/icons/icon_instagran_gray.png',
            ICON_TWITTER_GRAY: 'assets/images/icons/icon_twitter_gray.png',
            ICON_LINKEDIN_GRAY: 'assets/images/icons/icon_linkedin_gray.png',
            MESSAGE_HELP: 'assets/images/icons/message_help.png',
            LOVE_SCHOOL: 'assets/images/login/love-school.png',
            SMILEDU_ICO: 'assets/images/login/smiledu-ico.png',
            SEARCH_MAGIC: 'assets/images/icons/search_magic.png',

        }
    }
    static get PATHS() {
        return {
            CARLOS: 'assets/images/user/carlos.png',
            MUJER: 'assets/images/user/mujer.jpeg',
            CARLOS_BG: 'assets/images/bsc/bg.jpg',
            UNKNOWN_USER_IMAGE: 'assets/images/user/unknown-user.svg',
            UNKNOWN_LOGO_IMAGE: "./assets/img/logo.png",
            DEFAULT_BG_IMAGE: 'assets/images/bsc/bg.jpg',
            DEFAULT_LOGO: 'assets/images/circlelogo.png',
            DEFAULT_PROPERTIES: './assets/img/single-property-01.jpg',
            DEFAULT_HOME: './assets/img/listing-01.jpg',
            BSC: {
                FRAME_1: 'assets/images/bsc/frame-1.png',
                ARROW_MAGIC: 'assets/images/bsc/search-magic-arrow.png'
            },
            SMILEDU_FACES: {
                STATE_CIERRE :'assets/img/smiledu_faces/empty_state_cierre.png'
            },
            TSR: {
                BN:'assets/images/tsr/bn.png',
                BANCO_COMERCIO:'assets/images/tsr/banco-comercio.png',
                BANCO_FINANCIERA:'assets/images/tsr/banco-financiera.png',
                BBVA:'assets/images/tsr/bbva.png',
                BCP:'assets/images/tsr/bcp.png',
                CITIBANK:'assets/images/tsr/citibank.png',
                MIBANCO:'assets/images/tsr/mibanco.png',
                SCOTIABANK:'assets/images/tsr/scotiabank.png',
                SISCONT:'assets/images/tsr/siscont.png',
                BANBIF:'assets/images/tsr/banbif.png',
            }
        };
    };


    static get ACCION() {
        return {
            PAGADO:"PAGADO",
            ANULADO:"ANULADO",
            POR_PAGAR: "POR PAGAR",
            VENCIDO:"VENCIDO",
            EGRESO: "EGRESO",
            INGRESO: "INGRESO",
            EGRESOS: "EGRESOS",
            INGRESOS: "INGRESOS"
        }
    }

    static get EMPTY_PATHS() {
        return {
            EMPTY :'assets/img/smiledu_faces/empty-login-out.png',
            STATE_CIERRE :'assets/img/smiledu_faces/empty_state_cierre.png',
            BANDEJA :'assets/img/smiledu_faces/empty_bandeja.png',
            HISTORY :'assets/img/smiledu_faces/empty-history_1.png',
            SEARCH_1 :'assets/img/smiledu_faces/empty-search_1.png',
            SEARCH_2 :'assets/img/smiledu_faces/search-2_1.png',
            CHART :'assets/img/smiledu_faces/empty-chart_1.png',
            FILTER :'assets/img/smiledu_faces/not_filter_fab.png',
            MAGIC_NO_FOUND :'assets/img/smiledu_faces/magic_not_found.png',
            EMPTY_TESORERIA :'assets/img/smiledu_faces/empty-tesoreria.png',
        };
    };

    static get ROLES() {
        return {
            PROMOTOR: 'promotor',
            ALUMNO:'alumno',
            ESTUDIANTE:'ESTUDIANTE',
            COLABORADOR:'COLABORADOR',
            PROVEEDOR:'PROVEEDOR'
        };
    }

    static get LEGEND() {
        return {
            COLOR_VERDE: 'Valor meta',
            ZONA_OPTIMA: 'Zona óptima',
            COLOR_AMARILLO: 'Zona de riesgo',
            ZONA_CRITICIDAD: 'Zona de criticidad',
            META: 'Meta y comparativa superadas',
            VALOR_INICIAL: 'Valor inicial',
            VALOR_FINAL: 'Valor final'
        };
    }

    static get messages() {
        return {
            error: {
                SELECT_USER: 'You must select a user type.',
                CONNECT_WITH_FACEBOOK: 'Connect with Facebook in a real device.',
                UPLOAD_FILE: 'Unable to upload the image. Try, again later.',
                RETRIEVING_DATA: 'Error retrieving data.',
                SAVING_DATA: 'Error Saving Data.',
                PHONE_NUMBER: 'No phone number provided.',
                PASSWORD_MATCH: 'Passwords must match.',
                USERNAME_EXISTS: 'Username already exists.',
                ENTER_REQUIRED_INFO: 'Please, enter all the required information.',
                ENTER_NMLS: 'You must enter a NMLS number.',
                ENTER_PHONE: 'You must enter a phone number.'
            },
            info: {
                LOGGING_IN: 'Logging in, please wait...',
                SEARCHING_AGENTS: 'Searching Agents...',
                SEARCHING_BUYERS: 'Searching Buyers...',
                RETRIEVING_DATA: 'Retrieving data...',
                DEFAULT_HOME_MESSAGE: 'Look at this house, it seems very interesting.',
                SAVING_DATA: 'Saving Data...'
            },
            empty : {
                YOU_DO_NOT_HAVE_ANY : 'You do not have any',
                FULL_MESSAGE: 'Did not find nothing',
                INVITE_MESSAGE : 'Send message to start connection'
            }
        };
    };

    static get modulos() {
        return {
            LOGIN: 'login',
            TESORERIA: {
                name: 'tesoreria',
                pages: {
                    MOVIMIENTOS  : 'movimientos',
                    INGRESOS     : 'ingresos',
                    EGRESOS      : 'egresos',
                    CAJA         : 'caja',
                    MIGRACION    : 'migracion',
                    CONFIGURACION: 'configuracion'
                }
            },
            CALIFICACIONES: 'calificaciones',
            BSC: {
                name: 'bsc',
                pages: {
                    MAIN: 'main',
                    DETALLE_INDICADOR: 'detalle_indicador',
                    DASHBOARD: 'dashboard'
                }
            },
            MATRICULA: 'matricula',
            GENERAL: 'general',
            ENROLLMENT: {
                name: 'matricula'
            },
            GRADING: {
                name: 'notas'
            },
            RESOURCES: {
                name: 'rrhh'
            },
            PLANNING: {
                name: 'plan-inst'
            }
        }
    }

    static get api() {
        return {
            HOST: data.api
        }
    }
}