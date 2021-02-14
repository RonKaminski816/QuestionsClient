import { Component, Input, OnInit } from '@angular/core';
import { SelectionNode } from '../selection-tree.component';

@Component({
  selector: 'app-selection-node',
  templateUrl: './selection-node.component.html',
  styleUrls: ['../selection-tree.component.css', './selection-node.component.css']
})
export class SelectionNodeComponent implements OnInit {

  isChildrenPointerDown: boolean;

  @Input() selectionNode: SelectionNode;

  constructor() { }

  ngOnInit(): void {
  }


  toggleNodeChildrenPointer() {
    
    this.isChildrenPointerDown = !this.isChildrenPointerDown;
    // var toggler = document.getElementsByClassName("node-children-pointer");
    // var i;

    // for (i = 0; i < toggler.length; i++) {
    //   const caret =  toggler[i];
    //   caret.addEventListener("click", function () {
    //     this.parentElement.querySelector(".nested").classList.toggle("active").classList.toggle("children-pointer-down");
    //   });
    // }
  }
}
