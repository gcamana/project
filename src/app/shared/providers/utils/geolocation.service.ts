import { CommonService } from "../../../core/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

let END_POINT = 'api/maps/';

@Injectable()
export class GeolocationService {
    coords: ICoords;

    constructor(
        private _http: HttpClient,
        private _commonSrv: CommonService
    ) { }

    getPosition(): Observable<ICoords> {
        return Observable.create(observable => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.coords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            // lat: 42.2552023,
                            // lng: -71.8221044
                        };
                        observable.next(this.coords);
                        observable.complete();
                    },
                    error => {
                        this.coords = {
                            lat: 42.2552023,
                            lng: -71.8221044
                        }
                        observable.next(this.coords);
                        observable.complete();
                    },
                    {
                        enableHighAccuracy: true, timeout: 100000
                    }
                );
            } else {
                observable.throw("Browser doesn't support Geolocation");

            }
        })
    }

    getPositionByIPAddress(): Observable<IPosition> {
        return this._http.get('http://ip-api.com/json')
            .map((result: any) => {
                if (!result) throw 'Activate location.';

                return {
                    publicIP: result.query,
                    address: {
                        city: result.city,
                        state: result.region,
                        // state: result.regionName,
                        country: result.countryCode
                        // country: result.country
                    },
                    coords: {
                        lat: result.lat,
                        lng: result.lon
                    },
                    timezone: result.timezone
                };
            });
    }
}

export interface IPosition {
    publicIP?: string;
    address: IAddress;
    coords: ICoords;
    timezone?: string;
}
export interface IAddress {
    deliveryLine?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}
export interface ICoords {
    lat?: number;
    lng?: number;
    miles?: number;
}