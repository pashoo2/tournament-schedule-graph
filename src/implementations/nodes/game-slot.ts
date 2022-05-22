import {NodeType} from '@root/enum';
import {TGameSlotNode, TGameSlotIndex} from '@root/types';
import {NodeWithMethods} from './node';

export class GameSlotNode
  extends NodeWithMethods<NodeType.GameSlot, TGameSlotIndex>
  implements TGameSlotNode
{
  constructor(id: string, index: TGameSlotIndex) {
    super(id, NodeType.GameSlot, index);
  }
}
