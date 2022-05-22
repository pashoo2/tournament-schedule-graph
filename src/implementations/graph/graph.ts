import {EdgeType, NodeType} from '@root/enum';
import {IEdge, IGraph, IGraphEdge, INode} from '@root/types';

// to visualize

export class GraphImpl<
  NT extends INode<NodeType, unknown>,
  ET extends IEdge<EdgeType, boolean, unknown>
> implements IGraph<NT, ET>
{
  public get nodes(): Readonly<Readonly<NT>[]> {
    return Object.freeze(Array.from(this.nodesWithAdjacentEdges.keys()));
  }
  public get edges(): Readonly<Readonly<IGraphEdge<ET>>[]> {
    return Array.from(this.edgesWithNodes.entries()).map(entry => {
      const edge = entry[0];
      const [source, target] = entry[1];
      const graphEdge: IGraphEdge<ET> = Object.freeze({
        id: edge.id,
        edge: edge,
        sourceNodeId: source.id,
        targetNodeId: target.id,
      });
      return graphEdge;
    });
  }
  protected readonly nodesWithAdjacentEdges = new Map<NT, Set<ET>>();
  protected readonly nodesIds = new Set<string>();
  protected readonly edgesWithNodes = new Map<ET, [NT, NT]>();
  protected readonly edgesIds = new Set<string>();
  public addNode(node: NT): void {
    this.throwIfNodeIdExistsInList(node);
    this.throwIfNodeExistsInList(node);
    this.addNodeToGraph(node);
  }
  public addEdge(sourceNode: NT, targetNode: NT, edge: ET): void {
    this.throwIfNodeNotExistsInList(sourceNode);
    this.throwIfNodeNotExistsInList(targetNode);
    this.throwIfEdgeExistsInList(edge);
    this.throwIfEdgeIdExistsInList(edge);
    this.addEdgeToNode(sourceNode, edge);
    if (!edge.isUnidirectional) {
      this.addEdgeToNode(targetNode, edge);
    }
    this.addEdgeToGraph({
      edge,
      sourceNode,
      targetNode,
    });
  }
  protected isNodeExistsInList(soughtNode: NT): boolean {
    return Boolean(this.nodesWithAdjacentEdges.get(soughtNode));
  }
  protected isNodeIdExistsInList(nodeId: string): boolean {
    return this.nodesIds.has(nodeId);
  }
  protected throwIfNodeNotExistsInList(soughNode: NT): void {
    if (!this.isNodeExistsInList(soughNode)) {
      throw new Error('The node is not presented in graph');
    }
  }
  protected throwIfNodeExistsInList(soughNode: NT): void {
    if (!this.isNodeExistsInList(soughNode)) {
      throw new Error('The node is already presented in graph');
    }
  }
  protected throwIfNodeIdExistsInList(soughNode: NT): void {
    const nodeId = soughNode.id;
    if (!this.isNodeIdExistsInList(nodeId)) {
      throw new Error(
        `A node with the id "${nodeId}" is already presented in the graph`
      );
    }
  }
  protected isEdgeExistsInList(soughEdge: ET): boolean {
    return Boolean(this.edgesWithNodes.get(soughEdge));
  }
  protected isEdgeIdExistsInList(edgeId: string): boolean {
    return this.edgesIds.has(edgeId);
  }
  protected throwIfEdgeExistsInList(soughEdge: ET): void {
    if (!this.isEdgeExistsInList(soughEdge)) {
      throw new Error('The edge is already exists in the list');
    }
  }
  protected throwIfEdgeIdExistsInList(soughEdge: ET): void {
    const edgeId = soughEdge.id;
    if (!this.isEdgeIdExistsInList(edgeId)) {
      throw new Error(
        `The edge with the same id "${edgeId}" is already exist in the list`
      );
    }
  }
  protected addNodeToGraph(node: NT): void {
    this.nodesWithAdjacentEdges.set(node, new Set());
    this.nodesIds.add(node.id);
  }
  protected addEdgeToNode(node: NT, edge: ET): void {
    this.nodesWithAdjacentEdges.get(node)?.add(edge);
  }
  protected addEdgeToGraph({
    edge,
    sourceNode,
    targetNode,
  }: {
    edge: ET;
    sourceNode: NT;
    targetNode: NT;
  }): void {
    this.edgesWithNodes.set(edge, [sourceNode, targetNode]);
    this.edgesIds.add(edge.id);
  }
}
