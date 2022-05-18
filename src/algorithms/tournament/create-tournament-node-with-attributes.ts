import {IGraph} from '@root/types';
import {AttributeName, TournamentType} from '@root/enum';
import {
  AttributeEdge,
  TournamentNameAttributeNode,
  TournamentTypeAttributeNode,
  TournamentMaxPlayersAttributeNode,
  TournamentMinPlayersAttributeNode,
  TournamentNode,
} from '@root/implementations';
import {getEdgeId, getNodeId} from '@root/algorithms';

export type NodeTypesRequired =
  | TournamentNameAttributeNode
  | TournamentTypeAttributeNode
  | TournamentMaxPlayersAttributeNode
  | TournamentMinPlayersAttributeNode
  | TournamentNode;

export type EdgeTypeRequired = AttributeEdge<AttributeName>;

export interface ICreateTournamentNodeWithAttributeParameters {
  type: TournamentType;
  name: string;
  maxPlayers: number;
  minPlayers: number;
  graph: IGraph<NodeTypesRequired, EdgeTypeRequired>;
}

export function createTournamentNodeWithAttributeParameters(
  parameters: ICreateTournamentNodeWithAttributeParameters
): TournamentNode {
  const {graph, maxPlayers, minPlayers, name, type} = parameters;

  const tournamentNode = new TournamentNode(getNodeId());
  graph.addNode(tournamentNode);

  const maxPlayersAttrNode = new TournamentMaxPlayersAttributeNode(
    getNodeId(),
    maxPlayers
  );
  const maxPlayersAttrEdge = new AttributeEdge(
    getEdgeId(),
    AttributeName.TournamentMaxPlayers
  );
  graph.addNode(maxPlayersAttrNode);
  graph.addEdge(tournamentNode, maxPlayersAttrNode, maxPlayersAttrEdge);

  const minPlayersAttrNode = new TournamentMinPlayersAttributeNode(
    getNodeId(),
    minPlayers
  );
  const minPlayersAttrEdge = new AttributeEdge(
    getEdgeId(),
    AttributeName.TournamentMinPlayers
  );
  graph.addNode(minPlayersAttrNode);
  graph.addEdge(tournamentNode, minPlayersAttrNode, minPlayersAttrEdge);

  const nameAttrNode = new TournamentNameAttributeNode(getNodeId(), name);
  const nameAttrEdge = new AttributeEdge(
    getEdgeId(),
    AttributeName.TournamentName
  );
  graph.addNode(nameAttrNode);
  graph.addEdge(tournamentNode, nameAttrNode, nameAttrEdge);

  const typeAttrNode = new TournamentTypeAttributeNode(getNodeId(), type);
  const typeAttrEdge = new AttributeEdge(
    getEdgeId(),
    AttributeName.TournamentType
  );
  graph.addNode(typeAttrNode);
  graph.addEdge(tournamentNode, typeAttrNode, typeAttrEdge);

  return tournamentNode;
}
