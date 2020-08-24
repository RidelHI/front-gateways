import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericConfirmComponent } from './generic-confirm/generic-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GenericConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [GenericConfirmComponent],
  entryComponents: [GenericConfirmComponent]
})
export class SharedModule {}
