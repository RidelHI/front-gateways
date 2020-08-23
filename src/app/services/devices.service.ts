import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Gateway } from '../models/gateway';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  findById(deviceId: string) {
    return this.http.get(`${environment.BASE_API_URL}/devices/${deviceId}`);
  }

  create(device: Device) {
    return this.http.post(`${environment.BASE_API_URL}/devices`, device);
  }

  update(device: Device, id: string) {
    return this.http.put(`${environment.BASE_API_URL}/devices/${id}`, device);
  }

  deleteByGatewayId(gatewayId: string, deviceId: string): Observable<any> {
    return this.http.delete(`${environment.BASE_API_URL}/devices/${deviceId}/gateways/${gatewayId}`);
  }
}
