import React from 'react';

interface INodeOptionItemProps {
  title: string;
  icon: React.FC;
  iconClasses?: string;
  onClick: () => void;
}

const NodeOptionItem: React.FC<INodeOptionItemProps> = ({ title, icon, iconClasses, onClick }) => {
  return (
    <div
      className="tw-flex tw-items-center tw-border-b tw-border-solid tw-border-slate-400 tw-p-2 tw-cursor-pointer hover:tw-bg-slate-200"
      onClick={onClick}
    >
      {React.createElement(icon as React.FC<{ size: string; className?: string }>, { size: '15px', className: iconClasses })}
      <div className="tw-ml-2 tw-text-sm">{title}</div>
    </div>
  );
};

export default NodeOptionItem;
