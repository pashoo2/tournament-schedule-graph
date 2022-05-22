import {EdgeType, NodeType} from '@root/enum';
import {IEdge, IExportGraph, IGraph, INode} from '@root/types';

export interface IGrafifyInput {
  nodes: Array<{id: string}>;
  edges: Array<{source: string; target: string}>;
}

type TGraphSupported = IGraph<
  INode<NodeType, unknown>,
  IEdge<EdgeType, boolean, unknown>
>;

/* https://grafify.herokuapp.com/ */
export const exportToGrafify: IExportGraph<TGraphSupported, IGrafifyInput> =
  function exportToGrafifyImpl(graph: TGraphSupported): IGrafifyInput {
    const nodesInExportFormat: IGrafifyInput['nodes'] = graph.nodes.map(
      node => ({id: node.id})
    );
    const edgesInExportFormat: IGrafifyInput['edges'] = graph.edges.map(
      edge => {
        return {
          source: edge.sourceNodeId,
          target: edge.targetNodeId,
        };
      }
    );
    return {
      nodes: nodesInExportFormat,
      edges: edgesInExportFormat,
    };
  };
