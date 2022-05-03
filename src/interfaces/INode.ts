import { INodeSocket } from './INodeSocket';

export type NodeWorkStatus = 'toDo' | 'inProgress' | 'done';

export interface INode {
  id?: string;
  title: string;
  description: string;
  status: NodeWorkStatus;
  icon: React.FC;
  iconClasses?: string;
  nodeClasses?: string;
  inputSockets?: INodeSocket[];
  outputSockets?: INodeSocket[];
  process: () => Promise<boolean>;
}
