import {NodeType} from '@root/enum';
import {NodeWithMethods} from './node';
import {TGameSlotNode, TGameSlotIndex} from '@root/types';

export class GameSlotNode
  extends NodeWithMethods<NodeType.GameSlot, TGameSlotIndex>
  implements TGameSlotNode
{
  constructor(id: string, index: TGameSlotIndex) {
    super(id, NodeType.GameSlot, index);
  }
}
