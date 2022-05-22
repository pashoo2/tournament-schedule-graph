import {EdgeType} from '@root/enum';
import {TGameSlotRivalEdge} from '@root/types';
import {EdgeWithMethods} from './edge';

export class GameSlotRivalEdge
  extends EdgeWithMethods<EdgeType.GameSlotRival, false, null>
  implements TGameSlotRivalEdge
{
  constructor(id: string) {
    super({
      id,
      isUnidirectional: false,
      type: EdgeType.GameSlotRival,
      value: null,
    });
  }
}
