import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IGameSlotRivalEdge} from '@root/types';

export class GameSlotRivalEdge
  extends EdgeWithMethods<EdgeType.GameSlotRival, false, null>
  implements IGameSlotRivalEdge
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
