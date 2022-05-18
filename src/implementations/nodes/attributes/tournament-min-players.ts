import {AttributeName} from '@root/enum';
import {AttributeNode} from '@root/implementations';

export class TournamentMinPlayersAttributeNode extends AttributeNode<
  AttributeName.TournamentMinPlayers,
  number
> {
  constructor(id: string, value: number) {
    super({
      id,
      name: AttributeName.TournamentMinPlayers,
      value,
    });
  }
}
