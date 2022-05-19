import {EdgeType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {ISubTournamentEdge} from '@root/types';

export class SubtournamentEdge
  extends EdgeWithMethods<EdgeType.SubTournament, true, null>
  implements ISubTournamentEdge {}
