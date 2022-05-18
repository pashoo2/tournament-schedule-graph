import {AttributeName, NodeType} from '@root/enum';
import {NodeWithMethods} from '../node';
import {IAttributeNode} from '../../../types/attribute';

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
    const {id, name, value} = parameters;
    super(id, NodeType.Attribute, value);
    this.#name = name;
  }
}
