import React from 'react';

const TaskDescription = ({ text, ...props }) => {
  return (
    <div className='task_description'>
      <h1 className='heading'>{text}</h1>
      <section className='needed'>
        <p>Файл</p>
      </section>
      {/*<pre className='text'>{text}</pre>*/}
    </div>
  );
};

export default TaskDescription;
