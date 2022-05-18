import {EdgeType} from '@root/enum';

export interface IEdge<T extends EdgeType, UNI extends boolean, V> {
  readonly id: string;
  readonly type: T;
  readonly isUnidirectional: UNI;
  readonly value: V;
}

export interface IEdgeWithMethods<T extends EdgeType, UNI extends boolean, V>
  extends IEdge<T, UNI, V> {
  setValue(value: V): void;
}
