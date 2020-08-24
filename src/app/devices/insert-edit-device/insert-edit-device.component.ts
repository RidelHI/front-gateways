import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-edit-device',
  templateUrl: './insert-edit-device.component.html',
  styleUrls: ['./insert-edit-device.component.scss']
})
export class InsertEditDeviceComponent implements OnInit {
  deviceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<InsertEditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.buildForm();
    if (this.data) {
      this.data.uid = this.data.uid + '';
      this.deviceForm.patchValue(this.data);
    }
  }

  buildForm() {
    const pattern = '^(0|[1-9][0-9]*)$';
    this.deviceForm = this.formBuilder.group({
      uid: ['', [Validators.required, Validators.pattern(pattern)]],
      vendor: ['', Validators.required],
      createdDate: [null, Validators.required],
      status: [null, Validators.required]
    });
  }

  getAction() {
    if (this.data) {
      return 'Edit';
    }
    return 'Insert';
  }

  save() {
    this.dialogRef.close(this.deviceForm.value);
  }
}
