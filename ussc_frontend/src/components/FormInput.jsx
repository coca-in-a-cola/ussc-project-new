import React from 'react';

const FormInput = ({ label, type, name, id, required, ...props }) => {
  return (
    <label className='form_input_wrapper'>
      {label ? (
        <p className='form_input_label'>
          {label}
          {required ? '*' : ''}
        </p>
      ) : (
        <></>
      )}
      <input
        required={required}
        className='form_input'
        type={type}
        name={name}
        id={id}
        {...props}
      />
    </label>
  );
};

export default FormInput;
