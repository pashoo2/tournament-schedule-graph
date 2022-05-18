import {INode} from './nodes';
import {IEdge} from './edges';
import {EdgeType, NodeType} from '@root/enum';

export interface IGraphSearchCallback<
  NT extends INode<NodeType, unknown>,
  ET extends IEdge<EdgeType, boolean, unknown>
> {
  // if the result of the function is true, then stops further searching
  (nodeFirst: NT, nodeSecond: NT, edge: ET): boolean;
}

export interface IGraph<
  NT extends INode<NodeType, unknown>,
  ET extends IEdge<EdgeType, boolean, unknown>
> {
  addNode(node: NT): void;
  addEdge(sourceNode: NT, targetNode: NT, edge: ET): void;
  dfs(callback: IGraphSearchCallback<NT, ET>): void;
  dfs(callback: IGraphSearchCallback<NT, ET>, startNode: NT): void;
  bfs(callback: IGraphSearchCallback<NT, ET>): void;
  bfs(callback: IGraphSearchCallback<NT, ET>, startNode: NT): void;
}
