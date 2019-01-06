import { NgModule } from '@angular/core';

import { 
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class MaterialModule {}