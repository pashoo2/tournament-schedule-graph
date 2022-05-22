import {EdgeType, GameType} from '@root/enum';
import {TGameTypeEdge} from '@root/types';
import {EdgeWithMethods} from './edge';

export class GameTypeEdgeImpl
  extends EdgeWithMethods<EdgeType.GameType, true, GameType>
  implements TGameTypeEdge
{
  constructor(id: string, gameType: GameType) {
    super({
      id,
      isUnidirectional: true,
      type: EdgeType.GameType,
      value: gameType,
    });
  }
}
