import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { INode } from 'src/app/shared/trees/node.trees';


export class SelectionNode implements INode {
  nodeData: any;
  nodeName: string;
  nodeParent: SelectionNode;
  nodeChildren: SelectionNode[];
  isShowNode: boolean;
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

  selectionTreeRootData: SelectionNode = { nodeData: '', nodeName: 'Select All', nodeParent: null, nodeChildren: [], isChecked: false, isShowNode: true };

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

  resetFilter(selectionNode: SelectionNode) {
    if (selectionNode.nodeChildren.length > 0) {
      selectionNode.nodeChildren.map(nc => {
        if (nc.nodeChildren.length > 0) {
          this.resetFilter(nc);
        }
      });
      selectionNode.nodeChildren.map(nc => nc.isShowNode = true);
    }
  }

  private setSelectionTree(rootChildren: SelectionNode[]) {
    rootChildren.map(n => n.nodeParent = this.selectionTreeRootData);
    this.selectionTreeRootData.nodeChildren = [...rootChildren];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); //  defaults to lowercase matches 
    if (!filterValue || filterValue === '' || filterValue === null) {
      this.resetFilter(this.selectionTreeRootData);
    } else {
      this.selectionTreeRootData.nodeChildren.map(nc => this.filterNodes(filterValue, nc));
      if (this.selectionTreeRootData.nodeChildren.every(nc => nc.isShowNode === false)) {
        this.selectionTreeRootData.isShowNode = false;
        this.noMatchFilter = true;
      } else {
        this.selectionTreeRootData.isShowNode = true;
        this.noMatchFilter = false;
      }
    }
  }

  filterNodes(filterValue: string, currentNode: SelectionNode) {
    if (currentNode.nodeChildren.length > 0) {
      currentNode.nodeChildren.map(nc => {
        if (nc.nodeChildren.length > 0) {
          this.filterNodes(filterValue, nc);
        }
      });
      currentNode.nodeChildren.map(nc => nc.nodeName.toLowerCase().includes(filterValue) ? nc.isShowNode = true : nc.isShowNode = false);
      currentNode.nodeChildren.every(nc => nc.isShowNode === false) ? currentNode.isShowNode = false : currentNode.isShowNode = true;
    }
  }
}


