import { Component, OnInit } from '@angular/core';
import { Gateway } from '../models/gateway';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GatewaysService } from '../services/gateways.service';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {
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
