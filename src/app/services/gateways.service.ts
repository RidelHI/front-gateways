import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Gateway } from '../models/gateway';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewaysService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${environment.BASE_API_URL}/gateways`);
  }

  findById(gatewayId: string): Observable<any> {
    return this.http.get(`${environment.BASE_API_URL}/gateways/${gatewayId}`);
  }

  findDevicesByGatewayId(gatewayId: string) {
    return this.http.get(`${environment.BASE_API_URL}/gateways/${gatewayId}/devices`);
  }

  create(gateway: Gateway): Observable<any> {
    return this.http.post(`${environment.BASE_API_URL}/gateways`, gateway);
  }

  update(gateway: Gateway, id: string): Observable<any> {
    return this.http.put(`${environment.BASE_API_URL}/gateways/${id}`, gateway);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.BASE_API_URL}/gateways/${id}`);
  }
}
