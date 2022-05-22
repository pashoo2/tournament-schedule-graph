import {EdgeType} from '@root/enum';
import {IWinnerEdge, TGameResultPoint} from '@root/types';
import {EdgeWithMethods} from './edge';

export class WinnerEdge
  extends EdgeWithMethods<EdgeType.Winner, false, TGameResultPoint>
  implements IWinnerEdge {}
