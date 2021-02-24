export interface INode {
    nodeData: any;
    nodeName: string;
    nodeParent: INode;
    nodeChildren: INode[];
    isShowNode: boolean;
}
