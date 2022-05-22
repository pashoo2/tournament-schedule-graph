import {GraphImpl} from './graph';
import {EdgeType, NodeType} from '@root/enum';
import {getEdgeId, getNodeId} from '@root/algorithms';
import {IEdge} from '@root/types';

describe('GraphImpl', () => {
  const graph = new GraphImpl();
  it('Should add a node', () => {
    const node = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(node);

    expect(graph.nodes).toEqual(expect.arrayContaining([node]));
  });

  it('Should add an edge', () => {
    const nodeSource = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeSource);
    const nodeTarget = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeTarget);

    const edge: IEdge<EdgeType, boolean, unknown> = {
      id: getEdgeId(),
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: '',
    };
    graph.addEdge(nodeSource, nodeTarget, edge);

    expect(graph.nodes).toEqual(
      expect.arrayContaining([nodeSource, nodeTarget])
    );
    expect(graph.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: edge.id,
          edge,
          sourceNodeId: nodeSource.id,
          targetNodeId: nodeTarget.id,
        }),
      ])
    );
  });

  it('Should throw exception if the same node or a node with the same id is added twice', () => {
    const node = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(node);
    expect(() => graph.addNode(node)).toThrow();
    expect(() =>
      graph.addNode({
        ...node,
      })
    ).toThrow();
  });

  it('Should throw an exception if the same edge or an edge with the same id is added', () => {
    const nodeSource = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeSource);
    const nodeTarget = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeTarget);

    const edge: IEdge<EdgeType, boolean, unknown> = {
      id: getEdgeId(),
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: '',
    };
    graph.addEdge(nodeSource, nodeTarget, edge);

    expect(() => graph.addEdge(nodeSource, nodeTarget, edge)).toThrow();
    expect(() => graph.addEdge(nodeSource, nodeTarget, {...edge})).toThrow();
  });

  it('Should throw an exception if edge is added to a non existed node', () => {
    const nodeSource = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeSource);
    const nodeTarget = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };

    const edge: IEdge<EdgeType, boolean, unknown> = {
      id: getEdgeId(),
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: '',
    };

    expect(() => graph.addEdge(nodeSource, nodeTarget, edge)).toThrow();
    expect(() => graph.addEdge(nodeTarget, nodeSource, edge)).toThrow();
  });

  it('Should not throw an exception if edge is added to the same node', () => {
    const nodeSource = {
      id: getNodeId(),
      type: NodeType.Attribute,
      value: '',
    };
    graph.addNode(nodeSource);

    const edge: IEdge<EdgeType, boolean, unknown> = {
      id: getEdgeId(),
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: '',
    };

    expect(() => graph.addEdge(nodeSource, nodeSource, edge)).not.toThrow();
  });
});
