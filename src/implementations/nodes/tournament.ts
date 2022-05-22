import {NodeType} from '@root/enum';
import {ITournamentNode} from '@root/types';
import {NodeWithMethods} from './node';

export class TournamentNode
  extends NodeWithMethods<NodeType.Tournament>
  implements ITournamentNode
{
  constructor(id: string) {
    super(id, NodeType.Tournament, null);
  }
}
