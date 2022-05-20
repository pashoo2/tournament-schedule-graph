import {AttributeName} from '@root/enum';
import {AttributeNode} from '@root/implementations';
import {TGameModeAttributeNode} from '@root/types';
import {GameMode} from '@root/enum';

export class GameModeAttributeNode
  extends AttributeNode<AttributeName.GameMode, GameMode>
  implements TGameModeAttributeNode
{
  constructor(id: string, value: GameMode) {
    super({
      id,
      name: AttributeName.GameMode,
      value,
    });
  }
}
