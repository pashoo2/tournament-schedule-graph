import {
  generateSingleEliminationSchedule,
  IGenerateSingleEliminationSchedule,
  createTournamentNodeWithAttributes,
  TCreateTournamentNodeWithAttributeGraphNodeTypesRequired,
  TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphNodeTypesRequired,
  ICreateTournamentNodeWithAttributesParameters,
  validateDoubleEliminationTournamentParameters,
} from '@root/algorithms';
import {GameType, TournamentType} from '@root/enum';
import {TournamentNode} from '@root/implementations';
import {IGraph} from '@root/types';

export type TSingleEliminationTournamentCreateScheduleGraphNodeTypesRequired =
  | TCreateTournamentNodeWithAttributeGraphNodeTypesRequired &
      TGenerateSingleEliminationScheduleGraphNodeTypesRequired;

export type TSingleEliminationTournamentCreateScheduleGraphEdgeTypeRequired =
  | TCreateTournamentNodeWithAttributeGraphEdgeTypeRequired &
      TGenerateSingleEliminationScheduleGraphEdgeTypeRequired;

export interface ISingleEliminationTournamentCreateScheduleParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
  graph: IGraph<
    TSingleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
    TSingleEliminationTournamentCreateScheduleGraphEdgeTypeRequired
  >;
}

const FINAL_TOURS = Object.freeze([
  GameType.QuarterFinal,
  GameType.SemiFinal,
  GameType.Final,
]);

export function singleEliminationTournamentCreateSchedule(
  parameters: ISingleEliminationTournamentCreateScheduleParameters
): void {
  validateDoubleEliminationTournamentParameters(parameters);

  const {name, minPlayers, maxPlayers, graph} = parameters;

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
