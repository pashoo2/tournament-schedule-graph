import {EdgeType, GameMode} from '@root/enum';
import {EdgeWithMethods} from '@root/implementations';
import {TGameModeEdge} from '@root/types';

export class GameModeEdge
  extends EdgeWithMethods<EdgeType.Attribute, false, GameMode>
  implements TGameModeEdge
{
  constructor(id: string, gameMode: GameMode) {
    super({
      id,
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: gameMode,
    });
  }
}
