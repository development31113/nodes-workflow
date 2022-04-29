import classNames from 'classnames';
import React from 'react';

interface IAppPanelProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const AppPanel: React.FC<IAppPanelProps> = ({ title, className, children }) => {
  return (
    <div className={classNames('tw-flex tw-flex-col tw-h-full tw-w-full tw-border-2 tw-border-solid tw-border-slate-400', className)}>
      <div className="tw-bg-blue-300 tw-font-semibold tw-text-blue-900 tw-text-sm tw-py-2px tw-px-2">{title}</div>
      <div className="tw-bg-slate-100 tw-p-2 tw-h-full">{children}</div>
    </div>
  );
};

export default AppPanel;
