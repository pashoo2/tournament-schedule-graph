import {NodeType} from '@root/enum';
import {INodeWithMethods} from '../../types/nodes';

export class NodeWithMethods<T extends NodeType, V = null>
  implements INodeWithMethods<T, V>
{
  get id(): string {
    return this.__id;
  }
  get type(): T {
    return this.__type;
  }
  get value(): V {
    return this.__value;
  }
  constructor(private __id: string, private __type: T, private __value: V) {}
  public setValue(value: V): void {
    this.__value = value;
  }
}
