import {NodeType} from '@root/enum';
import {NodeWithMethods} from './node';
import {ITournamentNode} from '@root/types';

export class TournamentNode
  extends NodeWithMethods<NodeType.Tournament>
  implements ITournamentNode {}
