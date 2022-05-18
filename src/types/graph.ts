import {INode} from './nodes';
import {IEdge} from './edges';
import {EdgeType, NodeType} from '@root/enum';
export interface IGraphSearchCallback<
  NT extends NodeType,
  ET extends EdgeType
> {
  // if the result of the function is true, then stops further searching
  (
    nodeFirst: INode<NT>,
    nodeSecond: INode<NT>,
    edge: IEdge<ET, boolean, any>
  ): boolean;
}

export interface IGraph<NT extends NodeType, ET extends EdgeType> {
  addNode(node: INode<NT>): void;
  addEdge<UNI extends true>(
    sourceNode: INode<NT>,
    targetNode: INode<NT>,
    edge: IEdge<ET, UNI, any>
  ): void;
  addEdge<UNI extends false>(
    nodeFirst: INode<NT>,
    nodeSecond: INode<NT>,
    edge: IEdge<ET, UNI, any>
  ): void;
  dfs(callback: IGraphSearchCallback<NT, ET>): void;
  dfs(callback: IGraphSearchCallback<NT, ET>, startNode: INode<NT>): void;
  bfs(callback: IGraphSearchCallback<NT, ET>): void;
  bfs(callback: IGraphSearchCallback<NT, ET>, startNode: INode<NT>): void;
}
