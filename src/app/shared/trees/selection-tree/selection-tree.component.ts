import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { INode } from 'src/app/shared/trees/node.trees';


export class SelectionNode implements INode {
  nodeData: any;
  nodeName: string;
  nodeParent: SelectionNode;
  nodeChildren: SelectionNode[];
  isChecked: boolean;
}

@Component({
  selector: 'app-selection-tree',
  templateUrl: './selection-tree.component.html',
  styleUrls: ['./selection-tree.component.css']
})
export class SelectionTreeComponent implements OnChanges {

  filterString: string = '';
  isNodeChildrenDown: boolean;
  @Input() nodeRootChildren: SelectionNode[];

  selectionTreeRootData: SelectionNode = { nodeData: "Select All", nodeName: 'Select All', nodeParent: null, nodeChildren: [], isChecked: false };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.nodeRootChildren) {
      return;
    }
    this.setSelectionTree(this.nodeRootChildren);
  }

  resetFilter() {
    this.selectionTreeRootData.nodeChildren = [...this.nodeRootChildren];
  }

  private setSelectionTree(rootChildren: SelectionNode[]) {
    rootChildren.map(n => n.nodeParent = this.selectionTreeRootData);
    this.selectionTreeRootData.nodeChildren = [...rootChildren];
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); //  defaults to lowercase matches 
  //   if (!filterValue || filterValue === '' || filterValue === null) {
  //     this.nodeRootChildren;
  //     // console.log("Before reset:");
  //     // console.log(`nodeRootChildren -- ${this.nodeRootChildren}`);
  //     // console.log(`selectionTreeRootData.nodeChildren -- ${this.selectionTreeRootData.nodeChildren}`);
  //     this.resetFilter();
  //     this.nodeRootChildren;
  //   } else {
  //     this.nodeRootChildren;
  //     this.selectionTreeRootData.nodeChildren.map(nc => this.filterNodes(filterValue, nc));
  //     this.selectionTreeRootData.nodeChildren = this.selectionTreeRootData.nodeChildren.filter(nc => nc.nodeChildren.length > 0);
  //     this.nodeRootChildren;
  //     // console.log("After change:");
  //     // console.log(`nodeRootChildren -- ${this.nodeRootChildren}`);
  //     // console.log(`selectionTreeRootData.nodeChildren -- ${this.selectionTreeRootData.nodeChildren}`);
  //   }
  // }
  
  // filterNodes(filterValue: string, currentNode: SelectionNode) {
  //   if (currentNode.nodeChildren.length > 0) {
  //     currentNode.nodeChildren.map(nc => {
  //       if (nc.nodeChildren.length > 0) {
  //         this.filterNodes(filterValue, nc);
  //       }
  //     });
  //     this.nodeRootChildren;
  //     currentNode.nodeChildren = currentNode.nodeChildren.filter(nc => nc.nodeName.toLowerCase().includes(filterValue));
  //     this.nodeRootChildren;
  //   }
  // }
}


