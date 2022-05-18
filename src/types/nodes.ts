import {NodeType} from '@root/enum';

export interface INode<T extends NodeType, V = null> {
  readonly id: string;
  readonly type: T;
  readonly value: V;
}

export interface INodeWithMethods<T extends NodeType, V = null>
  extends INode<T, V> {
  setValue(value: V): void;
}
