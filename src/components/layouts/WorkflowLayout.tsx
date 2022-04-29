import { INode } from 'interfaces/INode';
import React, { useState } from 'react';
import { useEffect } from 'react';
import AppPanel from '../containers/AppPanel';
import OptionsPanel from '../panels/optionsPanel/OptionsPanel';

const WorkflowLayout: React.FC = () => {
  const [stageNodes, setStageNodes] = useState<INode[]>([]);

  const addNodeHandler = (node: INode) => {
    setStageNodes([...stageNodes, node]);
  };

  useEffect(() => {
    console.log(stageNodes);
  }, [stageNodes]);

  return (
    <div className="tw-flex tw-h-full">
      <div className="tw-w-72">
        <AppPanel title="Options" className="tw-border-r-0">
          <OptionsPanel addNode={addNodeHandler} />
        </AppPanel>
      </div>
      <AppPanel title="Visual Editor">
        <div>Main Panel</div>
      </AppPanel>
    </div>
  );
};

export default WorkflowLayout;
