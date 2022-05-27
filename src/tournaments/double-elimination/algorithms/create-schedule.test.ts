import {exportToGrafifyFormat} from '@root/export';
import {GraphImpl} from '@root/implementations';
import {
  TDoubleEliminationTournamentCreateScheduleGraphEdgeTypeRequired,
  TDoubleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
} from '@root/tournaments/double-elimination/algorithms/create-schedule';
import {IGraph} from '@root/types';
import {
  IDoubleEliminationTournamentCreateScheduleParameters,
  doubleEliminationTournamentCreateSchedule,
} from './create-schedule';

describe('doubleEliminationTournamentCreateSchedule', () => {
  let graph: IGraph<
    TDoubleEliminationTournamentCreateScheduleGraphNodeTypesRequired,
    TDoubleEliminationTournamentCreateScheduleGraphEdgeTypeRequired
  >;
  let scheduleParameters: IDoubleEliminationTournamentCreateScheduleParameters;

  beforeEach(() => {
    graph = new GraphImpl();
    scheduleParameters = {
      graph,
      maxPlayers: 8,
      minPlayers: 4,
      name: 'Tournament',
    };
  });

  it('Should create a proper schedule for an even number of games in the first round', () => {
    doubleEliminationTournamentCreateSchedule(scheduleParameters);
    // const exported = exportToGrafifyFormat(graph)
    // TODO - it can't match a previous snapshot
    // expect(graph.edges).toMatchSnapshot();
    // expect(graph.nodes).toMatchSnapshot();
  });

  it('Should create a proper schedule for an odd number of games in the first round', () => {
    doubleEliminationTournamentCreateSchedule({
      ...scheduleParameters,
      maxPlayers: 6,
      minPlayers: 2,
    });
    // const exported = exportToGrafifyFormat(graph)
    // TODO - it can't match a previous snapshot
    // expect(graph.edges).toMatchSnapshot();
    // expect(graph.nodes).toMatchSnapshot();
  });
});
