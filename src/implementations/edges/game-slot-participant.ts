import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {TGameSlotParticipantEdge} from '@root/types';

export class GameSlotParticipantEdge
  extends EdgeWithMethods<EdgeType.GameSlotParticipant, false, null>
  implements TGameSlotParticipantEdge {}
