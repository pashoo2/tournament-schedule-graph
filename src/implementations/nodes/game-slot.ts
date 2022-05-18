import {NodeType} from '@root/enum';
import {NodeWithMethods} from './node';
import {IGameSlotNode} from '@root/types';

export class GameSlotNode
  extends NodeWithMethods<NodeType.GameSlot>
  implements IGameSlotNode {}
