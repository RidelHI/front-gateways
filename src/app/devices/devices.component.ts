import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../services/devices.service';
import { GatewaysService } from '../services/gateways.service';
import { Device } from '../models/device';
import { GenericConfirmComponent } from '../shared/generic-confirm/generic-confirm.component';
import { MatDialog } from '@angular/material/dialog';

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
    private gatewaysService: GatewaysService,
    public dialog: MatDialog
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

  openDialogRemove(device: Device) {
    const dialogRef = this.dialog.open(GenericConfirmComponent, {
      data: { title: 'Confirm', content: 'Are you sure you want to delete the Device?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.devicesService.deleteByGatewayId(this.gatewayId, device._id).subscribe(
          () => {
            this.loadDevices();
          },
          () => {
            console.log('Error to delete device');
          }
        );
      }
    });
  }
}
