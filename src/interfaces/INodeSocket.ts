import { IArrowDrawable } from './IArrowDraweble';
import { INode } from './INode';

export interface INodeSocket {
  id?: string;
  node?: INode;
  socket?: INodeSocket;
  arrow?: IArrowDrawable;
}
