import GoBackButton from '../components/GoBackButton';
import { Navigate, useParams } from 'react-router-dom';
import Table from '../components/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/slices/allUsersSlice';
import { getDirections } from '../store/slices/directionSlice';
import {sendCheckApplication} from "../store/slices/applicationCheckSlice";
import {getApplicationsByUserId} from "../store/slices/applicationSlice";
import {getAllTests} from "../store/slices/allTestsSlice";

export default function AdminSinglePracticantPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getDirections());
    dispatch(getAllTests());
  }, []);

  const { userId } = useParams();
  const users = useSelector((state) => state.allUsers.users);
  const directions = useSelector((state) => state.directions.directions);
  const userIndex = users.findIndex((usr) => usr.id === userId);
  const tests = useSelector((state) => state.allTests.allTests);

  const user = users[userIndex];

  const profile = user?.profile || {};

  let applications = null;
  let testik = null;
  if (userIndex !== -1) {
    applications = user?.applications?.map((app) => {
      let role = null;
      let direction = null;
      const dirIndex = directions.findIndex((value) => {
        const roleIndex = value.roles?.findIndex((r) => {
          return r.id === app.directionId;
        });

        if (roleIndex === -1) return false;

        role = value.roles[roleIndex]?.directions;
        direction = value.title;

        return true;
      });

      if (dirIndex === -1) return;
      debugger;
      return { id: app.id, title: direction, role: role, isAllowed: app.allow, directionId: app.directionId };
    });

    testik = tests?.map((test) => {
      let role = null;
      let direction = null;
      const dirIndex = directions.findIndex((value) => {
        const roleIndex = value.roles?.findIndex((r) => {
          return r.id === test.directionId;
        });

        if (roleIndex === -1) return false;

        role = value.roles[roleIndex]?.directions;
        direction = value.title;

        return true;
      });

      if (dirIndex === -1) return;
      debugger;
      return { id: test.id, title: direction, role: role, isAllowed: test.allow, directionId: test.directionId };
    });
  }

  return (
    <div className='content_wrapper'>
      <div className='request_profile'>
        <GoBackButton />

        <div className='profile_wrapper'>
          <div className='profile_info'>
            <div className='profile_person'>
              <div className='profile_photo'>
                <p>
                  {profile.firstName && profile.secondName
                    ? profile.firstName[0].toUpperCase() +
                      profile.secondName[0].toUpperCase()
                    : 'A'}
                </p>
              </div>
              <div className='profile_name_wrapper'>
                <p className='profile_name'>
                  {`${profile.firstName ? profile.firstName : 'Аноним'} ${
                    profile.secondName ? profile.secondName : ''
                  } ${profile.patronymic ? profile.patronymic : ''}`}
                </p>
              </div>
            </div>

            <div className='contacts'>
              <h3>Контактная информация</h3>
              <Table type='contacts' user={user} />
            </div>

            <div className='education'>
              <h3>Образование</h3>
              <Table type='education' user={user} />
            </div>
          </div>
          <div>
          <div className='profile_requests'>
            <h3>Заявки</h3>
            <Table type='profile_application2' applications={applications} />

          </div>

          {/*<div className='profile_tests'>*/}
          {/*  <h3>Тестовые задания</h3>*/}
          {/*  <Table type='profile_test' tests={tests} user={user} />*/}

          {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
