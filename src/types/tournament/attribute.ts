import {AttributeName, TournamentType} from '@root/enum';
import {IAttributeNodeWithMethods} from '../attribute';

export type IAttributeTournamentTypeNode = IAttributeNodeWithMethods<
  AttributeName.TournamentType,
  TournamentType
>;

export type IAttributeTournamentNameNode = IAttributeNodeWithMethods<
  AttributeName.TournamentName,
  string
>;

export type IAttributeTournamentMaxPlayersNode = IAttributeNodeWithMethods<
  AttributeName.TournamentMaxPlayers,
  number
>;

export type IAttributeTournamentMinPlayersNode = IAttributeNodeWithMethods<
  AttributeName.TournamentMaxPlayers,
  number
>;
