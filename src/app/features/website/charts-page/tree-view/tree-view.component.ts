import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { INode } from 'src/app/shared/trees/node.trees';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit, OnChanges {

  /**Full List with all the questions its porpuse is to refill and get all the question if needed without another request */
  @Input() treesQListOrigin: IQuestionModel[];

  treeRootNodeChildren: INode[];

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
        if (!months.includes(month)) {
          const tempNewNode: INode = { nodeData: month, nodeParent: null, nodeChildren: [] };
          tempNewNode.nodeChildren.push({ nodeData: `${q.id} - ${q.description}`, nodeParent: tempNewNode, nodeChildren: [] });
          tempRootNodeChildren.push(tempNewNode);
          months.push(month);
        } else {
          const tempExistNode: INode = tempRootNodeChildren.find(n => n.nodeData === month);
          tempExistNode.nodeChildren.push({ nodeData: `${q.id} - ${q.description}`, nodeParent: tempExistNode, nodeChildren: [] });
          //TODO check if enough or need anoyher casting;
        }
      }
    }
    //this.treeData = {...tempRootNode};
    this.treeRootNodeChildren = [...tempRootNodeChildren];
  }

  ngOnInit(): void {
  }

}
