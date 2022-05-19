import {
  validateSingleTournamentParameters,
  generateSingleEliminationTours,
  IGenerateSingleEliminationTour,
  createTournamentNodeWithAttributeParameters,
  CreateTournamentNodeWithAttributeGraphNodeTypesRequired,
  CreateTournamentNodeWithAttributeGraphEdgeTypeRequired,
  GenerateSingleEliminationToursGraphEdgeTypeRequired,
  GenerateSingleEliminationToursGraphNodeTypesRequired,
} from '@root/algorithms';
import {GameType, TournamentType} from '@root/enum';
import {TournamentNode} from '@root/implementations';
import {IGraph} from '@root/types';

export type NodeTypesRequired =
  | CreateTournamentNodeWithAttributeGraphNodeTypesRequired
  | GenerateSingleEliminationToursGraphNodeTypesRequired;

export type EdgeTypeRequired =
  | CreateTournamentNodeWithAttributeGraphEdgeTypeRequired
  | GenerateSingleEliminationToursGraphEdgeTypeRequired;

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
  const scheduleParams: IGenerateSingleEliminationTour = {
    graph,
    numberOfPlayers: maxPlayers,
    tournamentNode,
    toursGameTypes: [
      ...new Array(numberOfGroupTours).fill(GameType.Group),
      ...FINAL_TOURS,
    ],
  };
  const finalGameSlots = generateSingleEliminationTours(scheduleParams);

  console.log(finalGameSlots);
  // TODO
}
