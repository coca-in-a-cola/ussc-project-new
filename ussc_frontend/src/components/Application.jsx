import Button from './Button';

export default function Application({ directionName, applicationId, role, requestAllow, tests, testIndex }) {
  let text = "";
  let button = () => {return <></>};
  if(requestAllow === null)
  {
    text = 'Твоя заявка находится в рассмотрении. Теперь нужно дождаться, когда администратор проверит её и даст обратную связь, стаутс своей заявки ты можешь ослеживать здесь.';
    button = () => {return <></>};
  }
  else
    if (requestAllow === false)
    {
      text = 'К сожалению, администратор отклонил твою заявку. Не расстраивайся, мы ждём тебя в следующем году!';
      button = () => {return <></>};
    }
    else
      if (requestAllow === true)
      {
        if(testIndex === -1)
        {
          text = 'Отлично! Твоя заявка одобрена, приступай к выполнению тестового. ';
          button = () => {return (<a href={"./task/"+applicationId.userId+"/"+applicationId.directionId}><Button >Выполнить тестовое</Button></a>)}
        }
        else
          if (tests[testIndex].path != null)
          {
            if (tests[testIndex].isAllowed === null)
            {
              text = 'Преподаватель проверяет твоё тестовое. Совсем скоро ты получишь обратную связь!';
              button = () => {return <></>};
            }
            if (tests[testIndex].isAllowed === true)
            {
              text = 'Поздравляем! Ты успешно справился с тестовым заданием, мы ждём тебя на практике от U summer school. Скоро здесь появится вся необходимая информация по её прохождению.';
              button = () => {return (<a href={"./awdawdawd/"+applicationId}><Button >Результат тестового</Button></a>)}
            }
            if (tests[testIndex].isAllowed === false)
            {
              text = 'К сожалению, тебе не удалось выполнить тестовое задание достаточно хорошо. Не расстраивайся, мы ждём тебя в следующем году!';
              button = () => {return (<a href={"./awdawdawd/"+applicationId}><Button >Результат тестового</Button></a>)}
            }
          }
      }
      debugger;
  return (
    <div className='application'>
      <div className='application_content'>
        <div className='texts'>
          <div className='direction_info'>
            <h2>{directionName}</h2>
            <div className='role'>
              <span>Роль:</span>
              <span>{role}</span>
            </div>
          </div>
          <p className='status'>{text}</p>
        </div>
        {button()}

        {/*<Button >Выполнить тестовое</Button>*/}
      </div>
    </div>
  );
}
