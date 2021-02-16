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
    //Splitting the function logic into two different external recursive 
    //private functions that each have their own unique role,
    //so that their logic does not affect each other and the end result
    if (checkedChangeNode.nodeChildren.length > 0) {
      this.checkChildren(checkedChangeNode)
    }
    this.checkParent(checkedChangeNode);
  }

  /**Check or uncheck all the children of the inserted node, according to the inserted node isCheck value */
  private checkChildren(checkedChangeNode: SelectionNode) {
    checkedChangeNode.nodeChildren.map(nc => {
      nc.isChecked = checkedChangeNode.isChecked;
      // checkedChangeNode.isChecked === true ? this.isChildrenPointerDown = true : this.isChildrenPointerDown = false;
      if (nc.nodeChildren.length > 0) {
        this.checkChildren(nc);
      }
    });
  }

  /**Checking if all the children of the selected node parent already checked,
   *  to know if to check the node parent as well */
  private checkParent(checkedChangeNode: SelectionNode) {
    //check if the node is not the root
    if (checkedChangeNode.nodeParent !== null) {
      //check if all the children of the selected node parent already checked, if true the is checked
      checkedChangeNode.nodeParent.isChecked = checkedChangeNode.nodeParent.nodeChildren.every(n => n.isChecked === true);
      this.checkParent(checkedChangeNode.nodeParent)
    }
  }
}
