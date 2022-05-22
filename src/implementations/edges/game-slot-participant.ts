import {EdgeType} from '@root/enum';
import {TGameSlotParticipantEdge} from '@root/types';
import {EdgeWithMethods} from './edge';

export class GameSlotParticipantEdge
  extends EdgeWithMethods<EdgeType.GameSlotParticipant, false, null>
  implements TGameSlotParticipantEdge {}
