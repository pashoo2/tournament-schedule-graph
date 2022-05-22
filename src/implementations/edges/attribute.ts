import {AttributeName, EdgeType} from '@root/enum';
import {TAttributeEdge} from '@root/types';
import {EdgeWithMethods} from './edge';

export class AttributeEdge<N extends AttributeName>
  extends EdgeWithMethods<EdgeType.Attribute, false, N>
  implements TAttributeEdge
{
  constructor(id: string, name: N) {
    super({
      id,
      type: EdgeType.Attribute,
      isUnidirectional: false,
      value: name,
    });
  }
}
