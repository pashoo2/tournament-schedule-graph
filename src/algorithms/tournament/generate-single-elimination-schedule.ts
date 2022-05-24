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
  const overallNumberOfRounds = toursGameTypes.length;
  const prevRoundNodes: GameSlotNode[] = [];
  let currentGameIndex: TGameSlotIndex = indexOfFirstGame;

  for (
    let currentRoundIdx = 0;
    currentRoundIdx < overallNumberOfRounds;
    currentRoundIdx += 1
  ) {
    const numberOfGamesInCurrentRound: number = Math.floor(
      numberOfMatches / ((currentRoundIdx + 1) * 2)
    );
    const isFinalGame = numberOfGamesInCurrentRound === 1;
    const currentRoundGameType: GameType = toursGameTypes[currentRoundIdx];
    const getCurrentRoundGameTypeEdge = () =>
      new GameTypeEdgeImpl(getEdgeId(), currentRoundGameType);

    if (!isFinalGame && numberOfGamesInCurrentRound % 2) {
      throw new Error(
        `The number of games should be an even figure, but it is "${numberOfGamesInCurrentRound}"`
      );
    }

    for (
      let gameIndexInCurrentRound = 0;
      gameIndexInCurrentRound < numberOfGamesInCurrentRound;
      gameIndexInCurrentRound += 1
    ) {
      const currentGameGameSlots: GameSlotNode[] = [];
      const gameFirstSlot = new GameSlotNode(getNodeId(), currentGameIndex);
      graph.addNode(gameFirstSlot);
      currentGameGameSlots.push(gameFirstSlot);

      const gameSecondSlot = new GameSlotNode(getNodeId(), currentGameIndex);
      graph.addNode(gameSecondSlot);
      currentGameGameSlots.push(gameSecondSlot);

      const gameSlotRivalEdge = new GameSlotRivalEdge(getEdgeId());
      graph.addEdge(gameFirstSlot, gameSecondSlot, gameSlotRivalEdge);

      currentGameIndex += 1;

      for (const slot of currentGameGameSlots) {
        if (currentRoundIdx === 0) {
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
                currentRoundIdx + 1
              }" game "${gameIndexInCurrentRound}"`
            );
          }
          if (!prevRoundSecondSlot) {
            throw new Error(
              `There is no "prevRoundSecondSlot" for the round "${
                currentRoundIdx + 1
              }" game "${gameIndexInCurrentRound}"`
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

      prevRoundNodes.push(...currentGameGameSlots);
    }
  }
  return prevRoundNodes;
}
