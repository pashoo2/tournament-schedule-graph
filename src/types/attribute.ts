import {AttributeName, EdgeType, NodeType, TournamentType} from '@root/enum';
import {INode} from './nodes';
import {IEdge} from './edges';

export interface IAttributeNode<N extends AttributeName, V>
  extends INode<NodeType.Attribute, V> {
  readonly name: N;
}

export interface IAttributeNodeWithMethods<N extends AttributeName, V>
  extends IAttributeNode<N, V> {
  setValue(value: V): void;
}

export type IAttributeEdge = IEdge<EdgeType.Attribute, false, null>;
