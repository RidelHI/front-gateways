import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../services/devices.service';
import { GatewaysService } from '../services/gateways.service';
import { Device } from '../models/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  subscriptionActivatedRoute: Subscription;
  gatewayId: string;
  devices: Device[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private devicesService: DevicesService,
    private gatewaysService: GatewaysService
  ) {}

  ngOnInit(): void {
    this.subscriptionActivatedRoute = this.activatedRoute.paramMap.subscribe(paramMap => {
      this.gatewayId = paramMap.get('id');
      this.loadDevices();
    });
  }

  loadDevices() {
    this.gatewaysService.findDevicesByGatewayId(this.gatewayId).subscribe((data: Device[]) => {
      this.devices = data;
    });
  }
}
