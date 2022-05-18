import {EdgeType, GameType, NodeType} from '@root/enum';
import {INode} from '../nodes';
import {IEdge} from '../edges';

export type IGameSlotNode = INode<NodeType.GameSlot>;

export type IGameTypeEdge = IEdge<EdgeType.GameType, true, GameType>;

export type IGameSlotRivalEdge = IEdge<EdgeType.GameSlotRival, false, null>;

export type IGameSlotParticipantEdge = IEdge<
  EdgeType.GameSlotParticipant,
  false,
  null
>;
