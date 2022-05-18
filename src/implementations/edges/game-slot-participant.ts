import {EdgeType, GameType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IGameSlotParticipantEdge} from '@root/types';

export class GameSlotParticipantEdge
  extends EdgeWithMethods<EdgeType.GameSlotParticipant, false, null>
  implements IGameSlotParticipantEdge {}
