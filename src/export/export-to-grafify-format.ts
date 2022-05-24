import {EdgeType, NodeType} from '@root/enum';
import {IEdge, IExportGraph, IGraph, INode} from '@root/types';

export interface IGrafifyFormat {
  nodes: Array<{id: string}>;
  edges: Array<{source: string; target: string}>;
}

type TGraphSupported = IGraph<
  INode<NodeType, unknown>,
  IEdge<EdgeType, boolean, unknown>
>;

/* https://grafify.herokuapp.com/ */
export const exportToGrafifyFormat: IExportGraph<
  TGraphSupported,
  IGrafifyFormat
> = function exportToGrafifyFormatImpl(graph: TGraphSupported): IGrafifyFormat {
  const nodesInExportFormat: IGrafifyFormat['nodes'] = graph.nodes.map(
    node => ({
      id: node.id,
    })
  );
  const edgesInExportFormat: IGrafifyFormat['edges'] = graph.edges.map(edge => {
    return {
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
    };
  });
  return {
    nodes: nodesInExportFormat,
    edges: edgesInExportFormat,
  };
};
