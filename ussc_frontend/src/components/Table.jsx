import TableRow from './TableRow';
import TableHeader from './TableHeader';
import {getAllApplications} from '../store/slices/allApplicationsSlice';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../store/slices/allUsersSlice';
import {getAllTests} from "../store/slices/allTestsSlice";
import {getDirections} from "../store/slices/directionSlice";

export default function Table({type, user, applications, practice, direction, tests, selectRow, setSelectRow}) {
    switch (type) {
        case 'applications':
            return <ApplicationsTable/>;
        case 'tests':
            return <TestsTable/>;
        case 'practicants':
            return <PracticantsTable/>;
        case 'interns_test_cases':
            return <InternsTestCases/>;
        case 'contacts':
            return <ContactsTable user={user}/>;
        case 'test_info':
            return <TestInfo user={user} practice={practice} direction={direction}/>;
        case 'education':
            return <EducationTable user={user}/>;
        case 'profile_application':
            return <ProfileApplicationTable applications={applications} selectRow={selectRow} setSelectRow={setSelectRow}/>;
        case 'profile_application2':
            return <ProfileApplication2Table applications={applications}/>;
        case 'profile_test':
            return <ProfileTestTable test={tests} user={user}/>;
        default:
            throw new Error('Incorrect Table type');
    }
}

function ApplicationsTable() {
    const dispatch = useDispatch();

    const applications = useSelector(
        (state) => state.allApplications.allApplications
    );
    const users = useSelector((state) => state.allUsers.users);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllApplications());
        dispatch(getAllTests());
    }, []);
    let appli = [];

    return (
        <div className='table'>
            <TableHeader type='applications'/>
            {applications.length && users.length ? (
                applications.map((app, index) => {
                    if(appli.findIndex((api) => {return app.userId === api}) != -1) return;
                    if(!users) return;
                    const userIndex = users.findIndex((user) => {
                        return app.userId === user.id;
                    });

                    if (userIndex === -1) return;

                    const fullName = `${users[userIndex].profile.secondName} ${users[userIndex].profile.firstName} ${users[userIndex].profile.patronymic}`;

                    const unverifiedAppsCount = users[userIndex].applications.filter(
                        (application) => application.allow === null
                    ).length;
                    appli.push(app.userId)
                    debugger;
                    return (
                        <TableRow
                            key={index}
                            type='applications'
                            fullName={fullName}
                            unverifiedAppsCount={unverifiedAppsCount}
                            href={`/admin/application/${users[userIndex].id}`}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}

function TestsTable() {
    const dispatch = useDispatch();

    // const getVerboseStatus = (status) => {
    //     switch (status) {
    //         case null:
    //             return 'Не выполнено';
    //         case true:
    //             return 'Одобрено';
    //         case false:
    //             return 'Не проверено';
    //         default:
    //             return 'В рассмотрении';
    //     }
    // };

    const tests = useSelector(
        (state) => state.allTests.allTests
    );
    const users = useSelector((state) => state.allUsers.users);
    const practices = useSelector((state) => state.directions.directions);
    debugger;
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllTests());
        dispatch(getDirections());
    }, []);
    return (
        <div className='table'>
            <TableHeader type='tests'/>
            {tests.length && users.length && practices.length ? (
                tests.map((app, index) => {
                    const userIndex = users.findIndex((user) => {
                        return app.userId === user.id;
                    });

                    const practiceIndex = practices.findIndex((practice) => {
                        return practice.roles.some((role) => { return app.directionId === role.id});
                    });
                    debugger;
                    if (practiceIndex === -1) return;
                    const roleIndex = practices[practiceIndex].roles.findIndex((role) => {
                        return app.directionId===role.id;
                    });
                    debugger;

                    if (userIndex === -1) return;
                    if (practiceIndex === -1 || userIndex === -1) return;

                    const pract = practices[practiceIndex];
                    if (app.isAllowed !== null) return;
                    if (!pract) return;
                    debugger;
                    const fullName = `${users[userIndex].profile.secondName} ${users[userIndex].profile.firstName} ${users[userIndex].profile.patronymic}`;

                    const unverifiedAppsCount = users[userIndex].applications.filter(
                        (application) => application.allow === null
                    ).length;
                    debugger;
                    return (
                        <TableRow
                            key={index}
                            type='tests'
                            fullName={fullName}
                            direction={pract.title}
                            role={pract.roles[roleIndex].directions}
                            status={app?.path ? "Не проверено" : "Не выполнено"}
                            href={`/admin/test/${users[userIndex].id}/${pract.roles[roleIndex].id}`}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}


function PracticantsTable() {
    const getVerboseStatus = (status) => {
        switch (status) {
            case null:
                return 'В процессе выполнения тестового';
            case true:
                return 'Прошёл на практику';
            case false:
                return 'Не прошёл на практику';
            default:
                return 'В процессе выполнения тестового';
        }
    };

    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers.users);
    const tests = useSelector(
        (state) => state.allTests.allTests
    );
    debugger;
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllTests());
    }, []);
    return (
        <div className='table'>
            <TableHeader type='practicants'/>
            { users.length ? (
                users.map((user, index) => {
                    if(!user || user.role==="Admin" || !user.profile) return;
                    const fullName = `${user.profile.secondName} ${user.profile.firstName} ${user.profile.patronymic}`;
                    const userTests = tests.filter((test) => test.userId === user.id);
                    let status = null;
                    const unverifiedTestsCount = userTests.filter(
                        (test) => test.isAllowed === null
                    ).length;
                    const acceptTestsCount = userTests.filter(
                        (test) => test.isAllowed === true
                    ).length;
                    const dismissTestsCount = userTests.filter(
                        (test) => test.isAllowed === false
                    ).length;

                    if (acceptTestsCount != 0) status = true;
                    else if (unverifiedTestsCount === 0 && dismissTestsCount != 0) status = false;
                    else status = null;
                    debugger;
                    return (
                        <TableRow
                            key={index}
                            type='practicants'
                            fullName={fullName}
                            status={getVerboseStatus(status)}
                            href={`/admin/practicant/${user.id}`}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}

function ContactsTable({user}) {
    return (
        <div className='table'>
            <TableRow
                type='contacts'
                contactType='phone'
                value={user?.profile?.phone}
            />
            <TableRow type='contacts' contactType='email' value={user?.email}/>
            <TableRow
                type='contacts'
                contactType='telegram'
                value={user?.profile?.telegram}
            />
        </div>
    );
}

function TestInfo({user, practice, direction}) {
    debugger
    return (
        <div className='table'>
            <TableRow
                type='test_info'
                contactType='name'
                value={123123}
            />
            <TableRow type='test_info' contactType='practice' value={user?.email}/>
            <TableRow
                type='test_info'
                contactType='role'
                value={user?.profile?.telegram}
            />
        </div>
    );
}


function EducationTable({user}) {
    return (
        <div className='table'>
            <TableRow
                type='education'
                contentType='university'
                value={user?.profile?.university}
            />
            <TableRow type='education' contentType='faculty' value={user?.profile?.faculty}/>
            <TableRow
                type='education'
                contentType='speciality'
                value={user?.profile?.speciality}
            />
            <TableRow
                type='education'
                contentType='course'
                value={user?.profile?.course}
            />
            <TableRow
                type='education'
                contentType='workExperience'
                value={user?.profile?.workExperience}
            />
        </div>
    );
}

function ProfileApplicationTable({applications, selectRow, setSelectRow }) {
    useEffect(() => {
        getAllUsers()
    }, applications)
    const getVerboseStatus = (status) => {
        switch (status) {
            case null:
                return 'В рассмотрении';
            case true:
                return 'Одобрено';
            case false:
                return 'Отклонено';
            default:
                return 'В рассмотрении';
        }
    };
    debugger;
    return (
        <div className='table'>
            <TableHeader type='profile_application'/>

            {applications?.map((app, index) => {
                debugger;
                if (app?.title != null && app?.id != null)
                    return (
                        <TableRow
                            key={app?.id || 'null'}
                            type='profile_application'
                            directionName={app?.title}
                            role={app?.role}
                            date=''
                            status={getVerboseStatus(app?.isAllowed)}
                            directionId={app?.directionId || 'null'}
                            isSelect={app?.directionId===selectRow}
                            setSelect={setSelectRow}
                        />
                    );
            })}
        </div>
    );
}

function ProfileApplication2Table({applications}) {
    const getVerboseStatus = (status) => {
        switch (status) {
            case null:
                return 'В рассмотрении';
            case true:
                return 'Одобрено';
            case false:
                return 'Отклонено';
            default:
                return 'В рассмотрении';
        }
    };
    debugger;
    return (
        <div className='table'>
            <TableHeader type='profile_application'/>

            {applications?.map((app) => {
                debugger;
                if (app?.title != null && app?.id != null)
                    return (
                        <TableRow
                            key={app?.id || 'null'}
                            type='profile_application2'
                            directionName={app?.title}
                            role={app?.role}
                            date=''
                            status={getVerboseStatus(app?.isAllowed)}
                            directionId={app?.directionId || 'null'}
                        />
                    );
            })}
        </div>
    );
}

function ProfileTestTable({tests, user}) {
    const getVerboseStatus = (status) => {
        switch (status) {
            case null:
                return 'В рассмотрении';
            case true:
                return 'Одобрено';
            case false:
                return 'Отклонено';
            default:
                return 'В рассмотрении';
        }
    };
    debugger;
    return (
        <div className='table'>
            <TableHeader type='profile_application'/>

            {tests?.map((test) => {
                debugger;
                if (test?.title != null && test?.id != null && test.userId === user.id)
                    return (
                        <TableRow
                            key={test?.id || 'null'}
                            type='profile_test'
                            directionName={test?.directionId}
                            role={test?.path}
                            date=''
                            status={getVerboseStatus(test?.isAllowed)}
                            directionId={test?.directionId || 'null'}
                        />
                    );
            })}
        </div>
    );
}

function InternsTestCases() {
}
