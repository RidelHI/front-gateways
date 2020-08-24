import { Component, OnInit } from '@angular/core';
import { Gateway } from '../models/gateway';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GatewaysService } from '../services/gateways.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InsertEditGatewayComponent } from './insert-edit-gateway/insert-edit-gateway.component';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fillGatewaysData();
  }

  fillGatewaysData() {
    this.gatewaysService.findAll().subscribe((data: Gateway[]) => {
      this.gateways = data;
    });
  }

  redirectToUpdate(id: any) {
    this.router.navigate([`/admin/devices/${id}`]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(InsertEditGatewayComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
