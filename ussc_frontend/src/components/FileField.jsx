import React from 'react';
import AddFileButton from './AddFileButton';

const FileField = ({ title, style, set, ...props }) => {
  const [text, setText] = React.useState(title);
  debugger;
  return (
    <div
      className='file_field'
      style={style ? style : { width: '727px', height: '193px' }}
      {...props}
    >
      <div className='wrapper'>
        <AddFileButton handleFile={(file) => {setText(file.name); set(file); debugger}} />
        <p className='info_text'>{text}</p>
      </div>
    </div>
  );
};

export default FileField;
