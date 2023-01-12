import GoBackButton from '../components/GoBackButton';
import { Navigate, useParams } from 'react-router-dom';
import Table from '../components/Table';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/slices/allUsersSlice';
import { getDirections } from '../store/slices/directionSlice';
import {sendCheckApplication} from "../store/slices/applicationCheckSlice";
import {getApplicationsByUserId} from "../store/slices/applicationSlice";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminSingleApplicationPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getDirections());
  }, []);

  const [selectRow, setSelectRow] = useState(0);
  debugger
  const { userId } = useParams();
  const users = useSelector((state) => state.allUsers.users);

  const directions = useSelector((state) => state.directions.directions);
  const userIndex = users.findIndex((usr) => usr.id === userId);

  const user = users[userIndex];

  const profile = user?.profile || {};

  let applications = null;
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

          <div className='profile_requests'>
            <h3>Заявки</h3>
            <Table type='profile_application' applications={applications} selectRow={selectRow} setSelectRow={setSelectRow} />

            <div className='buttons'>
              <a href='#openModal1'>
                <button className='approve'>Одобрить</button>
              </a>
              <a href='#openModal2'>
                <button className='dismiss'>Отклонить</button>
              </a>

              <div className='modal1'>
                <div id='openModal1' className='modal'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal_close'>
                        <a href='#close1' title='Close' className='close'>
                          ×
                        </a>
                      </div>
                      <div className='modal-body'>
                        <h3>Одобрить заявку?</h3>
                        <div className='buttons'>
                          {/*<a href='#close1' title='Close' className='close'>*/}
                            <button onClick={() => {
                              toast.promise(dispatch(sendCheckApplication({ allow: true, userId: user.id, directionId: selectRow})), {
                                pending: 'Выполняю запрос',
                                success: 'Запрос успешно выполнен 👌',
                                error: 'Запрос отклонён 🤯'
                              }).then(() => navigate("/admin/applications"))
                            }}>Подтвердить</button>
                          {/*</a>*/}
                          <a href='#close1' title='Close' className='close'>
                            <button className='dismiss'>Отменить</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='modal2'>
                <div id='openModal2' className='modal'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal_close'>
                        <a href='#close2' title='Close' className='close2'>
                          ×
                        </a>
                      </div>
                      <div className='modal-body'>
                        <h3>
                          Добавьте комментарий с объяснением <br />
                          причины отклонения заявки
                        </h3>
                        <textarea
                          name='direction_roles'
                          cols='40'
                          rows='3'
                          placeholder='Причина отклонения...'
                        ></textarea>
                        <div className='buttons'>
                          {/*<a href='#close2' title='Close' className='close2'>*/}
                            <button className='dismiss' onClick={() => {
                              toast.promise(dispatch(sendCheckApplication({ allow: false, userId: user.id, directionId: selectRow})), {
                                pending: 'Выполняю запрос',
                                success: 'Запрос успешно выполнен 👌',
                                error: 'Запрос отклонён 🤯'
                              }).then(() => navigate("/admin/applications"))
                            }}>Отклонить</button>
                          {/*</a>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
