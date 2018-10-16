import { NgModule } from '@angular/core';

import { 
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule {}