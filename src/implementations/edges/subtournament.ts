import {EdgeType} from '@root/enum';
import {ISubTournamentEdge} from '@root/types';
import {EdgeWithMethods} from './edge';

export class SubtournamentEdge
  extends EdgeWithMethods<EdgeType.SubTournament, true, null>
  implements ISubTournamentEdge {}
