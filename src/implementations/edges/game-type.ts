import {EdgeType, GameType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {TGameTypeEdge} from '@root/types';

export class GameTypeEdge
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
