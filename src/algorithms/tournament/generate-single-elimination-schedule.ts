import {IGraph, TGameSlotIndex} from '@root/types';
import {GameType} from '@root/enum';
import {getNodeId, getEdgeId} from '@root/algorithms';
import {
  GameSlotNode,
  GameSlotRivalEdge,
  GameTypeEdgeImpl,
  TournamentNode,
} from '@root/implementations';

export type TGenerateSingleEliminationScheduleGraphNodeTypesRequired =
  | TournamentNode
  | GameSlotNode;

export type TGenerateSingleEliminationScheduleGraphEdgeTypeRequired =
  | GameSlotRivalEdge
  | GameTypeEdgeImpl;

export interface IGenerateSingleEliminationSchedule {
  /**
   * The very first game slots will have this index.
   * Next games will have this increased each time by 1.
   *
   * @type {TGameSlotIndex}
   * @memberof IGenerateSingleEliminationTour
   */
  indexOfFirstGame: TGameSlotIndex;
  numberOfPlayers: number;
  /**
   * Should contain as much elements as it rounds going to be
   *
   * @type {GameType[]}
   * @memberof IGenerateSingleEliminationTour
   */
  roundGameTypes: GameType[];
  /**
   * Tournament
   *
   * @type {TournamentNode}
   * @memberof IGenerateSingleEliminationTour
   */
  tournamentNode: TournamentNode;
  graph: IGraph<
    TGenerateSingleEliminationScheduleGraphNodeTypesRequired,
    TGenerateSingleEliminationScheduleGraphEdgeTypeRequired
  >;
}

/**
 * Generates schedule of Single Elimination tournament.
 *
 * @export
 * @param {IGenerateSingleEliminationSchedule} parameters
 * @return {GameSlotNode[]} - it will be the final left side game slots, e.g. the winners of the tournament
 */
export function generateSingleEliminationSchedule(
  parameters: IGenerateSingleEliminationSchedule
): GameSlotNode[] {
  const {
    tournamentNode,
    graph,
    numberOfPlayers: numberOfMatches,
    roundGameTypes: toursGameTypes,
    indexOfFirstGame,
  } = parameters;
  const numberOfTours = toursGameTypes.length;
  const prevRoundNodes: GameSlotNode[] = [];
  let currentGameIndex: TGameSlotIndex = indexOfFirstGame;

  for (
    let currentTourIdx = 0;
    currentTourIdx < numberOfTours;
    currentTourIdx += 1
  ) {
    const currentTourNumberOfMatches: number =
      numberOfMatches / (currentTourIdx ? currentTourIdx * 2 : 1);
    const isFinalGame = currentTourNumberOfMatches === 1;
    const currentTourGameType: GameType = toursGameTypes[currentTourIdx];
    const getCurrentRoundGameTypeEdge = () =>
      new GameTypeEdgeImpl(getEdgeId(), currentTourGameType);

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
      const gameFirstSlot = new GameSlotNode(getNodeId(), currentGameIndex);
      graph.addNode(gameFirstSlot);
      currentGameSlots.push(gameFirstSlot);

      if (!isFinalGame) {
        const gameSecondSlot = new GameSlotNode(getNodeId(), currentGameIndex);
        graph.addNode(gameSecondSlot);
        currentGameSlots.push(gameSecondSlot);

        const gameSlotRivalEdge = new GameSlotRivalEdge(getEdgeId());
        graph.addEdge(gameFirstSlot, gameSecondSlot, gameSlotRivalEdge);
      }

      currentGameIndex += 1;

      for (const slot of currentGameSlots) {
        if (currentTourIdx === 0) {
          // first tour slots should be connected with the tournament node
          graph.addEdge(tournamentNode, slot, getCurrentRoundGameTypeEdge());
        } else {
          // two slots of the previous round should lead to 1 node in the next round
          // since there will be only the one winner
          const prevRoundFirstSlot = prevRoundNodes.shift();
          const prevRoundSecondSlot = prevRoundNodes.shift();

          if (!prevRoundFirstSlot) {
            throw new Error(
              `There is no "prevRoundFirstSlot" for the round "${
                currentTourIdx + 1
              }" game "${gameIndex}"`
            );
          }
          if (!prevRoundSecondSlot) {
            throw new Error(
              `There is no "prevRoundSecondSlot" for the round "${
                currentTourIdx + 1
              }" game "${gameIndex}"`
            );
          }

          graph.addEdge(
            prevRoundFirstSlot,
            slot,
            getCurrentRoundGameTypeEdge()
          );
          graph.addEdge(
            prevRoundSecondSlot,
            slot,
            getCurrentRoundGameTypeEdge()
          );
        }
      }

      prevRoundNodes.push(...currentGameSlots);
    }
  }
  return prevRoundNodes;
}
