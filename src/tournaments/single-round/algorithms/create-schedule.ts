import {
  validateSingleTournamentParameters,
  getNodeId,
  getEdgeId,
} from '@root/algorithms';
import {
  createTournamentNodeWithAttributeParameters,
  NodeTypesRequired as CrateTournamentFunctionNodeTypesRequired,
  EdgeTypeRequired as CrateTournamentFunctionEdgeTypeRequired,
} from '@root/algorithms/tournament/create-tournament-node-with-attributes';
import {GameType, TournamentType} from '@root/enum';
import {
  GameSlotNode,
  TournamentNode,
  GameSlotRivalEdge,
  GameTypeEdge,
} from '@root/implementations';
import {IGraph} from '@root/types';

export type NodeTypesRequired =
  | CrateTournamentFunctionNodeTypesRequired
  | GameSlotNode;

export type EdgeTypeRequired =
  | CrateTournamentFunctionEdgeTypeRequired
  | GameSlotRivalEdge
  | GameTypeEdge;

export interface ISingleRoundTournamentCreateScheduleParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
  graph: IGraph<NodeTypesRequired, EdgeTypeRequired>;
}

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

  const firstTourGameSlotsNumber = maxPlayers;
  const firstTourGamesNumber = firstTourGameSlotsNumber / 2;

  for (let gameIndex = 0; gameIndex < firstTourGamesNumber; gameIndex += 1) {
    const gameFirstSlot = new GameSlotNode(getNodeId());
    const gameSecondSlot = new GameSlotNode(getNodeId());
    const gameSlotRivalEdge = new GameSlotRivalEdge(getEdgeId());

    graph.addNode(gameFirstSlot);
    graph.addNode(gameSecondSlot);
    graph.addEdge(gameFirstSlot, gameSecondSlot, gameSlotRivalEdge);

    const edgeGameTypeFirstSlot = new GameTypeEdge(getEdgeId(), GameType.Group);
    graph.addEdge(tournamentNode, gameFirstSlot, edgeGameTypeFirstSlot);

    const edgeGameTypeSecondSlot = new GameTypeEdge(
      getEdgeId(),
      GameType.Group
    );
    graph.addEdge(tournamentNode, gameSecondSlot, edgeGameTypeSecondSlot);

    const gameSlotQuarterFinal = new GameSlotNode(getNodeId());
    const edgeGameTypeNextFirstSlot = new GameTypeEdge(
      getEdgeId(),
      GameType.QuarterFinal
    );
    const edgeGameTypeNextSecondSlot = new GameTypeEdge(
      getEdgeId(),
      GameType.QuarterFinal
    );

    graph.addNode(gameSlotQuarterFinal);
    graph.addEdge(
      gameFirstSlot,
      gameSlotQuarterFinal,
      edgeGameTypeNextFirstSlot
    );
    graph.addEdge(
      gameSecondSlot,
      gameSlotQuarterFinal,
      edgeGameTypeNextSecondSlot
    );
  }
}
