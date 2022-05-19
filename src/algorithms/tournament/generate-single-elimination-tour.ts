import {IGraph} from '@root/types';
import {GameType} from '@root/enum';
import {getNodeId, getEdgeId} from '@root/algorithms';
import {
  GameSlotNode,
  GameSlotRivalEdge,
  GameTypeEdge,
  TournamentNode,
} from '@root/implementations';

export type GenerateSingleEliminationToursGraphNodeTypesRequired =
  | TournamentNode
  | GameSlotNode;

export type GenerateSingleEliminationToursGraphEdgeTypeRequired =
  | GameSlotRivalEdge
  | GameTypeEdge;

export interface IGenerateSingleEliminationTour {
  numberOfPlayers: number;
  /**
   * Should contain as much elements as tours going to be
   *
   * @type {GameType[]}
   * @memberof IGenerateSingleEliminationTour
   */
  toursGameTypes: GameType[];
  /**
   * Tournament
   *
   * @type {TournamentNode}
   * @memberof IGenerateSingleEliminationTour
   */
  tournamentNode: TournamentNode;
  graph: IGraph<
    GenerateSingleEliminationToursGraphNodeTypesRequired,
    GenerateSingleEliminationToursGraphEdgeTypeRequired
  >;
}

/**
 * Generates schedule of Single Elimination tournament.
 *
 * @export
 * @param {IGenerateSingleEliminationTour} parameters
 * @return {*}  {GameSlotNode[]} - it will be the final left side game slots, e.g. the winners of the tournament
 */
export function generateSingleEliminationTours(
  parameters: IGenerateSingleEliminationTour
): GameSlotNode[] {
  const {
    tournamentNode,
    graph,
    numberOfPlayers: numberOfMatches,
    toursGameTypes,
  } = parameters;
  const numberOfTours = toursGameTypes.length;
  const prevTourNodes: GameSlotNode[] = [];

  for (
    let currentTourIdx = 0;
    currentTourIdx < numberOfTours;
    currentTourIdx += 1
  ) {
    const currentTourNumberOfMatches: number =
      numberOfMatches / (currentTourIdx ? currentTourIdx * 2 : 1);
    const isFinalGame = currentTourNumberOfMatches === 1;
    const currentTourGameType: GameType = toursGameTypes[currentTourIdx];
    const getCurrentTourGameTypeEdge = () =>
      new GameTypeEdge(getEdgeId(), currentTourGameType);

    if (!isFinalGame && currentTourNumberOfMatches % 2) {
      throw new Error(
        `The number of games should be an even figure, but it is "${currentTourNumberOfMatches}"`
      );
    }

    for (
      let gameIndex = 0;
      gameIndex < currentTourNumberOfMatches;
      gameIndex += 1
    ) {
      const currentGameSlots: GameSlotNode[] = [];
      const gameFirstSlot = new GameSlotNode(getNodeId());
      graph.addNode(gameFirstSlot);
      currentGameSlots.push(gameFirstSlot);

      if (!isFinalGame) {
        const gameSecondSlot = new GameSlotNode(getNodeId());
        graph.addNode(gameSecondSlot);
        currentGameSlots.push(gameSecondSlot);

        const gameSlotRivalEdge = new GameSlotRivalEdge(getEdgeId());
        graph.addEdge(gameFirstSlot, gameSecondSlot, gameSlotRivalEdge);
      }

      for (const slot of currentGameSlots) {
        if (currentTourIdx === 0) {
          // first tour slots should be connected with the tournament node
          graph.addEdge(tournamentNode, slot, getCurrentTourGameTypeEdge());
        } else {
          // two slots of the previous round should lead to 1 node in the next round
          // since there will be only the one winner
          const prevTourFirstSlot = prevTourNodes.shift();
          const prevTourSecondSlot = prevTourNodes.shift();

          if (!prevTourFirstSlot) {
            throw new Error(
              `There is no "prevTourFirstSlot" for the round "${
                currentTourIdx + 1
              }" game "${gameIndex}"`
            );
          }
          if (!prevTourSecondSlot) {
            throw new Error(
              `There is no "prevTourSecondSlot" for the round "${
                currentTourIdx + 1
              }" game "${gameIndex}"`
            );
          }

          graph.addEdge(prevTourFirstSlot, slot, getCurrentTourGameTypeEdge());
          graph.addEdge(prevTourSecondSlot, slot, getCurrentTourGameTypeEdge());
        }
      }

      prevTourNodes.push(...currentGameSlots);
    }
  }
  return prevTourNodes;
}
