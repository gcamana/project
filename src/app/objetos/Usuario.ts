export class Usuario {
    constructor(
        public nombre       : string,
        public email        : string,
        public sede         : number,
        public persona      : string,
        public rol          : string,
        public id_cargo     : number,
        public flg_padre    : boolean,
        public cod_familiar : string
    ) {}
}