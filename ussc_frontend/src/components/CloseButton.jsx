import closeIcon from '../img/close_icon.svg';

export function CloseButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <img src={closeIcon} alt='' />
    </button>
  );
}
