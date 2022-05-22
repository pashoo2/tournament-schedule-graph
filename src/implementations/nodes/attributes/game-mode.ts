import {AttributeName} from '@root/enum';
import {TGameModeAttributeNode} from '@root/types';
import {GameMode} from '@root/enum';
import {AttributeNode} from './attribute';

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
