import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { INode } from 'src/app/shared/trees/node.trees';


export class SelectionNode implements INode {
  nodeData: any;
  nodeParent: INode;
  nodeChildren: INode[];
  isChecked: boolean;
}

@Component({
  selector: 'app-selection-tree',
  templateUrl: './selection-tree.component.html',
  styleUrls: ['./selection-tree.component.css']
})
export class SelectionTreeComponent implements OnInit, OnChanges {

  isNodeChildrenDown: boolean;
  @Input() nodeRootChildren: SelectionNode[];

  selectionTreeRootData: SelectionNode = { nodeData: "Select All", nodeParent: null, nodeChildren: [], isChecked: false };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.nodeRootChildren) {
      return;
    }
    this.setSelectionTree(this.nodeRootChildren);
  }

  ngOnInit(): void {
  }

  private setSelectionTree(rootChildren: INode[]) {
    rootChildren.map(n => n.nodeParent = this.selectionTreeRootData);
    this.selectionTreeRootData.nodeChildren = [...rootChildren];
  }

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches 
  }

  // var input, filter, ul, li, a, i, txtValue;
  // input = document.getElementById("myInput");
  // filter = input.value.toUpperCase();
  // ul = document.getElementById("myUL");
  // li = ul.getElementsByTagName("li");
  // for (i = 0; i < li.length; i++) {
  //     a = li[i].getElementsByTagName("span")[0];
  //     txtValue = a.textContent || a.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         li[i].style.display = "";
  //     } else {
  //         li[i].style.display = "none";
  //     }
  // }
}


