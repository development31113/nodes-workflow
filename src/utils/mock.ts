import { INode } from '../interfaces/INode';
import { ImDatabase } from 'react-icons/im';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { GiGears } from 'react-icons/gi';
import { waiter } from './common';

export const nodesList: INode[] = [
  {
    title: 'Data Generator',
    description: 'Source',
    icon: ImDatabase,
    status: 'toDo',
    nodeClasses: 'tw-bg-amber-500',
    iconClasses: 'tw-text-green-700',
    outputSockets: [{}],
    locked: false,
    process: async () => {
      await waiter(3000);
      return true;
    },
  },
  {
    title: 'Case Switch Data',
    description: 'Manipulator',
    icon: HiSwitchHorizontal,
    status: 'toDo',
    nodeClasses: 'tw-bg-yellow-400',
    inputSockets: [{}, {}],
    outputSockets: [{}, {}],
    locked: false,
    process: async () => {
      await waiter(3000);
      return true;
    },
  },
  {
    title: 'Cluster Assigner',
    description: 'Predictor',
    icon: GiGears,
    status: 'toDo',
    nodeClasses: 'tw-bg-green-700',
    iconClasses: 'tw-text-lime-300',
    inputSockets: [{}, {}],
    locked: false,
    process: async () => {
      await waiter(3000);
      return true;
    },
  },
];
