import VisualEditorPanel from 'components/panels/visualEditorPanel/VisualEditorPanel';
import { INode } from 'interfaces/INode';
import React, { useState } from 'react';
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
    for (const node of nodes) {
      await nodeProgress(node, stageNodes);
    }
  };

  const nodeProgress = async (node: INode, stageNodes: INode[]) => {
    const nodeIndex = stageNodes.findIndex((searchNode) => searchNode.id === node.id);
    if (nodeIndex !== -1) {
      const progressNodes = [...stageNodes];
      progressNodes[nodeIndex] = { ...progressNodes[nodeIndex], status: 'inProgress' };
      setStageNodes(progressNodes);
      const res = await node.process();
      if (res) {
        const doneNodes = [...progressNodes];
        doneNodes[nodeIndex] = { ...doneNodes[nodeIndex], status: 'done' };
        setStageNodes(doneNodes);
        if (node.outputSockets) {
          for (const socket of node.outputSockets) {
            if (socket.node?.id) {
              const node = stageNodes.find((node) => node.id === socket.node?.id);
              node && (await nodeProgress({ ...node }, doneNodes));
            }
          }
        }
      }
    }
  };

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
