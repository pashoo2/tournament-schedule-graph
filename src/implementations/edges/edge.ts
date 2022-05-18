import {EdgeType} from '@root/enum';
import {IEdge, IEdgeWithMethods} from '@root/types';

export interface IEdgeConstructorParameters<
  T extends EdgeType,
  UNI extends boolean,
  V
> {
  type: T;
  isUnidirectional: UNI;
  id: string;
  value: V;
}

export class EdgeWithMethods<T extends EdgeType, UNI extends boolean, V>
  implements IEdgeWithMethods<T, UNI, V>
{
  public get id(): string {
    return this.#id;
  }
  public get type(): T {
    return this.#type;
  }
  public get isUnidirectional(): UNI {
    return this.#isUnidirectional;
  }
  public get value(): V {
    return this.#value;
  }
  readonly #id: string;
  readonly #type: T;
  readonly #isUnidirectional: UNI;
  #value: V;
  constructor(parameters: IEdge<T, UNI, V>) {
    const {id, isUnidirectional, type, value} = parameters;
    this.#id = id;
    this.#isUnidirectional = isUnidirectional;
    this.#type = type;
    this.#value = value;
  }

  public setValue(value: V): void {
    this.#value = value;
  }
}
