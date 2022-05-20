import {
  validateSingleTournamentParameters,
  generateSingleEliminationSchedule,
  IGenerateSingleEliminationSchedule,
  createTournamentNodeWithAttributeParameters,
  CreateTournamentNodeWithAttributeGraphNodeTypesRequired,
  CreateTournamentNodeWithAttributeGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphEdgeTypeRequired,
  TGenerateSingleEliminationScheduleGraphNodeTypesRequired,
} from '@root/algorithms';
import {GameType, TournamentType} from '@root/enum';
import {TournamentNode} from '@root/implementations';
import {IGraph} from '@root/types';

export type NodeTypesRequired =
  | CreateTournamentNodeWithAttributeGraphNodeTypesRequired
  | TGenerateSingleEliminationScheduleGraphNodeTypesRequired;

export type EdgeTypeRequired =
  | CreateTournamentNodeWithAttributeGraphEdgeTypeRequired
  | TGenerateSingleEliminationScheduleGraphEdgeTypeRequired;

export interface ISingleRoundTournamentCreateScheduleParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
  graph: IGraph<NodeTypesRequired, EdgeTypeRequired>;
}

const FINAL_TOURS = [GameType.QuarterFinal, GameType.SemiFinal, GameType.Final];

export function singleRoundTournamentCreateSchedule(
  parameters: ISingleRoundTournamentCreateScheduleParameters
): void {
  const {name, minPlayers, maxPlayers, graph} = parameters;

  validateSingleTournamentParameters(parameters);

  const tournamentNode: TournamentNode =
    createTournamentNodeWithAttributeParameters({
      type: TournamentType.Single,
      graph,
      maxPlayers,
      minPlayers,
      name,
    });

  const numberOfTours = Math.log2(maxPlayers);
  const numberOfGroupTours = numberOfTours - FINAL_TOURS.length;
  const scheduleParams: IGenerateSingleEliminationSchedule = {
    graph,
    numberOfPlayers: maxPlayers,
    tournamentNode,
    roundGameTypes: [
      ...new Array(numberOfGroupTours).fill(GameType.Group),
      ...FINAL_TOURS,
    ],
  };
  const finalGameSlots = generateSingleEliminationSchedule(scheduleParams);

  console.log(finalGameSlots);
  // TODO
}
