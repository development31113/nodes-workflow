import React from 'react';

interface IAppInputProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}

const AppInput: React.FC<IAppInputProps> = ({ label, value, onChange }) => {
  const inputChangeHandler = (val: string) => {
    onChange(val);
  };

  return (
    <div className="tw-flex tw-flex-col">
      {label && (
        <label htmlFor={label} className="tw-text-xs tw-font-semibold tw-text-blue-900 tw-mb-1">
          {label}
        </label>
      )}
      <input
        id={label}
        value={value}
        type="text"
        className="tw-w-full tw-border tw-border-solid tw-border-slate-400 tw-rounded tw-py-1 tw-px-2 tw-bg-transparent tw-text-base tw-text-slate-900"
        onChange={(e) => inputChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default AppInput;
