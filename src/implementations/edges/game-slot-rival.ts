import {EdgeType, GameType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IGameSlotRivalEdge} from '@root/types';

export class GameSlotRivalEdge
  extends EdgeWithMethods<EdgeType.GameSlotRival, false, null>
  implements IGameSlotRivalEdge {}
