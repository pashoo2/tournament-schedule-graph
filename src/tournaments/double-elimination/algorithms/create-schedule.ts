import {
  createTournamentNodeWithAttributes,
  TCreateTournamentNodeWithAttributeGraphNodeTypesRequired,
  TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired,
  ICreateTournamentNodeWithAttributesParameters,
  validateSingleEliminationTournamentParameters,
  ICreateDoubleEliminationBracketOfGamesParameters,
  TCreateDoubleEliminationBracketGraphNodeTypesRequired,
  TCreateDoubleEliminationBracketEdgeTypesRequired,
  createDoubleEliminationBracket,
} from '@root/algorithms';
import {GameType, TournamentType} from '@root/enum';
import {TournamentNode} from '@root/implementations';
import {IGraph} from '@root/types';

export type TDoubleEliminationTournamentCreateScheduleGraphNodeTypesRequired =
  | TCreateTournamentNodeWithAttributeGraphNodeTypesRequired &
      TCreateDoubleEliminationBracketGraphNodeTypesRequired;

export type TDoubleEliminationTournamentCreateScheduleGraphEdgeTypeRequired =
  | TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired &
      TCreateDoubleEliminationBracketEdgeTypesRequired;

export interface IDoubleEliminationTournamentCreateScheduleParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
  graph: IGraph<
    TDoubleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
    TDoubleEliminationTournamentCreateScheduleGraphEdgeTypeRequired
  >;
}

const FINAL_ROUNDS = Object.freeze([
  GameType.QuarterFinal,
  GameType.SemiFinal,
  GameType.Final,
]);

const GAME_TYPE_DEFAULT = GameType.Group;

export function doubleEliminationTournamentCreateSchedule(
  parameters: IDoubleEliminationTournamentCreateScheduleParameters
): void {
  validateSingleEliminationTournamentParameters(parameters);

  const {name, minPlayers, maxPlayers, graph} = parameters;

  const createTournamentNodeParameters: ICreateTournamentNodeWithAttributesParameters =
    {
      type: TournamentType.Double,
      graph,
      maxPlayers,
      minPlayers,
      name,
    };
  const tournamentNode: TournamentNode = createTournamentNodeWithAttributes(createTournamentNodeParameters);

  const overallNumberOfRounds = Math.log2(maxPlayers);
  const finalRoundGameTypes: GameType[] = [...FINAL_ROUNDS].slice(
    -overallNumberOfRounds
  );
  const scheduleParams: ICreateDoubleEliminationBracketOfGamesParameters = {
    tournamentNode,
    graph,
    numberOfGamesInFirstRound: maxPlayers / 2,
    indexOfFirstGame: 0,
    defaultGameType: GAME_TYPE_DEFAULT,
    finalRoundsGameTypes: finalRoundGameTypes,
  };

  createDoubleEliminationBracket(scheduleParams);
}
