export interface ISingleEliminationTournamentCreateScheduleMainParameters {
  maxPlayers: number;
  minPlayers: number;
  name: string;
}

export function validateSingleEliminationTournamentParameters(
  tournamentParameters: ISingleEliminationTournamentCreateScheduleMainParameters
): void {
  const {maxPlayers, minPlayers, name} = tournamentParameters;

  if (!name) {
    throw new Error('The name of the tournament should not be empty');
  }
  if (typeof name !== 'string') {
    throw new Error('The name of the tournament should be a string');
  }
  if (maxPlayers % 2) {
    throw new Error(
      'The maximum number of maximum players should be an even figure'
    );
  }
  if (minPlayers % 2) {
    throw new Error('The minimum number of players should be an even figure');
  }
  if (minPlayers > maxPlayers) {
    throw new Error('The minimum number of players should be an even figure');
  }
}
