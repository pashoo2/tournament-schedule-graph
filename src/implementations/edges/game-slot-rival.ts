import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {TGameSlotRivalEdge} from '@root/types';

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
