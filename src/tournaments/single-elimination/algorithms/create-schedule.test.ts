import {exportToGrafifyFormat} from '@root/export';
import {GraphImpl} from '@root/implementations';
import {
  ISingleRoundTournamentCreateScheduleParameters,
  singleRoundTournamentCreateSchedule,
  TSingleRoundTournamentCreateScheduleGraphEdgeTypeRequired,
  TSingleRoundTournamentCreateScheduleGraphNodeTypesRequired,
} from '@root/tournaments/single-elimination/algorithms/create-schedule';
import {IGraph} from '@root/types';

describe('singleRoundTournamentCreateSchedule', () => {
  let graph: IGraph<
    TSingleRoundTournamentCreateScheduleGraphNodeTypesRequired,
    TSingleRoundTournamentCreateScheduleGraphEdgeTypeRequired
  >;
  let scheduleParameters: ISingleRoundTournamentCreateScheduleParameters;

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
    singleRoundTournamentCreateSchedule(scheduleParameters);
    const exportedGraph = exportToGrafifyFormat(graph);
    console.log(exportedGraph);
  });
});
