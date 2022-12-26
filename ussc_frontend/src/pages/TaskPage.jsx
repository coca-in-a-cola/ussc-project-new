import React from 'react';
import Button from '../components/Button';
import FileField from '../components/FileField';
import GoBackButton from '../components/GoBackButton';
import TaskDescription from '../components/TaskDescription';
import Task from "../components/Task";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const text = `Тестовое задание (название)

Формулировка тестового задания

(Текст формулировки)
Необходимо развернуть веб-сайт:
•	Nginx
•	Php-fpm
•	Содержимое index.php
<?php echo 'Hello World'; ?>
Для разверnывания использовать docker
Сайт разворачивается на чисто установленном образе linux ubuntu (minimal)

Результаты выполнения задания

(Текст результата)
Архивный файл, 
содержащий инструкцию по установке 
и архив с необходимыми конфигами.

Пояснения

(Текст пояснения)
 - Чем меньше архив с результатом и короче инструкция, тем выше оценка.
 - Сервер для разворачивания имеет выход в интернет.

`;

const TaskPage = () => {
    const {userId, taskId } = useParams();
    debugger;
  return (
    <div className='taskpage_wrapper'>
      <Task user={userId} task={taskId}/>
    </div>
  );
};

export default TaskPage;
