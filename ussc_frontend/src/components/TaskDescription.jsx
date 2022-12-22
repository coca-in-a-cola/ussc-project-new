import React from 'react';

const TaskDescription = ({ text, ...props }) => {
  return (
    <div className='task_description'>
      <h1 className='heading'>Название</h1>
      <section className='definition'>
        <h2>Формулировка</h2>
        <p>Текст</p>
      </section>
      <section className='result'>
        <h2>Результат</h2>
        <p>Текст</p>
      </section>
      <section className='annotation'>
        <h2>Пояснение</h2>
        <p>Текст</p>
      </section>
      <section className='needed'>
        <p>Файл</p>
      </section>
      {/*<pre className='text'>{text}</pre>*/}
    </div>
  );
};

export default TaskDescription;
