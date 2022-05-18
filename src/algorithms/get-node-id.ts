import {uuid} from 'uuidv4';

export function getNodeId(): string {
  return uuid();
}
