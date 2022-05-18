import {AttributeName} from '@root/enum';
import {AttributeNode} from '@root/implementations';

export class TournamentMaxPlayersAttributeNode extends AttributeNode<
  AttributeName.TournamentMaxPlayers,
  number
> {
  constructor(id: string, value: number) {
    super({
      id,
      name: AttributeName.TournamentMaxPlayers,
      value,
    });
  }
}
