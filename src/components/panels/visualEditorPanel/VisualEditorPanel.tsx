import { IArrowDrawable } from 'interfaces/IArrowDraweble';
import { INewArrow } from 'interfaces/INewArrow';
import { INode } from 'interfaces/INode';
import { INodeSocket } from 'interfaces/INodeSocket';
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Arrow, Group, Layer, Stage } from 'react-konva';
import NodeStageItem from './NodeStageItem';

interface IVisualEditorPanelProps {
  stageNodes: INode[];
  setStageNodes: (nodes: INode[]) => void;
}

const VisualEditorPanel: React.FC<IVisualEditorPanelProps> = ({ stageNodes, setStageNodes }) => {
  const [newArrow, setNewArrow] = useState<INewArrow>();
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>();

  const stageRef = React.useRef<Konva.Stage>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = panelRef.current?.clientWidth;
    const height = panelRef.current?.clientHeight;
    width && height && setStageSize({ width, height });
  }, []);

  const handleStartDrawArrow = (node: INode, socket: INodeSocket) => {
    if (!newArrow && stageRef?.current) {
      const position = stageRef.current.getPointerPosition();
      position &&
        setNewArrow({
          arrow: { startX: position.x, startY: position.y, x: position.x, y: position.y },
          from: {
            node,
            socket,
          },
        });
    }
  };

  const handleDrawArrow = () => {
    if (newArrow && stageRef?.current) {
      const position = stageRef.current.getPointerPosition();
      position && setNewArrow({ ...newArrow, arrow: { ...newArrow.arrow, x: position.x, y: position.y } });
    }
  };

  const mouseUpHandler = () => {
    setNewArrow(undefined);
  };

  const handleFinishDrawArrow = (node: INode, socket: INodeSocket) => {
    if (newArrow) {
      const { arrow, from } = newArrow;
      const nodes = [...stageNodes];
      const startNodeIndex = nodes.findIndex((node) => node.id === from.node.id);
      if (startNodeIndex !== -1) {
        const startNode = { ...nodes[startNodeIndex] };
        if (startNode.outputSockets) {
          const sockets = [...startNode.outputSockets];
          const socketIndex = sockets?.findIndex((socket) => socket.id === from.socket.id);
          if (socketIndex !== -1) {
            const socket = { ...sockets[socketIndex] };
            if (!socket.node) {
              socket.node = node;
              socket.arrow = { ...arrow };
            }
            sockets[socketIndex] = socket;
          }
          startNode.outputSockets = sockets;
        }
        const endNodeIndex = nodes.findIndex((endNode) => endNode.id === node.id);
        if (endNodeIndex !== -1) {
          const endNode = { ...nodes[endNodeIndex] };
          if (endNode.inputSockets) {
            const sockets = [...endNode.inputSockets];
            const socketIndex = sockets?.findIndex((inputSocket) => inputSocket.id === socket.id);
            if (socketIndex !== -1) {
              const socket = { ...sockets[socketIndex] };
              if (!socket.node) {
                socket.node = startNode;
              }
              sockets[socketIndex] = socket;
            }
            endNode.inputSockets = sockets;
          }
          nodes[endNodeIndex] = endNode;
        }
        nodes[startNodeIndex] = startNode;
      }
      setStageNodes(nodes);
      setNewArrow(undefined);
    }
  };

  const nodeMoveHandler = (node: INode, movementX: number, movementY: number) => {
    const nodes = [...stageNodes];
    const nodeIndex = nodes.findIndex((searchNode) => searchNode.id === node.id);
    if (nodeIndex !== -1) {
      const resNode = { ...nodes[nodeIndex] };
      if (resNode.outputSockets) {
        resNode.outputSockets = resNode.outputSockets.map((socket) => {
          const resSocket = { ...socket };
          if (resSocket.arrow) {
            resSocket.arrow = {
              ...resSocket.arrow,
              startX: resSocket.arrow.startX + movementX,
              startY: resSocket.arrow.startY + movementY,
            };
          }
          return resSocket;
        });
      }
      if (resNode.inputSockets) {
        resNode.inputSockets.forEach((socket) => {
          if (socket.node) {
            const nodeIndex = nodes.findIndex((searchNode) => searchNode.id === socket.node?.id);
            if (nodeIndex !== -1) {
              const node = { ...nodes[nodeIndex] };
              if (node.outputSockets) {
                const outputSockets = [...node.outputSockets];
                const socketIndex = node.outputSockets.findIndex((searchSocket) => searchSocket.node && searchSocket.node.id === resNode.id);
                if (socketIndex !== -1) {
                  const resSocket = { ...outputSockets[socketIndex] };
                  if (resSocket.arrow) {
                    resSocket.arrow = {
                      ...resSocket.arrow,
                      x: resSocket.arrow.x + movementX,
                      y: resSocket.arrow.y + movementY,
                    };
                  }
                  outputSockets[socketIndex] = resSocket;
                }
                node.outputSockets = outputSockets;
              }
              nodes[nodeIndex] = node;
            }
          }
        });
      }
      nodes[nodeIndex] = resNode;
    }
    setStageNodes(nodes);
  };

  const renderArrow = (arrow: IArrowDrawable, key: number | null = null) => {
    return (
      <Arrow
        key={`arrow_${key}`}
        points={[arrow.startX, arrow.startY, arrow.x, arrow.y]}
        fill="black"
        stroke="black"
        pointerLength={5}
        pointerWidth={5}
        strokeWidth={2}
      />
    );
  };

  return (
    <div ref={panelRef} className="tw-w-full tw-h-full">
      {stageSize && (
        <Stage width={stageSize.width} height={stageSize.height} ref={stageRef} onMouseMove={handleDrawArrow} onMouseUp={mouseUpHandler}>
          <Layer>
            {stageNodes.map((node, index) => (
              <Group key={`stage_node_${index}`}>
                <NodeStageItem
                  node={node}
                  onStartDrawArrow={(socket) => handleStartDrawArrow(node, socket)}
                  onFinishDrawArrow={(socket) => handleFinishDrawArrow(node, socket)}
                  onDragMove={(movementX, movementY) => nodeMoveHandler(node, movementX, movementY)}
                />
                {node.outputSockets && node.outputSockets.map((socket, socketIndex) => socket.arrow && renderArrow(socket.arrow, socketIndex))}
              </Group>
            ))}
            {newArrow && renderArrow(newArrow.arrow)}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default VisualEditorPanel;
