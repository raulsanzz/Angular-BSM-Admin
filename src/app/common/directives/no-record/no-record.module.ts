import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoRecordComponent } from './no-record.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
  declarations: [
    NoRecordComponent
  ],
  exports: [
    NoRecordComponent
  ]
})
export class NoRecordFoundModule {}
