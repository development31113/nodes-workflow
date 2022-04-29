import React, { useState } from 'react';
import AppInput from 'components/contorls/AppInput';
import { nodesList } from 'utils/mock';
import NodeOptionItem from './NodeOptionItem';
import { INode } from 'interfaces/INode';

interface IOptionsPanelProps {
  addNode: (node: INode) => void;
}

const OptionsPanel: React.FC<IOptionsPanelProps> = ({ addNode }) => {
  const [search, setSearch] = useState<string>('');
  const resNodesList = search ? nodesList.filter((node) => node.title.toLowerCase().includes(search.toLowerCase())) : nodesList;

  return (
    <div>
      <AppInput label="Search Node" value={search} onChange={setSearch} />
      <div className="tw-d-flex tw-flex-col tw-mt-5">
        <div className="tw-text-xs tw-font-semibold tw-text-blue-900 tw-mb-1">Nodes List</div>
        <div className="tw-w-full tw-border tw-border-solid tw-border-slate-400 tw-rounded tw-bg-transparent tw-text-base tw-text-slate-900 tw-overflow-x-hidden tw-overflow-y-auto">
          {resNodesList.map((item, index) => {
            const { title, icon, iconClasses } = item;
            return (
              <NodeOptionItem key={`node_option_item_${index}`} title={title} icon={icon} iconClasses={iconClasses} onClick={() => addNode(item)} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;
