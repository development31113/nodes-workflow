import VisualEditorPanel from 'components/panels/visualEditorPanel/VisualEditorPanel';
import { INode } from 'interfaces/INode';
import React, { useEffect, useState } from 'react';
import AppPanel from '../containers/AppPanel';
import OptionsPanel from '../panels/optionsPanel/OptionsPanel';
const uuid = require('uuid').v4;

const WorkflowLayout: React.FC = () => {
  const [stageNodes, setStageNodes] = useState<INode[]>([]);

  const addNodeHandler = (node: INode) => {
    node.id = uuid();
    node.inputSockets?.forEach((socket) => (socket.id = uuid()));
    node.outputSockets?.forEach((socket) => (socket.id = uuid()));
    setStageNodes([...stageNodes, node]);
  };

  const startWorkHandler = async () => {
    const nodes = stageNodes.filter((node) => !node.inputSockets && node.outputSockets);
    startNodesProgress(nodes);
  };

  const startNodesProgress = async (progressNodes: INode[]) => {
    const nodes = [...stageNodes];
    progressNodes.forEach((node) => {
      const nodeIndex = stageNodes.findIndex((searchNode) => searchNode.id === node.id);
      if (nodeIndex !== -1) {
        const node = { ...nodes[nodeIndex] };
        node.status = 'inProgress';
        nodes[nodeIndex] = node;
        if (node.inputSockets) {
          node.inputSockets.forEach((socket) => {
            if (socket.node?.id) {
              const prevNodeIndex = stageNodes.findIndex((searchNode) => searchNode.id === socket.node?.id);
              if (prevNodeIndex !== -1) {
                nodes[prevNodeIndex] = { ...nodes[prevNodeIndex], locked: true, status: 'done' };
              }
            }
          });
        }
      }
    });
    setStageNodes(nodes);
  };

  const doWork = async (node: INode) => {
    const nodeIndex = stageNodes.findIndex((searchNode) => searchNode.id === node.id);
    if (nodeIndex !== -1) {
      const res = await node.process();
      if (res) {
        const doneNodes = [...stageNodes];
        doneNodes[nodeIndex] = { ...doneNodes[nodeIndex], status: 'done' };
        setStageNodes(doneNodes);
      }
    }
  };

  const nextNode = async (node: INode) => {
    if (node.outputSockets) {
      const progressNodes: INode[] = [];
      node.outputSockets.forEach((socket) => {
        if (socket.node?.id) {
          const node = stageNodes.find((node) => node.id === socket.node?.id);
          node && progressNodes.push(node);
        }
      });
      progressNodes.length && startNodesProgress(progressNodes);
    }
  };

  useEffect(() => {
    const nodes = stageNodes.filter((node) => node.status === 'inProgress');
    if (nodes.length) {
      doWork(nodes[0]);
    } else {
      const doneNodes = stageNodes.filter((node) => node.status === 'done' && !node.locked);
      doneNodes.length && nextNode(doneNodes[0]);
    }
  }, [stageNodes]);

  const refreshStageHandler = () => setStageNodes([]);

  return (
    <div className="tw-flex tw-h-full">
      <div className="tw-w-72">
        <AppPanel title="Options" className="tw-border-r-0">
          <OptionsPanel addNode={addNodeHandler} onStartWork={startWorkHandler} onRefreshStage={refreshStageHandler} />
        </AppPanel>
      </div>
      <AppPanel title="Visual Editor">
        <VisualEditorPanel stageNodes={stageNodes} setStageNodes={setStageNodes} />
      </AppPanel>
    </div>
  );
};

export default WorkflowLayout;
