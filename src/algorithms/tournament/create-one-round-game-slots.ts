import {GameSlotNode, GameSlotRivalEdge} from '@root/implementations';
import {getNodeId, getEdgeId} from '@root/algorithms';
import {IGraph, TGameSlotIndex} from '@root/types';

export type TCreateOneRoundGameSlotsGraphNodeTypesRequired = GameSlotNode;

export type TCreateOneRoundGameSlotsGraphEdgeTypesRequired = GameSlotRivalEdge;

export interface ICreateOneRoundGameSlots {
  /**
   * The very first game slots will have this index.
   * Next games will have this increased each time by 1.
   *
   * @type {TGameSlotIndex}
   * @memberof ICreateOneTourNodesParameters
   */
  indexOfFirstGame: TGameSlotIndex;
  /**
   * The round will have 2 * numberOfGamesInRound game slots
   *
   * @type {number}
   * @memberof ICreateOneTourNodesParameters
   */
  numberOfGamesInRound: number;
  /**
   * An implementation of Graph to where the nodes and edges
   * will be added.
   *
   * @type {IGraph<
   *     TCreateOneRoundGameSlotsGraphNodeTypesRequired,
   *     TCreateOneRoundGameSlotsGraphEdgeTypesRequired
   *   >}
   * @memberof ICreateOneTourGameSlots
   */
  graph: IGraph<
    TCreateOneRoundGameSlotsGraphNodeTypesRequired,
    TCreateOneRoundGameSlotsGraphEdgeTypesRequired
  >;
}

export function createOneRoundGameSlots(
  parameters: ICreateOneRoundGameSlots
): GameSlotNode[] {
  const {indexOfFirstGame, numberOfGamesInRound, graph} = parameters;

  if (numberOfGamesInRound < 2) {
    throw new Error('It should be at least 2 games in a round');
  }
  if (numberOfGamesInRound % 2) {
    throw new Error(
      `The number of games in a round should be an even figure, but it is ${numberOfGamesInRound}`
    );
  }

  let currentGameIndexInRound: TGameSlotIndex = 0;
  const tourNodes: GameSlotNode[] = [];

  while (currentGameIndexInRound < numberOfGamesInRound) {
    const currentGameIndex = indexOfFirstGame + currentGameIndexInRound;
    const gameFirstSlot = new GameSlotNode(getNodeId(), currentGameIndex);
    const gameSecondSlot = new GameSlotNode(getNodeId(), currentGameIndex);
    const gameSlotRivalEdge = new GameSlotRivalEdge(getEdgeId());

    graph.addNode(gameFirstSlot);
    graph.addNode(gameSecondSlot);
    graph.addEdge(gameFirstSlot, gameSecondSlot, gameSlotRivalEdge);
    currentGameIndexInRound += 1;

    tourNodes.push(gameFirstSlot, gameSecondSlot);
  }
  return tourNodes;
}
