import {AttributeName} from '@root/enum';
import {AttributeNode} from './attribute';

export class TournamentNameAttributeNode extends AttributeNode<
  AttributeName.TournamentName,
  string
> {
  constructor(id: string, value: string) {
    super({
      id,
      name: AttributeName.TournamentName,
      value,
    });
  }
}
