import TableRow from './TableRow';
import TableHeader from './TableHeader';
import {getAllApplications} from '../store/slices/allApplicationsSlice';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../store/slices/allUsersSlice';
import {getAllTests} from "../store/slices/allTestsSlice";
import {getDirections} from "../store/slices/directionSlice";
import Table from "./Table";
import {sendCheckApplication} from "../store/slices/applicationCheckSlice";
import {sendCheckTest} from "../store/slices/testCheckSlice";
import {useForm} from "react-hook-form";

export default function ASTP({type, users, applications, tests, directions, practices, user, test}) {
    return <AS user={user} test={test}/>;
}

function AS(data) {
    const {register, handleSubmit, setValue, control} = useForm({
        defaultValues: {
            discriptions: "",
        },
    });
    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();

    // const applications = useSelector(
    //     (state) => state.allApplications.allApplications
    // );
    // const tests = useSelector(
    //     (state) => state.allTests.allTests
    // );
    const users = useSelector((state) => state.allUsers.users);
    // const userIndex = users.findIndex((user) => {
    //     return app.userId === user.id;
    // });
    const practices = useSelector((state) => state.directions.directions);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllApplications());
        dispatch(getAllTests());
        dispatch(getDirections());
    }, []);
    debugger;
    const onSubmit = (payload) => {
        console.dir(payload);
        console.log(checked);
        debugger;
        dispatch(sendCheckTest({allow: checked, userId: data.user, testId: data.test, description: payload.discriptions}))
    };

    const userIndex = users.findIndex((user) => {
        return data.user === user.id;
    });

    const practiceIndex = practices.findIndex((practice) => {
        return practice.roles.some((role) => {
            return data.test === role.id;
        });
    });
    debugger;
    return (
        <div>
            <div className='info'>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="result">
                    <h3>Результат</h3>
                    <div className="table">

                        <div className="row">
                            <div className="form_radio">
                                <input id="radio-1" type="radio" name="radio" value={true} checked={checked} onChange={e => setChecked(e.target.checked)}></input>
                                    <label htmlFor="radio-1">Одобрено</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form_radio">
                                <input id="radio-2" type="radio" name="radio" value={false} checked={!checked} onChange={e => setChecked(!e.target.checked)}></input>
                                    <label htmlFor="radio-2">Отклонено</label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='comments'>
                    <h3>Комментарий</h3>
                    <textarea
                        {...register('discriptions', {required: true})}
                        cols='40'
                        rows='3'
                        placeholder='Коментарий к заданию...'
                        // id={"commentsform"}
                    ></textarea></div>
                <div className="help">
                    Не забудьте похвалить практиканта! Отметьте то, что у него получилось хорошо.
                </div>

                <div className="buttons">
                    {/*<a href="#openModal">*/}
                    <button type='submit' className="save" onClick={() => {
                        debugger;
                    }}>Отправить
                    </button>
                    {/*</a>*/}
                </div>
            </form>
        </div>
    );
}