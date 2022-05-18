import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {ILooserEdge, TGameResultPoint} from '@root/types';

export class LooserEdge
  extends EdgeWithMethods<EdgeType.Looser, false, TGameResultPoint>
  implements ILooserEdge {}
