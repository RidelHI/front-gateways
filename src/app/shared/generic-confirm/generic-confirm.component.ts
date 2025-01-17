import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-confirm',
  templateUrl: './generic-confirm.component.html',
  styleUrls: ['./generic-confirm.component.scss']
})
export class GenericConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
