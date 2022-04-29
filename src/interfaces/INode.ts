export type WorkStatus = 'toDo' | 'inProgress' | 'done';

export interface INodeSocket {
  isRequired?: boolean;
  node?: INode;
}

export interface INode {
  title: string;
  description: string;
  status: WorkStatus;
  icon: React.FC;
  iconClasses?: string;
  nodeClasses?: string;
  inputSockets?: INodeSocket[];
  outputSockets?: INodeSocket[];
  process: () => void;
}
