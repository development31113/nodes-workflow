import React, { useState } from 'react';
import AppInput from 'components/contorls/AppInput';
import { nodesList } from 'utils/mock';
import NodeOptionItem from './NodeOptionItem';
import { INode } from 'interfaces/INode';
import AppButton from 'components/contorls/AppButton';

interface IOptionsPanelProps {
  addNode: (node: INode) => void;
  onStartWork: () => void;
  onRefreshStage: () => void;
}

const OptionsPanel: React.FC<IOptionsPanelProps> = ({ addNode, onStartWork, onRefreshStage }) => {
  const [search, setSearch] = useState<string>('');
  const resNodesList = search ? nodesList.filter((node) => node.title.toLowerCase().includes(search.toLowerCase())) : nodesList;

  return (
    <div className="tw-p-2">
      <AppInput label="Search Node" value={search} onChange={setSearch} />
      <div className="tw-d-flex tw-flex-col tw-mt-5">
        <div className="tw-text-xs tw-font-semibold tw-text-blue-900 tw-mb-1">Nodes List</div>
        <div className="tw-w-full tw-border tw-border-solid tw-border-slate-400 tw-rounded tw-bg-transparent tw-text-base tw-text-slate-900 tw-overflow-x-hidden tw-overflow-y-auto">
          {resNodesList.map((item, index) => {
            const { title, icon, iconClasses } = item;
            return (
              <NodeOptionItem
                key={`node_option_item_${index}`}
                title={title}
                icon={icon}
                iconClasses={iconClasses}
                onClick={() => addNode({ ...item })}
              />
            );
          })}
        </div>
      </div>
      <AppButton onClick={onStartWork} full className="tw-mt-6">
        Start Work
      </AppButton>

      <AppButton onClick={onRefreshStage} full outlined className="tw-mt-2">
        Refresh stage
      </AppButton>
    </div>
  );
};

export default OptionsPanel;
