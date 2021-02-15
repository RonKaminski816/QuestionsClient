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
  }

  onNodeCheckedChanged(checkedChangeNode: SelectionNode) {
    this.selectionNode.nodeChildren.map(nc => nc.isChecked = this.selectionNode.isChecked);
    //check if the node is root
    if (this.selectionNode.nodeParent !== null) {
      const parentCheckTest = this.selectionNode.nodeParent.nodeChildren.find(n => n.isChecked === false);
      //check if all the children of the selected parent already checked, if true the is checked
      if (!parentCheckTest) {
        this.selectionNode.nodeParent.isChecked = true;
      }else{
        this.selectionNode.nodeParent.isChecked = false;
      }
    }
  }
}
