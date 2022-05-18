import {EdgeType} from '@root/enum';
import {IEdge} from '../edges';
import {TGameResultPoint} from '../common';

export type IWinnerEdge = IEdge<EdgeType.Winner, false, TGameResultPoint>;

export type ILooserEdge = IEdge<EdgeType.Looser, false, TGameResultPoint>;
