import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule

  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule


  ]
})
export class MaterialModule {
}
