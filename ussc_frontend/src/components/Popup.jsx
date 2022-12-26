import React from 'react';

const Popup = ({ active, toggleActive, content, ...props }) => {
  return (
    <div className={active ? 'popup active' : 'popup'} onClick={toggleActive}>
      {content}
    </div>
  );
};

export default Popup;
