import {getNodeId, getEdgeId} from '@root/algorithms';
import {EdgeType, NodeType} from '@root/enum';
import {GraphImpl} from '@root/implementations';
import {IGraph} from '@root/types';
import {exportToGrafifyFormat} from './export-to-grafify-format';

describe('exportToGrafifyFormat', () => {
  let graph: IGraph<any, any>;

  beforeEach(() => {
    graph = new GraphImpl();
  });
  it('All node ids should exists in exported data', () => {
    const nodeIdsToAdd = [
      getNodeId(),
      getNodeId(),
      getNodeId(),
      getNodeId(),
      getNodeId(),
    ];

    nodeIdsToAdd.forEach(nodeId => {
      graph.addNode({
        id: nodeId,
        type: NodeType.Attribute,
        value: nodeId,
      });
    });

    const exportedData = exportToGrafifyFormat(graph);

    expect(exportedData).toEqual(
      expect.objectContaining({
        nodes: expect.arrayContaining(
          nodeIdsToAdd.map(nodeId => ({
            id: nodeId,
          }))
        ),
        edges: [],
      })
    );
  });

  it('All edges and nodes should exists in exported data', () => {
    const nodeIdsToAdd = [
      getNodeId(),
      getNodeId(),
      getNodeId(),
      getNodeId(),
      getNodeId(),
      getNodeId(),
    ];
    const nodesToAdd = nodeIdsToAdd.map(nodeId => ({
      id: nodeId,
      type: NodeType.Attribute,
      value: nodeId,
    }));

    nodesToAdd.forEach(node => {
      graph.addNode(node);
    });

    const edgeIds = [
      getEdgeId(),
      getEdgeId(),
      getEdgeId(),
      getEdgeId(),
      getEdgeId(),
    ];
    const edgesToAdd = edgeIds.map(edgeId => ({
      id: edgeId,
      isUnidirectional: false,
      type: EdgeType.Attribute,
      value: '',
    }));

    edgesToAdd.forEach((edge, idx) => {
      const nodeSource = nodesToAdd[idx];
      const nodeTarget = nodesToAdd[idx + 1];

      graph.addEdge(nodeSource, nodeTarget, edge);
    });

    const exportedData = exportToGrafifyFormat(graph);

    expect(exportedData).toEqual(
      expect.objectContaining({
        nodes: expect.arrayContaining(
          nodeIdsToAdd.map(nodeId => ({
            id: nodeId,
          }))
        ),
        edges: expect.arrayContaining(
          edgesToAdd.map((_edge, idx) => {
            return {
              source: nodesToAdd[idx].id,
              target: nodesToAdd[idx + 1].id,
            };
          })
        ),
      })
    );
  });
});
