import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-edit-gateway',
  templateUrl: './insert-edit-gateway.component.html',
  styleUrls: ['./insert-edit-gateway.component.scss']
})
export class InsertEditGatewayComponent implements OnInit {
  gatewaysForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<InsertEditGatewayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.buildForm();
    if (this.data) {
      this.gatewaysForm.patchValue(this.data);
    }
  }

  buildForm() {
    const ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
    this.gatewaysForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      ipv4Address: ['', [Validators.required, Validators.pattern(ipPattern)]]
    });
  }

  save() {
    console.log(this.gatewaysForm.value);
    this.dialogRef.close(this.gatewaysForm.value);
  }

  getAction() {
    if (this.data) {
      return 'Edit';
    }
    return 'Insert';
  }
}
