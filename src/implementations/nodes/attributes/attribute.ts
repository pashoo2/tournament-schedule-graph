import {AttributeName, NodeType} from '@root/enum';
import {IAttributeNode} from '@root/types';
import {NodeWithMethods} from '../node';

export interface IAttributeNodeConstructorParameters<
  N extends AttributeName,
  V
> {
  id: string;
  name: N;
  value: V;
}

export class AttributeNode<N extends AttributeName, V>
  extends NodeWithMethods<NodeType.Attribute, V>
  implements IAttributeNode<N, V>
{
  get name(): N {
    return this.#name;
  }
  readonly #name: N;
  constructor(parameters: IAttributeNodeConstructorParameters<N, V>) {
    super(parameters.id, NodeType.Attribute, parameters.value);
    this.#name = parameters.name;
  }
}
