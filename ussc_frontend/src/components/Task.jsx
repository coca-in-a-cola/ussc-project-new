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
    const [file, setFile] = React.useState();

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllApplications());
        dispatch(getDirections());
        dispatch(getAllTests());
    }, []);

    if(!practices) return;
    const practiceIndex = practices.findIndex((practice) => {
        return practice.roles.some((role) => { return data.task === role.id});
    });
    if (practiceIndex === -1) return;
    const roleIndex = practices[practiceIndex].roles.findIndex((role) => {
        return data.task===role.id;
    });


    const onClick = () => {debugger;dispatch(uploadTest({userId:data.user, directionId:data.task, file:file}));}
    debugger;
    return (
        <div>
            <div className='task'>
                <GoBackButton style={{ marginBottom: '43px' }} />
                <TaskDescription text={practices[practiceIndex].roles[roleIndex].directions} />
                <a href={HOST + "/testcase/download?directionId="+data.task}><div className="download">Скачать тестовое задание</div></a>
            </div>
            <div className='task_submission'>
                {/*<p className='info_text' style={{ marginBottom: '43px' }}>*/}
                {/*    Срок сдачи:...*/}
                {/*</p>*/}
                <FileField title='Прикрепить ответ на задание' type={"0"} set={setFile} />
                <p className='info_text' style={{ marginTop: '15px' }}>
                    Добавить файл в формате .zip
                </p>
                <Button style={{ marginTop: '40px' }} onClick={onClick}>Отправить</Button>
            </div>
        </div>
    );
}