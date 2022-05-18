import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IWinnerEdge, TGameResultPoint} from '@root/types';

export class WinnerEdge
  extends EdgeWithMethods<EdgeType.Winner, false, TGameResultPoint>
  implements IWinnerEdge {}
