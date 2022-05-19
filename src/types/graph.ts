import {INode} from './nodes';
import {IEdge} from './edges';
import {EdgeType, NodeType} from '@root/enum';

export interface IGraph<
  NT extends INode<NodeType, unknown>,
  ET extends IEdge<EdgeType, boolean, unknown>
> {
  addNode(node: NT): void;
  addEdge(sourceNode: NT, targetNode: NT, edge: ET): void;
}
