export default function InputRadio({ text, id, inputRef, ...props }) {
  return (
    <div className='input_radio'>
      <input type='radio' id={id} {...props} ref={inputRef} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}
