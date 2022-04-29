import React from 'react';
import AppPanel from '../containers/AppPanel';

const WorkflowLayout: React.FC = () => {

  return (
    <div className="tw-flex">
      <div className="tw-w-60"><AppPanel title='Options' className='tw-border-r-0'>Options Panel</AppPanel></div>
      <AppPanel title='Visual Editor'><div>Main Panel</div></AppPanel>
    </div>
  );
};

export default WorkflowLayout;
