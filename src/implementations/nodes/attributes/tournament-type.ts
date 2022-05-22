import {AttributeName, TournamentType} from '@root/enum';
import {AttributeNode} from './attribute';

export class TournamentTypeAttributeNode extends AttributeNode<
  AttributeName.TournamentType,
  TournamentType
> {
  constructor(id: string, value: TournamentType) {
    super({
      id,
      name: AttributeName.TournamentType,
      value,
    });
  }
}
