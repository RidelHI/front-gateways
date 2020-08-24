import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-edit-gateway',
  templateUrl: './insert-edit-gateway.component.html',
  styleUrls: ['./insert-edit-gateway.component.scss']
})
export class InsertEditGatewayComponent implements OnInit {
  gatewaysForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
    this.gatewaysForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      ipv4Address: ['', [Validators.required, Validators.pattern(ipPattern)]]
    });
  }
}
