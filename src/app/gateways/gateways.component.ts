import { Component, OnInit } from '@angular/core';
import { Gateway } from '../models/gateway';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GatewaysService } from '../services/gateways.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InsertEditGatewayComponent } from './insert-edit-gateway/insert-edit-gateway.component';
import { UtilService } from '../services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {
  displayedColumns: string[] = ['serialNumber', 'name', 'ipv4Address', 'update', 'devices'];
  gateways: Gateway[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private gatewaysService: GatewaysService,
    private router: Router,
    public dialog: MatDialog,
    private utilService: UtilService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.utilService.subjectSectionName.next('Gateways');
    this.loadGateways();
  }

  loadGateways() {
    this.gatewaysService.findAll().subscribe((data: Gateway[]) => {
      this.gateways = data;
    });
  }

  navigateToDevices(id: any) {
    this.router.navigate([`/admin/devices/${id}`]);
  }

  openDialog(gateway: Gateway) {
    const dialogRef = this.dialog.open(InsertEditGatewayComponent, {
      width: '600px',
      data: gateway
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!gateway) {
          this.gatewaysService.create(result).subscribe(
            res => {
              this.toastrService.success('Gateway inserted correctly!', 'Success');
              this.loadGateways();
            },
            error => {
              if (error.error.statusCode === 400) {
                this.toastrService.error(error.error.message, 'Error');
              } else {
                this.toastrService.error('Gateway insert failed', 'Error');
              }
            }
          );
        } else {
          this.gatewaysService.update(result, gateway._id).subscribe(
            res => {
              this.toastrService.success('Gateway updated correctly!', 'Success');
              this.loadGateways();
            },
            error => {
              if (error.error.statusCode === 400) {
                this.toastrService.error(error.error.message, 'Error');
              } else {
                this.toastrService.error('Gateway update failed', 'Error');
              }
            }
          );
        }
      }
    });
  }
}
