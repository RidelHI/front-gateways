import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService } from '../services/devices.service';
import { GatewaysService } from '../services/gateways.service';
import { Device } from '../models/device';
import { GenericConfirmComponent } from '../shared/generic-confirm/generic-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { InsertEditDeviceComponent } from './insert-edit-device/insert-edit-device.component';
import { UtilService } from '../services/util.service';
import { ToastrService } from 'ngx-toastr';

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
    public dialog: MatDialog,
    private utilService: UtilService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.utilService.subjectSectionName.next('Devices');
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

  openDialog(device: Device) {
    const dialogRef = this.dialog.open(InsertEditDeviceComponent, {
      width: '600px',
      data: device
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!device) {
          result.gatewayId = this.gatewayId;
          this.devicesService.create(result).subscribe(
            res => {
              this.toastrService.success('Device inserted correctly!', 'Success');
              this.loadDevices();
            },
            error => {
              if (error.error.statusCode === 400) {
                this.toastrService.error(error.error.message, 'Error');
              } else {
                this.toastrService.error('Device insert failed', 'Error');
              }
            }
          );
        } else {
          this.devicesService.update(result, device._id).subscribe(
            res => {
              this.toastrService.success('Device updated correctly!', 'Success');
              this.loadDevices();
            },
            error => {
              if (error.error.statusCode === 400) {
                this.toastrService.error(error.error.message, 'Error');
              } else {
                this.toastrService.error('Device update failed', 'Error');
              }
            }
          );
        }
      }
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
            this.toastrService.success('Device removed correctly!', 'Success');
            this.loadDevices();
          },
          () => {
            this.toastrService.error('Failed to remove device', 'Error');
          }
        );
      }
    });
  }
}
