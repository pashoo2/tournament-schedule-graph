import {GraphImpl} from '@root/implementations';
import {
  ISingleEliminationTournamentCreateScheduleParameters,
  singleEliminationTournamentCreateSchedule,
  TSingleEliminationTournamentCreateScheduleGraphEdgeTypeRequired,
  TSingleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
} from '@root/tournaments/single-elimination/algorithms/create-schedule';
import {IGraph} from '@root/types';

describe('singleEliminationTournamentCreateSchedule', () => {
  let graph: IGraph<
    TSingleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
    TSingleEliminationTournamentCreateScheduleGraphEdgeTypeRequired
  >;
  let scheduleParameters: ISingleEliminationTournamentCreateScheduleParameters;

  beforeEach(() => {
    graph = new GraphImpl();
    scheduleParameters = {
      graph,
      maxPlayers: 8,
      minPlayers: 4,
      name: 'Tournament',
    };
  });

  it('Should fill out graph with nodes required to make a new single elimination tournament schedule', () => {
    singleEliminationTournamentCreateSchedule(scheduleParameters);
    expect(graph.edges).toMatchSnapshot();
    expect(graph.nodes).toMatchSnapshot();
  });
});
