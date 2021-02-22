import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { INode } from 'src/app/shared/trees/node.trees';

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

// this.chartSeries = this.sortByHours(this.chartSeries);
// //TODO Fix the sorting

// }

// private sortByHours(hoursSeries: string[]): string[] {
// if (hoursSeries && hoursSeries.length > 0) {
//   const AmHours = this.sortHoursStringInSameTimeConvention(hoursSeries.filter(hs => hs.includes('AM')), 'AM');
//   const PmHours = this.sortHoursStringInSameTimeConvention(hoursSeries.filter(hs => hs.includes('PM')), 'PM');

//   return [...AmHours, ...PmHours];
// }
// return undefined;
// }

// private sortHoursStringInSameTimeConvention(arr: string[], timeConvention: string): string[] {
// if (arr && arr.length > 0 && (timeConvention.trim().toUpperCase() === 'AM' || 'PM')) {
//   let numHoursArr = [];
//   arr.forEach(s => numHoursArr.push(Number.parseInt(s.slice(0, 2))));
//   numHoursArr = this.bubbleSort(numHoursArr);
//   for (let i = 0; i < numHoursArr.length; i++) {
//     const element = numHoursArr[i];
//     arr[i] = `${element} ${timeConvention}`;
//   }
//   return [...arr];
// }
// return undefined;
// }

// private bubbleSort(arr: number[]): number[] {
// if (arr && arr.length > 0) {
//   let tmp;
//   for (let i = arr.length - 1; i > 0; i--) {
//     for (let j = 0; j < i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         tmp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = tmp;
//       }
//     }
//   }
//   return [...arr];
// }
// return undefined;
// }
