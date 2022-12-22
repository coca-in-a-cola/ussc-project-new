import okIcon from '../img/ok_icon.svg';

export function TestCaseSentOK() {
  return (
    <div className='testcasesent_ok'>
      <div className='content'>
        <h1 className='title'>Ваше задание успешно отправлено!</h1>
        <p className='info'>Ожидайте ответа</p>
        <img className='icon' src={okIcon} alt='' />
      </div>
    </div>
  );
}
