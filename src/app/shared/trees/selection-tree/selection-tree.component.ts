import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { INode } from 'src/app/shared/trees/node.trees';


export class SelectionNode implements INode {
  nodeData: any;
  nodeName: string;
  nodeParent: SelectionNode;
  nodeChildren: SelectionNode[];
  isShowNode: boolean;

  isSemiCheck: boolean;
  isChecked: boolean;
}

@Component({
  selector: 'app-selection-tree',
  templateUrl: './selection-tree.component.html',
  styleUrls: ['./selection-tree.component.css']
})
export class SelectionTreeComponent implements OnInit, OnChanges {

  filterString: string = '';
  isNodeChildrenDown: boolean;
  noMatchFilter: boolean = false;

  @Input() nodeRootChildren: SelectionNode[];
  @Input() nodeRootTitle: any;

  selectionTreeRootData: SelectionNode = { nodeData: '', nodeName: 'Select All', nodeParent: null, nodeChildren: [], isChecked: false, isShowNode: true, isSemiCheck: false };

  constructor() { }

  ngOnInit(): void {
    this.selectionTreeRootData.nodeData = this.nodeRootTitle;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.nodeRootChildren) {
      return;
    }
    this.setSelectionTree(this.nodeRootChildren);
  }

  private setSelectionTree(rootChildren: SelectionNode[]) {
    rootChildren.map(n => n.nodeParent = this.selectionTreeRootData);
    this.selectionTreeRootData.nodeChildren = [...rootChildren];
  }

  /**
   * Reset to Show the inserted node and every other node that is under it no matter 
   * if they were visible before or not.
   * @param selectionNode the node that it and all it's children
   * need to be reset from the filter and to be shown.
   */
  resetNodesFromFilter(selectionNode: SelectionNode) {
    if (selectionNode.nodeChildren.length > 0) {
      selectionNode.nodeChildren.map(nc => {
        nc.nodeChildren.length > 0 ? this.resetNodesFromFilter(nc) : nc.isShowNode = true;
      });
      selectionNode.isShowNode = true;
      this.isParentCheckedAfterFilter(selectionNode);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); //  defaults to lowercase matches 
    if (!filterValue || filterValue === '' || filterValue === null) {//test the filter value
      this.resetNodesFromFilter(this.selectionTreeRootData);
      this.noMatchFilter = false;
    } else {
      this.filterNodes(filterValue, this.selectionTreeRootData);
      this.selectionTreeRootData.isShowNode === false ? this.noMatchFilter = true : this.noMatchFilter = false;
    }
  }

  /**Filter the node's and node childrens (if has children) visibillity by the inserted filter string */
  private filterNodes(filterValue: string, currentNode: SelectionNode) {
    if (currentNode.nodeChildren.length > 0) {
      currentNode.nodeChildren.map(nc => {
        if (nc.nodeChildren.length > 0) {
          this.filterNodes(filterValue, nc);
        }
        else {
          nc.nodeName.toLowerCase().includes(filterValue) ? nc.isShowNode = true : nc.isShowNode = false;
        }
      });
      currentNode.nodeChildren.every(nc => nc.isShowNode === false) ? currentNode.isShowNode = false : currentNode.isShowNode = true;
      this.isParentCheckedAfterFilter(currentNode);
    }
  }

  /**Recheck the parents of the inserted node */
  isParentCheckedAfterFilter(nodeParent: SelectionNode) {
    //Better Performance runs only one time on array
    let trueCheckCounter = 0;
    let falseCheckCounter = 0;
    let semiCheckFlag;// flag to know if there is a semi-check node in the array

    nodeParent.nodeChildren.map(nc => {
      //When the isCheck property is true the isSemiCheck always be false;
      if (nc.isShowNode === true) {
        nc.isChecked === true && nc.isSemiCheck === false ? trueCheckCounter += 1 : falseCheckCounter += 1;
        //Check if the child is checked or semi to know if to semi check the parent node
        semiCheckFlag = nc.isChecked === true || nc.isSemiCheck === true;
      }
    });

    if (trueCheckCounter >= 1 && falseCheckCounter < 1) {
      //if only true counter raised, it means there are no unchecked or semi-checked children so the parent need to be checked
      nodeParent.isChecked = true;
      nodeParent.isSemiCheck = false;
    } else if ((trueCheckCounter >= 1 && falseCheckCounter >= 1) || (semiCheckFlag === true && falseCheckCounter >= 1)) {
      //If both counters raised, it means there are at least one checked and one unchecked so the parent need to be semichecked. 
      //OR
      //If only false counter raised but the semi-check flag is true, it means there is at least one semi-check node and it doesn't
      //matter if we don't have any checked nodes and the parent need to be semi checked.
      nodeParent.isChecked = false;
      nodeParent.isSemiCheck = true;
    } else {
      //if only false counter raised, it means there are no checked or semi-checked children so the parent need to be unchecked.
      nodeParent.isChecked = false;
      nodeParent.isSemiCheck = false;
    }


    //Easier to understand not good three runs on arrays
    // const tempShowedChildren = nodeParent.nodeChildren.filter(nc => nc.isShowNode === true);
    // //if the filter string don't match the tempShowedChildren array is empty
    // if (tempShowedChildren.length > 0) {
    //   //if tempShowedChildren array is empty the every function returns always true and all the parents is
    //   //automatically checked without the leafs.
    //   nodeParent.isChecked = tempShowedChildren.every(nc => nc.isChecked === true && nc.isSemiCheck === false);
    // }
    // if (nodeParent.isChecked === false) {
    //   nodeParent.isSemiCheck = nodeParent.nodeChildren.some(nc => nc.isChecked === true || nc.isSemiCheck === true);
    // } else {
    //   nodeParent.isSemiCheck = false;
    // }
  }
}