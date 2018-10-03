import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: []
})
export class MaterialModule { }
