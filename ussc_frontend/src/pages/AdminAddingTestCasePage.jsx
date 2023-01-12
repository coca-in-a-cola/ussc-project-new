import GoBackButton from '../components/GoBackButton';
import Button from '../components/Button';
import React from 'react';
import plusIcon from '../img/plus.svg';
import RolesEdit from '../components/RolesEdit';
import {useFieldArray, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../store/slices/allUsersSlice';
import {getAllTests} from "../store/slices/allTestsSlice";
import {getDirections, addFileDirections} from "../store/slices/directionSlice";
import {getAllApplications} from '../store/slices/allApplicationsSlice';
import FileField from '../components/FileField';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminAddingTestCasePage() {
    let navigate = useNavigate();
    const { testId } = useParams();
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
    const onClick = () => {
        debugger;
        files.map((file, index) =>
        {
            toast.promise(dispatch(addFileDirections({direction:practices[practiceIndex].roles[index].id, file:file})), {
                pending: 'Загрузка файла',
                success: 'Файл успешно загружен 👌',
                error: 'Файл не загружен 🤯'
                // });
            }).then(() => navigate('/admin/directions/'))}
        );
    }
    const call = (direction) => {return onClick(direction)}
    const practiceIndex = practices.findIndex((practice) => {
        return practice.id === testId ;
    });

    const files = [];
    const setFiles = (i, path) => {debugger;files[i] = path};
    if(!practices.length) return;
    practices[practiceIndex].roles.map((role, index) => {files.push({file: 0})});
    debugger;

    return (
        <div className='content_wrapper'>
            <div className='edits'>
                <GoBackButton/>
                <div className='heading'>Добавить тестовое</div>
                <div className='task_submission'>
                {
                    practices.length ? (
                        practices[practiceIndex].roles.map((role, indexx) => {
                            return (
                                <>
                                    <div className='heading'>Для роли {role.directions}</div>
                                <FileField title='Прикрепить ответ на задание' idd={indexx} type={"1"} set={setFiles} />
                                <p className='info_text' style={{ marginTop: '15px' }}>
                                    Добавить файл в формате .zip
                                </p>

                                </>)
                        })) : (<div></div>)
                }
                </div>
                <Button style={{ marginTop: '40px' }} onClick={onClick}>Отправить</Button>
                {/*<Button onClick={call(role.directions)}>Добавить тестовое</Button>*/}
            </div>
        </div>
    )

}
