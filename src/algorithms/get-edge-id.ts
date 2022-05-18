import {uuid} from 'uuidv4';

export function getEdgeId(): string {
  return uuid();
}
