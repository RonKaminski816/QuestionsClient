import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQuestionModel } from 'src/app/shared/models/iquestion.model';
import { INode } from 'src/app/shared/trees/tree-models/inode.trees';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnChanges {

  /**Full List with all the questions its porpuse is to refill and get all the question if needed without another request */
  @Input() treesQListOrigin: IQuestionModel[];

  treeRootNodeChildren: INode[];
  rootNodeTitle = "Question";

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.treesQListOrigin) {
      return;
    }
    this.createTreesObjects(this.treesQListOrigin);
  }

  createTreesObjects(questions: IQuestionModel[]) {
    // const tempRootNode = { nodeData: "Select All", nodeParent: null, nodeChildren: [] };
    const tempRootNodeChildren: INode[] = [];
    const months = [];
    for (let index = 0; index < questions.length; index++) {
      const q = questions[index];
      if (q.creationDate && q.creationDate !== null) {
        const date = new Date(q.creationDate);
        const month = date.toLocaleString('en-us', { month: 'long' });
        const nodeDataItem = {};
        nodeDataItem[q.id] = date;
        if (!months[month]) {
          const tempNewNode: INode = { nodeData: [nodeDataItem], nodeName: month, nodeParent: null, nodeChildren: [], isShowNode: true };
          tempNewNode.nodeChildren.push({ nodeData: q, nodeName: `${q.id} - ${q.description}`, nodeParent: tempNewNode, nodeChildren: [], isShowNode: true });
          tempRootNodeChildren.push(tempNewNode);
          months[month] = tempNewNode;
        } else {
          const tempExistNode: INode = months[month];
          tempExistNode.nodeChildren.push({ nodeData: q, nodeName: `${q.id} - ${q.description}`, nodeParent: tempExistNode, nodeChildren: [], isShowNode: true });
          tempExistNode.nodeData = [...tempExistNode.nodeData, nodeDataItem];
        }
      }
    }
    //this.treeData = {...tempRootNode};
    this.treeRootNodeChildren = [...tempRootNodeChildren];
  }
}
