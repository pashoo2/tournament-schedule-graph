import {AttributeName, EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {TAttributeEdge} from '@root/types';

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
