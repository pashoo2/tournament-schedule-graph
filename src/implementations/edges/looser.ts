import {EdgeType} from '@root/enum';
import {ILooserEdge, TGameResultPoint} from '@root/types';
import {EdgeWithMethods} from './edge';

export class LooserEdge
  extends EdgeWithMethods<EdgeType.Looser, false, TGameResultPoint>
  implements ILooserEdge {}
