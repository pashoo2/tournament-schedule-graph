import {
  AttributeName,
  EdgeType,
  GameMode,
  GameType,
  NodeType,
} from '@root/enum';
import {INode} from '../nodes';
import {IEdge} from '../edges';
import {TGameSlotIndex} from '../common';
import {IAttributeNode} from '../attribute';

export type TGameSlotNode = INode<NodeType.GameSlot, TGameSlotIndex>;

export type TGameTypeEdge = IEdge<EdgeType.GameType, true, GameType>;

export type TGameModeEdge = IEdge<EdgeType.Attribute, false, GameMode>;

export type TGameSlotRivalEdge = IEdge<EdgeType.GameSlotRival, false, null>;

export type TGameSlotParticipantEdge = IEdge<
  EdgeType.GameSlotParticipant,
  false,
  null
>;

export type TGameModeAttributeNode = IAttributeNode<
  AttributeName.GameMode,
  GameMode
>;
