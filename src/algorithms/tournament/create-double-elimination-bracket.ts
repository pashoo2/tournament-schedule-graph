import {
  GameModeAttributeNode,
  GameModeEdge,
  GameSlotNode,
  GameSlotRivalEdge,
  GameTypeEdgeImpl,
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
  | GameTypeEdgeImpl
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
  /**
   * Defines which game types the last rounds should have
   *
   * @type {GameType[]}
   * @memberof ICreateDoubleEliminationBracketOfGamesParameters
   */
  finalRoundsGameTypes: GameType[];
  /**
   * A game type that will be used by default
   *
   * @type {GameType}
   * @memberof ICreateDoubleEliminationBracketOfGamesParameters
   */
  defaultGameType: GameType;
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
  const {
    graph,
    indexOfFirstGame,
    numberOfGamesInFirstRound,
    finalRoundsGameTypes,
    defaultGameType,
  } = parameters;

  if (defaultGameType === null || defaultGameType === undefined) {
    throw new Error(
      'The default type of a game should be passed on parameters'
    );
  }
  if (!finalRoundsGameTypes || !finalRoundsGameTypes.length) {
    throw new Error(
      'A game type for the final rounds should be a non-empty array'
    );
  }

  const numberOfFakePlayers = numberOfGamesInFirstRound * 2;

  if (numberOfFakePlayers % 2) {
    throw new Error(
      `The number of participants should be an even figure, but it is ${numberOfFakePlayers} of the number of games in the first round ${numberOfGamesInFirstRound}`
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
    let gameTypeOrUndefined: GameType | undefined;
    if (remainingPlayersCount === 2) {
      gameTypeOrUndefined =
        finalRoundsGameTypes[finalRoundsGameTypes.length - 1];
    }
    if (remainingPlayersCount === 4) {
      gameTypeOrUndefined =
        finalRoundsGameTypes[finalRoundsGameTypes.length - 2];
    }
    if (remainingPlayersCount === 8) {
      gameTypeOrUndefined =
        finalRoundsGameTypes[finalRoundsGameTypes.length - 3];
    }
    if (remainingPlayersCount === 8) {
      gameTypeOrUndefined =
        finalRoundsGameTypes[finalRoundsGameTypes.length - 3];
    }
    return gameTypeOrUndefined ?? defaultGameType;
  }
  function createGameTypeEdge(gameType: GameType): GameTypeEdgeImpl {
    return new GameTypeEdgeImpl(getEdgeId(), gameType);
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
      const gameSlotForPlayerIsAlreadyExistsAndAvailableInCurrentRound: boolean =
        !!currentGameSlotForPlayerOrUndefined &&
        (availableRivalsGameSlotsWinnerTournament.includes(
          currentGameSlotForPlayerOrUndefined
        ) ||
          availableRivalsGameSlotsLooserTournament.includes(
            currentGameSlotForPlayerOrUndefined
          ));

      currentFakePlayerIdx += 1;

      if (gameSlotForPlayerIsAlreadyExistsAndAvailableInCurrentRound) {
        continue;
      }

      let gameSlotNode: GameSlotNode;
      const isPlayerParticipantOfWinnerTournamentBranch =
        currentFakePlayer.losses === 0;

      if (isPlayerParticipantOfWinnerTournamentBranch) {
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
        const gameTypeEdge: GameTypeEdgeImpl = createGameTypeEdge(
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
    }

    if (fakePlayers.length === 1) {
      // if the winner of the tournament has been determined
      return;
    }

    // eslint-disable-next-line no-inner-declarations
    function getError(gameIdx: number, message: string): Error {
      return new Error(
        `Round number: "${currentRoundIndex}". Game number: "${gameIdx}". Error: "${message}"`
      );
    }
    // eslint-disable-next-line no-inner-declarations
    function generateGamesInThisRound(
      availableRivalsGameSlotsInRound: Readonly<GameSlotNode[]>
    ): [GameSlotNode, GameSlotNode][] {
      let currentGameIdx = 0;
      const currentRoundParticipantGameNodes: [GameSlotNode, GameSlotNode][] =
        [];
      const availableRivalsGameSlotsInRoundCopy: Array<GameSlotNode | null> = [
        ...availableRivalsGameSlotsInRound,
      ];
      /**
       * if only two contestants remain it's a final game either in winners branch
       * or looser branch.
       */
      const isFinalGameInTournamentBranch =
        availableRivalsGameSlotsInRoundCopy.length === 2;

      while (currentGameIdx < availableRivalsGameSlotsInRoundCopy.length) {
        const gameFirstSlotIdx = currentGameIdx;
        const gameSecondSlotIdx =
          gameFirstSlotIdx + (isFinalGameInTournamentBranch ? 1 : 2);
        const gameFirstSlot: GameSlotNode | null | undefined =
          availableRivalsGameSlotsInRoundCopy[gameFirstSlotIdx];
        const gameSecondSlot: GameSlotNode | null | undefined =
          availableRivalsGameSlotsInRoundCopy[gameSecondSlotIdx];

        currentGameIdx += 1;
        if (gameFirstSlot === null) {
          continue;
        }
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

        currentRoundParticipantGameNodes.push([gameFirstSlot, gameSecondSlot]);
        availableRivalsGameSlotsInRoundCopy[gameFirstSlotIdx] = null;
        availableRivalsGameSlotsInRoundCopy[gameSecondSlotIdx] = null;
      }
      return currentRoundParticipantGameNodes;
    }

    const isGrandFinalFirstRound =
      availableRivalsGameSlotsWinnerTournament.length === 1 &&
      availableRivalsGameSlotsLooserTournament.length === 1;
    // if winner of the winner branch lost the first grand final game
    const isGranFinalSecondRound =
      availableRivalsGameSlotsWinnerTournament.length === 0 &&
      availableRivalsGameSlotsLooserTournament.length === 2;
    if (isGrandFinalFirstRound || isGranFinalSecondRound) {
      const winnerOfWinnerBranch = isGrandFinalFirstRound
        ? availableRivalsGameSlotsWinnerTournament[0]
        : availableRivalsGameSlotsLooserTournament[1];
      const winnerOfLooserBranch = availableRivalsGameSlotsLooserTournament[0];
      const [grandFinalGame] = generateGamesInThisRound([
        winnerOfWinnerBranch,
        winnerOfLooserBranch,
      ]);

      simulateGame(grandFinalGame, 0); // TODO
      continue;
    }

    const winnerTournamentTourParticipantGameNodes: [
      GameSlotNode,
      GameSlotNode
    ][] = generateGamesInThisRound(availableRivalsGameSlotsWinnerTournament);
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
    ][] = generateGamesInThisRound(availableRivalsGameSlotsLooserTournament);
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
      const playerFirstSlot: IFakePlayer | undefined =
        getPlayerOrUndefinedForGameSlot(rivalGameSlots[0]);
      if (!playerFirstSlot) {
        throw getError(gameIdx, 'Player for the first game slot was not found');
      }
      const playerSecondSlot: IFakePlayer | undefined =
        getPlayerOrUndefinedForGameSlot(rivalGameSlots[1]);
      if (!playerSecondSlot) {
        throw getError(
          gameIdx,
          'Player for the second game slot was not found'
        );
      }

      if (playerFirstSlot.losses > playerSecondSlot.losses) {
        playerSecondSlot.losses += 1;
      } else {
        playerFirstSlot.losses += 1;
      }
    }

    winnerTournamentTourParticipantGameNodes.forEach(simulateGame);
    looserTournamentTourParticipantGameNodes.forEach(simulateGame);

    currentRoundIndex += 1;
  }
}
