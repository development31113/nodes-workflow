import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface AppInputProps {
  children: ReactNode;
  className?: string;
  full?: boolean;
  outlined?: boolean;
  onClick: () => void;
}

const AppButton: React.FC<AppInputProps> = ({ children, className, full, outlined = false, onClick }) => {
  return (
    <div
      className={classNames(
        'tw-py-1 tw-px-4 tw-cursor-pointer tw-select-none tw-rounded-lg tw-text-base tw-border tw-border-solid tw-border-blue-900 tw-bg-blue-900',
        outlined ? 'tw-bg-opacity-0 hover:tw-bg-opacity-10' : 'hover:tw-bg-opacity-90',
        className,
        full ? 'tw-w-full' : 'tw-w-max'
      )}
      onClick={onClick}
    >
      <div className={classNames('tw-flex tw-items-center tw-justify-center tw-font-semibold', outlined ? 'tw-text-blue-900' : 'tw-text-white')}>
        {children}
      </div>
    </div>
  );
};

export default AppButton;
