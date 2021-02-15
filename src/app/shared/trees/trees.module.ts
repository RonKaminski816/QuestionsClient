import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionTreeComponent } from './selection-tree/selection-tree.component';
import { SelectionNodeComponent } from './selection-tree/selection-node/selection-node.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SelectionTreeComponent, SelectionNodeComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
  ],
  exports: [SelectionTreeComponent]
})
export class TreesModule { }
