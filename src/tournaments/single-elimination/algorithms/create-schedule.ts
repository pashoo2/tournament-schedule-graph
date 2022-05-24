import {
  validateSingleTournamentParameters,
  generateSingleEliminationSchedule,
  IGenerateSingleEliminationSchedule,
  createTournamentNodeWithAttributes,
  TCreateTournamentNodeWithAttributeGraphNodeTypesRequired,
  TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphNodeTypesRequired,
  ICreateTournamentNodeWithAttributesParameters,
} from '@root/algorithms';
import {GameType, TournamentType} from '@root/enum';
import {TournamentNode} from '@root/implementations';
import {IGraph} from '@root/types';

export type TSingleRoundTournamentCreateScheduleGraphNodeTypesRequired =
  | TCreateTournamentNodeWithAttributeGraphNodeTypesRequired &
      TGenerateSingleEliminationScheduleGraphNodeTypesRequired;

export type TSingleRoundTournamentCreateScheduleGraphEdgeTypeRequired =
  | TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired &
      TGenerateSingleEliminationScheduleGraphEdgeTypeRequired;

export interface ISingleRoundTournamentCreateScheduleParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
  graph: IGraph<
    TSingleRoundTournamentCreateScheduleGraphNodeTypesRequired,
    TSingleRoundTournamentCreateScheduleGraphEdgeTypeRequired
  >;
}

const FINAL_TOURS = [GameType.QuarterFinal, GameType.SemiFinal, GameType.Final];

export function singleRoundTournamentCreateSchedule(
  parameters: ISingleRoundTournamentCreateScheduleParameters
): void {
  const {name, minPlayers, maxPlayers, graph} = parameters;

  validateSingleTournamentParameters(parameters);

  const createTournamentNodeParameters: ICreateTournamentNodeWithAttributesParameters =
    {
      type: TournamentType.Single,
      graph,
      maxPlayers,
      minPlayers,
      name,
    };
  const tournamentNode: TournamentNode = createTournamentNodeWithAttributes(
    createTournamentNodeParameters
  );

  const overallNumberOfRounds = Math.log2(maxPlayers);
  const overallNumberOfGroupRounds = overallNumberOfRounds - FINAL_TOURS.length;
  const roundGameTypes: GameType[] = [
    ...new Array(overallNumberOfGroupRounds).fill(GameType.Group),
    ...FINAL_TOURS,
  ].slice(-overallNumberOfRounds);
  const scheduleParams: IGenerateSingleEliminationSchedule = {
    graph,
    numberOfPlayers: maxPlayers,
    indexOfFirstGame: 0,
    tournamentNode,
    roundGameTypes,
  };

  generateSingleEliminationSchedule(scheduleParams);
}
