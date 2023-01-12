import GoBackButton from '../components/GoBackButton';
import { Navigate, useParams } from 'react-router-dom';
import Table from '../components/Table';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { getAllUsers } from '../store/slices/allUsersSlice';
import { getDirections } from '../store/slices/directionSlice';
import {sendCheckApplication} from "../store/slices/applicationCheckSlice";
import {getApplicationsByUserId} from "../store/slices/applicationSlice";
import {getAllTests} from "../store/slices/allTestsSlice";
import {getAllApplications} from "../store/slices/allApplicationsSlice";
import ASTP from "../components/ASTP";
import {HOST} from "../api/host"

export default function AdminSingleTestPage() {

  const { userId, testId } = useParams();
  // const userIndex = users.findIndex((usr) => usr.id === userId);
  //
  // const user = users[userIndex];
  //
  // const profile = user?.profile || {};
  //
  // const practiceIndex = practices.findIndex((practice) => {
  //   return practice.roles.some((role) => { return testId === role.id});
  // });
  // debugger;
  // const roleIndex = practices[practiceIndex].roles.findIndex((role) => {
  //   return testId===role.id;
  // });
  //
  // if (userIndex === -1) return;
  // if (practiceIndex === -1 || userIndex === -1) return;
  // let applications = null;

  return (
    <div className='content_wrapper'>
      <div className='test'>
        <GoBackButton />

        <div className='test_wrapper'>
          <div className='test_info'>
            <div className='header'>Тестовое задание</div>
            <a href={`${HOST}/testcase/getUserSolution?userId=`+userId+"&directionId="+testId}><div className="download">Скачать файл</div></a>
            <ASTP user={userId} test={testId}/>
          {/*  <div className='profile_person'>*/}
          {/*    <div className='profile_photo'>*/}
          {/*      <p>*/}
          {/*        {profile.firstName && profile.secondName*/}
          {/*          ? profile.firstName[0].toUpperCase() +*/}
          {/*            profile.secondName[0].toUpperCase()*/}
          {/*          : 'A'}*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*    <div className='profile_name_wrapper'>*/}
          {/*      <p className='profile_name'>*/}
          {/*        {`${profile.firstName ? profile.firstName : 'Аноним'} ${*/}
          {/*          profile.secondName ? profile.secondName : ''*/}
          {/*        } ${profile.patronymic ? profile.patronymic : ''}`}*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  <div className='info'>*/}
          {/*    <Table type='contacts' user={user} practice={1} direction={1} />*/}
          {/*  </div>*/}

          {/*  <div className='education'>*/}
          {/*    <h3>Образование</h3>*/}
          {/*    <Table type='education' user={user} />*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className='profile_requests'>*/}
          {/*  <h3>Заявки</h3>*/}
          {/*  <Table type='profile_application' applications={applications} />*/}

          {/*  <div className='buttons'>*/}
          {/*    <a href='#openModal1'>*/}
          {/*      <button className='approve'>Одобрить</button>*/}
          {/*    </a>*/}
          {/*    <a href='#openModal2'>*/}
          {/*      <button className='dismiss'>Отклонить</button>*/}
          {/*    </a>*/}

          {/*    <div className='modal1'>*/}
          {/*      <div id='openModal1' className='modal'>*/}
          {/*        <div className='modal-dialog'>*/}
          {/*          <div className='modal-content'>*/}
          {/*            <div className='modal_close'>*/}
          {/*              <a href='#close1' title='Close' className='close'>*/}
          {/*                ×*/}
          {/*              </a>*/}
          {/*            </div>*/}
          {/*            <div className='modal-body'>*/}
          {/*              <h3>Одобрить заявку?</h3>*/}
          {/*              <div className='buttons'>*/}
          {/*                /!*<a href='#close1' title='Close' className='close'>*!/*/}
          {/*                  <button onClick={() => {debugger; dispatch(sendCheckApplication({ allow: true, userId: user.id }))}}>Подтвердить</button>*/}
          {/*                /!*</a>*!/*/}
          {/*                <a href='#close1' title='Close' className='close'>*/}
          {/*                  <button className='dismiss'>Отменить</button>*/}
          {/*                </a>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div className='modal2'>*/}
          {/*      <div id='openModal2' className='modal'>*/}
          {/*        <div className='modal-dialog'>*/}
          {/*          <div className='modal-content'>*/}
          {/*            <div className='modal_close'>*/}
          {/*              <a href='#close2' title='Close' className='close2'>*/}
          {/*                ×*/}
          {/*              </a>*/}
          {/*            </div>*/}
          {/*            <div className='modal-body'>*/}
          {/*              <h3>*/}
          {/*                Добавьте комментарий с объяснением <br />*/}
          {/*                причины отклонения заявки*/}
          {/*              </h3>*/}
          {/*              <textarea*/}
          {/*                name='direction_roles'*/}
          {/*                cols='40'*/}
          {/*                rows='3'*/}
          {/*                placeholder='Причина отклонения...'*/}
          {/*              ></textarea>*/}
          {/*              <div className='buttons'>*/}
          {/*                /!*<a href='#close2' title='Close' className='close2'>*!/*/}
          {/*                  <button className='dismiss' onClick={() => {debugger; dispatch(sendCheckApplication({ allow: false, userId: user.id }))}}>Отклонить</button>*/}
          {/*                /!*</a>*!/*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
