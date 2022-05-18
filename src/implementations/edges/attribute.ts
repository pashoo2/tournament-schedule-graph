import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IAttributeEdge} from '@root/types';

export class AttributeEdge
  extends EdgeWithMethods<EdgeType.Attribute, false, null>
  implements IAttributeEdge {}
