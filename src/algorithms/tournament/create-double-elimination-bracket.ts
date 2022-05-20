import {
  GameModeAttributeNode,
  GameModeEdge,
  GameSlotNode,
  GameSlotRivalEdge,
  GameTypeEdge,
} from '@root/implementations';
import {IGraph, TGameSlotIndex} from '@root/types';
import {getEdgeId} from '@root/algorithms';
import {
  TCreateOneRoundGameSlotsGraphNodeTypesRequired,
  TCreateOneRoundGameSlotsGraphEdgeTypesRequired,
} from './create-one-round-game-slots';
import {GameMode, GameType} from '@root/enum';
import {getNodeId} from '../get-node-id';

export type TCreateDoubleEliminationBracketGraphNodeTypesRequired =
  | TCreateOneRoundGameSlotsGraphNodeTypesRequired
  | GameModeAttributeNode;

export type TCreateDoubleEliminationBracketEdgeTypesRequired =
  | TCreateOneRoundGameSlotsGraphEdgeTypesRequired
  | GameTypeEdge
  | GameModeEdge;

export interface ICreateDoubleEliminationBracketOfGamesParameters {
  /**
   * The very first game slots will have this index.
   * Next games will have this increased each time by 1.
   *
   * @type {TGameSlotIndex}
   * @memberof ICreateDoubleEliminationBracketOfGamesParameters
   */
  indexOfFirstGame: TGameSlotIndex;
  /**
   * The round will have 2 * numberOfGamesInRound game slots
   *
   * @type {number}
   * @memberof ICreateDoubleEliminationBracketOfGamesParameters
   */
  numberOfGamesInFirstRound: number;
  /**
   * An implementation of Graph to where the nodes and edges
   * will be added.
   *
   * @type {IGraph<
   *     TCreateDoubleEliminationBracketGraphNodeTypesRequired,
   *     TCreateDoubleEliminationLooserBracketGraphEdgeTypesRequired
   *   >}
   * @memberof ICreateDoubleEliminationBracketOfGamesParameters
   */
  graph: IGraph<
    TCreateDoubleEliminationBracketGraphNodeTypesRequired,
    TCreateDoubleEliminationBracketEdgeTypesRequired
  >;
}

interface IFakePlayer {
  id: number;
  wins: number;
  losses: number;
  currentGameSlot?: GameSlotNode;
}

/**
 * E.g. if there are 6 participants in the first one round, then
 * the first round will only be with 2 games and 4 participants,
 * the next round will be involve winners of the first round
 * and the remaining 2 players that didn't play at the first round
 * https://challonge.com/tournaments/bracket_generator?form_type=bracket_generator&ref=EPKMZiOxVg
 *
 * @export
 * @param {ICreateDoubleEliminationBracketOfGamesParameters} parameters
 */
export function createDoubleEliminationBracket(
  parameters: ICreateDoubleEliminationBracketOfGamesParameters
): void {
  const {graph, indexOfFirstGame, numberOfGamesInFirstRound} = parameters;

  if (numberOfGamesInFirstRound % 2) {
    throw new Error(
      `The number of games should be an even figure, but it is ${numberOfGamesInFirstRound}`
    );
  }
  const fakePlayers: IFakePlayer[] = new Array<IFakePlayer>(
    numberOfGamesInFirstRound * 2
  )
    .fill({
      id: 0,
      losses: 0,
      wins: 0,
    })
    .map((fakeGame, idx) => ({
      ...fakeGame,
      id: idx,
    }));

  let gameSlotCurrentIdx = indexOfFirstGame;
  let availableRivalsGameSlotsWinnerTournament: GameSlotNode[] = [];
  let availableRivalsGameSlotsLooserTournament: GameSlotNode[] = [];

  function createGameSlot(gameMode: GameMode): GameSlotNode {
    const gameSlotNode = new GameSlotNode(getNodeId(), gameSlotCurrentIdx);
    const gameModeAttributeNode = new GameModeAttributeNode(
      getNodeId(),
      gameMode
    );
    const gameModeAttributeEdge = new GameModeEdge(getEdgeId(), gameMode);

    graph.addNode(gameSlotNode);
    graph.addNode(gameModeAttributeNode);
    graph.addEdge(gameSlotNode, gameModeAttributeNode, gameModeAttributeEdge);
    gameSlotCurrentIdx += 1;

    return gameSlotNode;
  }
  function getPlayerOrUndefinedForGameSlot(
    gameSlot: GameSlotNode
  ): IFakePlayer | undefined {
    return fakePlayers.find(player => player.currentGameSlot === gameSlot);
  }
  function getGameTypeForRestPlayers(remainingPlayersCount: number): GameType {
    if (remainingPlayersCount === 2) {
      return GameType.Final;
    }
    if (remainingPlayersCount === 4) {
      return GameType.SemiFinal;
    }
    if (remainingPlayersCount === 8) {
      return GameType.QuarterFinal;
    }
    return GameType.Group;
  }
  function createGameTypeEdge(gameType: GameType): GameTypeEdge {
    return new GameTypeEdge(getEdgeId(), gameType);
  }

  let currentRoundIndex = 0;

  while (fakePlayers.length) {
    let currentFakePlayerIdx = 0;

    while (currentFakePlayerIdx < fakePlayers.length) {
      const currentFakePlayer: IFakePlayer = fakePlayers[currentFakePlayerIdx];

      if (currentFakePlayer.losses > 1) {
        // more than two losses, gamer won't be able to continue
        fakePlayers.splice(currentFakePlayerIdx, 1);
        continue;
      }

      const currentGameSlotForPlayerOrUndefined: GameSlotNode | undefined =
        currentFakePlayer.currentGameSlot;
      const slotExistsAndAvailableInCurrentRound: boolean =
        !!currentGameSlotForPlayerOrUndefined &&
        (availableRivalsGameSlotsWinnerTournament.includes(
          currentGameSlotForPlayerOrUndefined
        ) ||
          availableRivalsGameSlotsLooserTournament.includes(
            currentGameSlotForPlayerOrUndefined
          ));

      if (slotExistsAndAvailableInCurrentRound) {
        continue;
      }

      let gameSlotNode: GameSlotNode;
      const isWinnerTournamentParticipant = currentFakePlayer.losses === 0;

      if (isWinnerTournamentParticipant) {
        // no losses - winners tournament
        gameSlotNode = createGameSlot(GameMode.Winner);
        availableRivalsGameSlotsWinnerTournament.push(gameSlotNode);
      } else {
        // one loss - looser tournament
        gameSlotNode = createGameSlot(GameMode.Looser);
        availableRivalsGameSlotsLooserTournament.push(gameSlotNode);
      }

      if (currentGameSlotForPlayerOrUndefined) {
        // connect the previous game slot with this one
        const gameTypeEdge: GameTypeEdge = createGameTypeEdge(
          getGameTypeForRestPlayers(fakePlayers.length)
        );
        // link the previous game with the current one
        graph.addEdge(
          currentGameSlotForPlayerOrUndefined,
          gameSlotNode,
          gameTypeEdge
        );
      }
      currentFakePlayer.currentGameSlot = gameSlotNode;
      currentFakePlayerIdx += 1;
    }

    // eslint-disable-next-line no-inner-declarations
    function getError(gameIdx: number, message: string): Error {
      return new Error(
        `Tour: ${currentRoundIndex}, game: ${gameIdx}, error: ${message}`
      );
    }
    // eslint-disable-next-line no-inner-declarations
    function generateGamesInTour(
      availableRivalsGameSlotsInRound: Readonly<GameSlotNode[]>
    ): [GameSlotNode, GameSlotNode][] {
      // winners tournament
      const winnersTournamentRoundGamesActual =
        availableRivalsGameSlotsInRound.length / 2;
      const availableRivalsGameSlotsInRoundCopy = [
        ...availableRivalsGameSlotsInRound,
      ];
      let currentGameIdx = 0;
      const tourParticipantGameNodes: [GameSlotNode, GameSlotNode][] = [];

      while (currentGameIdx < winnersTournamentRoundGamesActual) {
        const gameFirstSlotIdx = 0;
        const gameSecondSlotIdx = gameFirstSlotIdx + 2;
        const gameFirstSlot: GameSlotNode | undefined =
          availableRivalsGameSlotsInRound[gameFirstSlotIdx];
        const gameSecondSlot: GameSlotNode | undefined =
          availableRivalsGameSlotsInRound[gameSecondSlotIdx];

        if (!gameFirstSlot) {
          throw getError(currentGameIdx, 'First game slot was not found');
        }
        if (!gameSecondSlot) {
          // if there is no slot available for the game
          // keep slots in availableRivalsGameSlotsWinnerTournament list
          // for the next round
          break;
        }

        const gameRivalEdge = new GameSlotRivalEdge(getEdgeId());

        graph.addEdge(gameFirstSlot, gameSecondSlot, gameRivalEdge);

        tourParticipantGameNodes.push([gameFirstSlot, gameSecondSlot]);
        // delete both two slots from the game slots available for the current and next round
        availableRivalsGameSlotsInRoundCopy.splice(gameFirstSlotIdx, 1);
        availableRivalsGameSlotsInRoundCopy.splice(gameSecondSlotIdx - 1, 1);
        currentGameIdx += 1;
      }
      return tourParticipantGameNodes;
    }

    const winnerTournamentTourParticipantGameNodes: [
      GameSlotNode,
      GameSlotNode
    ][] = generateGamesInTour(availableRivalsGameSlotsWinnerTournament);
    // for the next tour available only those game slots which doesn't participate
    // in the current round
    availableRivalsGameSlotsWinnerTournament =
      availableRivalsGameSlotsWinnerTournament.filter(gameSlot => {
        return !winnerTournamentTourParticipantGameNodes.find(
          rivalGameSlots => {
            return rivalGameSlots.includes(gameSlot);
          }
        );
      });

    const looserTournamentTourParticipantGameNodes: [
      GameSlotNode,
      GameSlotNode
    ][] = generateGamesInTour(availableRivalsGameSlotsLooserTournament);
    // for the next tour available only those game slots which doesn't participate
    // in the current round
    availableRivalsGameSlotsLooserTournament =
      availableRivalsGameSlotsLooserTournament.filter(gameSlot => {
        return !looserTournamentTourParticipantGameNodes.find(
          rivalGameSlots => {
            return rivalGameSlots.includes(gameSlot);
          }
        );
      });

    // eslint-disable-next-line no-inner-declarations
    function simulateGame(
      rivalGameSlots: [GameSlotNode, GameSlotNode],
      gameIdx: number
    ): void {
      const winnerSlotIdx: 0 | 1 = Math.random() > 0.5 ? 1 : 0;
      const looserSlotIdx: 0 | 1 = winnerSlotIdx === 0 ? 1 : 0;
      const gameWinnerSlotNode = rivalGameSlots[winnerSlotIdx];
      const gameLooserSlotNode = rivalGameSlots[looserSlotIdx];

      const playerWinner: IFakePlayer | undefined =
        getPlayerOrUndefinedForGameSlot(gameWinnerSlotNode);

      if (!playerWinner) {
        throw getError(gameIdx, 'Player winner was not found');
      }
      playerWinner.wins += 1;

      const playerLooser: IFakePlayer | undefined =
        getPlayerOrUndefinedForGameSlot(gameLooserSlotNode);

      if (!playerLooser) {
        throw getError(gameIdx, 'Player looser was not found');
      }
      playerLooser.losses += 1;
    }

    winnerTournamentTourParticipantGameNodes.forEach(simulateGame);
    looserTournamentTourParticipantGameNodes.forEach(simulateGame);

    currentRoundIndex += 1;
  }
}
