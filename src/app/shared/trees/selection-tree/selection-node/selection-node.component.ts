import { Component, Input, OnInit } from '@angular/core';
import { SelectionNode } from '../selection-tree.component';

@Component({
  selector: 'app-selection-node',
  templateUrl: './selection-node.component.html',
  styleUrls: ['../selection-tree.component.css', './selection-node.component.css']
})
export class SelectionNodeComponent implements OnInit {

  // nodeDataActionAsHTMLString = ''
  isChildrenPointerDown: boolean;

  @Input() selectionNode: SelectionNode;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNodeChildrenPointer() {
    this.isChildrenPointerDown = !this.isChildrenPointerDown;
  }


  onNodeClicked(clickedNode: SelectionNode) {
    if (clickedNode.nodeChildren.length > 0) {
      this.toggleNodeChildrenPointer();
    } else {
      clickedNode.isChecked = !clickedNode.isChecked;
      this.onNodeCheckedChanged(clickedNode);
    }
  }

  // onNodeClicked(event: any){
  //   if (event.target.classList.includes("checkbox") || event.target.classList.includes("checkbox")) {
  //
  //   }
  // }

  onNodeCheckedChanged(checkedChangeNode: SelectionNode) {
    //Splitting the function logic into two different external recursive 
    //private functions that each have their own unique role,
    //so that their logic does not affect each other and the end result
    checkedChangeNode.isSemiCheck = false;
    if (checkedChangeNode.nodeChildren.length > 0) {
      this.checkChildren(checkedChangeNode)
    }
    this.checkParent(checkedChangeNode);
  }

  /**Check or uncheck all the children of the inserted node, according to the inserted node isCheck value */
  private checkChildren(checkedChangeNode: SelectionNode) {
    checkedChangeNode.nodeChildren.map(nc => {
      if (nc.isShowNode === true) {
        nc.isChecked = checkedChangeNode.isChecked;
        nc.isSemiCheck = false;
        // checkedChangeNode.isChecked === true ? this.isChildrenPointerDown = true : this.isChildrenPointerDown = false;
        if (nc.nodeChildren.length > 0) {
          this.checkChildren(nc);
        }
      }
    });
  }

  /**Checking if all the children of the selected node parent already checked,
   *  to know if to check the node parent as well */
  private checkParent(checkedChangeNode: SelectionNode) {
    //check if the node is not the root
    if (checkedChangeNode.nodeParent !== null) {
      //check if all the showed children of the selected node parent already checked. if true- checked, if false- checks if semicheck or full uncheck
      const tempShowedChildren = checkedChangeNode.nodeParent.nodeChildren.filter(nc => nc.isShowNode === true);
      checkedChangeNode.nodeParent.isChecked = tempShowedChildren.every(nc => nc.isChecked === true && nc.isSemiCheck === false);
      // checkedChangeNode.nodeParent.isChecked = checkedChangeNode.nodeParent.nodeChildren.every(nc => nc.isShowNode === true && nc.isChecked === true && nc.isSemiCheck === false);
      if (checkedChangeNode.nodeParent.isChecked === false) {
        checkedChangeNode.nodeParent.isSemiCheck = checkedChangeNode.nodeParent.nodeChildren.some(nc => nc.isChecked === true || nc.isSemiCheck === true);
      } else {
        checkedChangeNode.nodeParent.isSemiCheck = false;
      }
      this.checkParent(checkedChangeNode.nodeParent)
    }
  }
}
