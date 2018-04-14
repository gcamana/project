import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../../../objetos/Usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CuadroMandoService {
    public usuario: Usuario;
    _usuario: Observable<any> = null;
    public url: string;

    constructor(private _http: Http) {
        this.url = 'https://randomuser.me/api/';
    }

    setValores(user) {
        this._usuario = user;
    }

    __getUserData(__id_user) {
        if (!this._usuario) {
            this._usuario = this._http.get(this.url).map(res => res.json());
        }
        return this._usuario;
    }

    getGraficos(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/getGraficos', param, options)
            .map(res => res.json());
        return resultado;
    }

    graficoCobranzasGeneral(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/datosGraficoCobranzasGeneral', param, options)
            .map(res => res.json());
        return resultado;
    }

    graficoPagadoVsPendienteMes(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/datosGraficoPagadoPendienteMes', param, options)
            .map(res => res.json());
        return resultado;
    }

    graficoPagadoVsPendienteSede(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/datosGraficoPagadoPendienteSede', param, options)
            .map(res => res.json());
        return resultado;
    }

    graficoVencidoVSProntoPagoVSNormal(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/datosGraficoVencProntoPagoNormal', param, options)
            .map(res => res.json());
        return resultado;
    }

    graficoConcepto(obj) {
        let param = JSON.stringify(obj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        var resultado = this._http.post('http://localhost:3978/cuadro_mando/datosGraficosConcepto', param, options)
            .map(res => res.json());
        return resultado;
    }
}