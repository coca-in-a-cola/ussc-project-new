import React from 'react';
import plusImg from '../img/plus.svg';

const AddFileButton = (props) => {
  const hiddenFileInput = React.useRef(null);
debugger;
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <button className='add_button' onClick={handleClick}>
        <img src={plusImg} />
      </button>
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        id=''
        accept='.zip'
        style={{ display: 'none' }}
      />
    </>
  );
};

export default AddFileButton;
