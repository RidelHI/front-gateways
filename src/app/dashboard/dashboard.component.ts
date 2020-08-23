import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {GatewaysService} from '../services/gateways.service';
import {Gateway} from '../models/gateway';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['serialNumber', 'name', 'ipv4Address', 'devices'];
  gateways: Gateway[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private gatewaysService: GatewaysService) {}

  ngOnInit(): void {
    this.fillGatewaysData();
  }

  fillGatewaysData() {
    this.gatewaysService.findAll().subscribe((data: Gateway[]) => {
      this.gateways = data;
    });
  }

  redirectToUpdate(id: any) {}

  redirectToDelete(id: any) {}
}
