import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatSnackBarModule
} from '@angular/material/snack-bar'

const modules = [
  /// angular material
  MatTableModule,
  MatToolbarModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  DragDropModule,
  MatCardModule,
  MatTabsModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
