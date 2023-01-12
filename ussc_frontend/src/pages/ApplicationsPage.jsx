import React, {useEffect} from 'react';
import Application from '../components/Application';
import {useDispatch, useSelector} from 'react-redux';
import {getApplicationsByUserId} from '../store/slices/applicationSlice';
import {useAuth} from '../hooks/use-auth';
import {getAllUsers} from "../store/slices/allUsersSlice";
import {getAllTests} from "../store/slices/allTestsSlice";
import {getDirections} from "../store/slices/directionSlice";

const ApplicationsPage = () => {
    const user = useAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApplicationsByUserId({userId: user.id}));
        dispatch(getAllUsers());
        dispatch(getAllTests());
        dispatch(getDirections());
    }, []);

    const tests = useSelector(
        (state) => state.allTests.allTests
    );
    const users = useSelector((state) => state.allUsers.users);
    const practices = useSelector((state) => state.directions.directions);

    const applications = useSelector((state) => state.applications.applications);
    debugger;
    if (!user.id) return;

    return (
        <div className='main'>
            <div className='page_content'>
                {applications.length ? (
                    applications.map((app, index) => {
                        const userIndex = users.findIndex((user) => {
                            return app.userId === user.id;
                        });

                        const practiceIndex = practices.findIndex((practice) => {
                            return practice.roles.some((role) => {
                                return app.directionId === role.id
                            });
                        });
                        const roleIndex = practices[practiceIndex].roles.findIndex((role) => {
                            return app.directionId === role.id;
                        });
                        const testIndex = tests.findIndex((test) => {
                            return (app.directionId === test.directionId && app.userId === test.userId);
                        });
                        debugger;
                        return (
                            <Application
                                directionName={practices[practiceIndex].title}
                                applicationId={app}
                                role={practices[practiceIndex].roles[roleIndex].directions}
                                requestAllow={app.isAllowed}
                                testIndex={testIndex}
                                tests={tests}/>
                        );
                    })
                ) : (
                    <>Нет заявок!</>)}
            </div>
        </div>
    );
};

export default ApplicationsPage;
