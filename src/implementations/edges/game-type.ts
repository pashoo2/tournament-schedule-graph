import {EdgeType, GameType} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {IGameTypeEdge} from '@root/types';

export class GameTypeEdge
  extends EdgeWithMethods<EdgeType.GameType, true, GameType>
  implements IGameTypeEdge
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
