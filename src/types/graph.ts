import {INode} from './nodes';
import {IEdge} from './edges';
import {EdgeType, NodeType} from '@root/enum';

export interface IGraphEdge<ET extends IEdge<EdgeType, boolean, unknown>> {
  id: ET['id'];
  edge: ET;
  sourceNodeId: string;
  targetNodeId: string;
}

export interface IGraph<
  NT extends INode<NodeType, unknown>,
  ET extends IEdge<EdgeType, boolean, unknown>
> {
  readonly nodes: Readonly<Readonly<NT>[]>;
  readonly edges: Readonly<Readonly<IGraphEdge<ET>>[]>;
  addNode(node: NT): void;
  addEdge(sourceNode: NT, targetNode: NT, edge: ET): void;
}
