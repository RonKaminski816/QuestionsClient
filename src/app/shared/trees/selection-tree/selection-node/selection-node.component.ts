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
    if (checkedChangeNode.nodeChildren.length > 0) {
      this.checkChildren(checkedChangeNode)
    }
    //check if the node is root
    if (checkedChangeNode.nodeParent !== null) {
      this.checkParent(checkedChangeNode);
    }
  }

  private checkChildren(checkedChangeNode: SelectionNode) {
    checkedChangeNode.nodeChildren.map(nc => {
      nc.isChecked = checkedChangeNode.isChecked;
      if (nc.nodeChildren.length > 0) {
        this.checkChildren(nc);
      }
    });
  }

  private checkParent(checkedChangeNode: SelectionNode) {
    //check if all the children of the selected parent already checked, if true the is checked
    if (checkedChangeNode.nodeParent.nodeChildren.every(n => n.isChecked === true)) {
      checkedChangeNode.nodeParent.isChecked = true;
    } else {
      checkedChangeNode.nodeParent.isChecked = false;
    }
    this.checkParent(checkedChangeNode.nodeParent)
  }
}
