/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  constructor(private http: HttpClient) {}

  getShipments(page: number) {
    return this.http.get('/assets/mock_data/shipment-list.json');
  }

  getShipmentDetails(id: string) {
    return this.http.get('/assets/mock_data/shipment-details.json');
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  constructor(private http: HttpClient) {}

  getShipments(page: number): Observable<any> {
    // Mocking pagination; adjust according to actual data structure
    return this.http.get<any>(`/assets/mock_data/shipment-list.json`);
  }

  getShipmentDetails(shipmentNo: string | null): Observable<any> {
    return this.http.get<any>(`/assets/mock_data/shipment-details.json`);
  }

  private data = new Subject<any>();
  data$ = this.data.asObservable();

  setData(data: {}) {
    this.data.next(data);
  }
}

