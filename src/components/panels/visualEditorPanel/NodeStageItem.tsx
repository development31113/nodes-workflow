import classNames from 'classnames';
import { INode } from 'interfaces/INode';
import React from 'react';
import { Group, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { INodeSocket } from 'interfaces/INodeSocket';
import { KonvaEventObject } from 'konva/lib/Node';

interface INodeStageItemProps {
  node: INode;
  onStartDrawArrow: (socket: INodeSocket) => void;
  onFinishDrawArrow: (socket: INodeSocket) => void;
  onDragMove: (movementX: number, movementY: number) => void;
}

const NodeStageItem: React.FC<INodeStageItemProps> = ({
  node: { title, description, icon, status, iconClasses, nodeClasses, inputSockets, outputSockets },
  onStartDrawArrow,
  onFinishDrawArrow,
  onDragMove,
}) => {
  const calculateTopSocketPosition = (count: number, index: number, height: number) => (40 / (count + 1)) * (index + 1) - height / 2;

  const finishDrawArrowHandler = (socket: INodeSocket) => {
    !socket.node && onFinishDrawArrow(socket);
  };

  const dragMoveHandler = (e: KonvaEventObject<DragEvent>) => {
    onDragMove(e.evt.movementX, e.evt.movementY);
  };

  const renderInputSockets = () => {
    return inputSockets?.map((socket, index) => {
      return (
        <div
          key={`input_${index}`}
          className="tw-absolute tw-h-10px tw-w-10px tw--left-10px tw-bg-blue-900 tw-pointer-events-auto"
          style={{ top: calculateTopSocketPosition(inputSockets.length, index, 10) }}
          onMouseUp={() => finishDrawArrowHandler(socket)}
        ></div>
      );
    });
  };

  const renderOutputSockets = () => {
    return outputSockets?.map((socket, index) => {
      return (
        <AiOutlineCaretRight
          key={`input_${index}`}
          className={classNames('tw-absolute tw--right-10px tw-pointer-events-auto', socket.node ? 'tw-text-blue-700' : 'tw-text-red-700')}
          size={14}
          style={{ top: calculateTopSocketPosition(outputSockets.length, index, 14) }}
          onMouseDown={() => onStartDrawArrow(socket)}
        />
      );
    });
  };

  return (
    <Group draggable x={50} y={50} onDragMove={dragMoveHandler}>
      <Rect x={20} y={32} width={40} height={40} />
      <Html divProps={{ style: { pointerEvents: 'none' } }}>
        <div className="tw-flex tw-flex-col tw-items-center tw-w-20 tw-select-none">
          <div className="tw-font-semibold tw-text-sm tw-text-blue-900 tw-text-center tw-leading-none tw-mb-1">{title}</div>
          <div className={classNames('tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-mb-1 tw-relative', nodeClasses)}>
            {React.createElement(icon as React.FC<{ size: string; className?: string }>, { size: '25px', className: iconClasses })}
            <div>{renderInputSockets()}</div>
            <div>{renderOutputSockets()}</div>
          </div>
          <div className="tw-w-16 tw-flex tw-items-center tw-justify-between tw-py-1 tw-px-2 tw-bg-slate-500 tw-rounded-md">
            <div className={classNames('tw-w-3 tw-h-3 tw-rounded-full', status === 'toDo' ? 'tw-bg-red-600' : 'tw-bg-white')}></div>
            <div className={classNames('tw-w-3 tw-h-3 tw-rounded-full', status === 'inProgress' ? 'tw-bg-yellow-300' : 'tw-bg-white')}></div>
            <div className={classNames('tw-w-3 tw-h-3 tw-rounded-full', status === 'done' ? 'tw-bg-green-500' : 'tw-bg-white')}></div>
          </div>
          <div className="tw-text-xs tw-text-center tw-mt-2px">{description}</div>
        </div>
      </Html>
    </Group>
  );
};

export default NodeStageItem;
