export enum EdgeType {
  SubTournament, // for Dota - cool players tournment
  GameType,
  GameSlotParticipant,
  GameSlotRival,
  Winner, // either winner of game, subtournament or tournament, value - points
  Looser, // either looser of game, subtournament or tournament, value - points
  Attribute,
}
