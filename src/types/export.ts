import {IGraph} from '@root/types';

export interface IExportGraph<G extends IGraph<any, any>, Output> {
  (graph: G): Output;
}
