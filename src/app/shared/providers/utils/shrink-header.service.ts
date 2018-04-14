import { CommonService } from "../../../core/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter, Output } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from "rxjs";

@Injectable()
//-TODO:cambiar para darle mejor nombre
export class ShrinkHeaderService {
    private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();

    suscriber: EventEmitter<any>;

    constructor() {
        this.suscriber = new EventEmitter<any>();
    }

    changeMessage(message: string) {
        this.messageSource.next(message)
      }
}