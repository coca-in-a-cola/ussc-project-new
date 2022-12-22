import React from 'react';

const Checkbox = ({ name, id, label, disabled, style, ...props }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className='checkbox_wrapper' style={style}>
      <input
        className={isChecked ? 'checked' : ''}
        type='checkbox'
        name={name}
        id={id}
        onChange={() => setIsChecked((prev) => !prev)}
        disabled={disabled}
        {...props}
      />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
