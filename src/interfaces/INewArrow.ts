import { IArrowDrawable } from './IArrowDraweble';
import { INode } from './INode';
import { INodeSocket } from './INodeSocket';

export interface INewArrow {
  arrow: IArrowDrawable;
  from: {
    node: INode;
    socket: INodeSocket;
  };
}
