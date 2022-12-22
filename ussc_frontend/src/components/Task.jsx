import TableRow from './TableRow';
import TableHeader from './TableHeader';
import {getAllApplications} from '../store/slices/allApplicationsSlice';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../store/slices/allUsersSlice';
import {getAllTests} from "../store/slices/allTestsSlice";
import {getDirections} from "../store/slices/directionSlice";
import Table from "./Table";
import {sendCheckApplication} from "../store/slices/applicationCheckSlice";
import {sendCheckTest} from "../store/slices/testCheckSlice";
import {useForm} from "react-hook-form";
import FileField from "./FileField";
import Button from "./Button";
import GoBackButton from "./GoBackButton";
import TaskDescription from "./TaskDescription";
import {uploadTest} from "../store/slices/testUserSlice";

export default function Task({type, task, users, user}) {
    return <Tsk task={task} user={user}/>;
}

function Tsk(data) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users);
    const applications = useSelector((state) => state.applications.applications);
    const practices = useSelector((state) => state.directions.directions);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllApplications());
        dispatch(getDirections());
        dispatch(getAllTests());
    }, []);

    const [file, setFile] = React.useState();
    const onClick = () => {debugger;dispatch(uploadTest({userId:data.user, directionId:data.task, file:file}));}
    debugger;
    return (
        <div>
            <div className='task'>
                <GoBackButton style={{ marginBottom: '43px' }} />
                <TaskDescription text={123} />
            </div>
            <div className='task_submission'>
                {/*<p className='info_text' style={{ marginBottom: '43px' }}>*/}
                {/*    Срок сдачи:...*/}
                {/*</p>*/}
                <FileField title='Прикрепить ответ на задание' set={setFile} />
                <p className='info_text' style={{ marginTop: '15px' }}>
                    Добавить файл в формате .zip
                </p>
                <Button style={{ marginTop: '40px' }} onClick={onClick}>Отправить</Button>
            </div>
        </div>
    );
}