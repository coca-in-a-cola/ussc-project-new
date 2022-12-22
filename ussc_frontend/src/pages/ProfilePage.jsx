import React, { useEffect } from 'react';
import Button from '../components/Button';
import GoBackButton from '../components/GoBackButton';
import { useForm } from 'react-hook-form';
import { getProfile, updateProfileInfo } from '../store/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fillProfileInfo } from '../store/slices/profileSlice';
import { useProfile } from '../hooks/use-profile';

const ProfilePage = () => {
  useEffect(() => {
    dispatch(getProfile());
  });

  const profileForm = useForm();
  // const passwordForm = useForm();
  const dispatch = useDispatch();
  const [profile, isFilledProfile] = useProfile();
  const email = useSelector((state) => state.user.email);

  const onProfileFormSubmit = (data) => {
    if (!isFilledProfile()) {
      dispatch(fillProfileInfo(data));
      return;
    }
    dispatch(updateProfileInfo(data));
  };

  return (
    <>
      <div className='profile_wrapper'>
        <div className='profile'>
          <GoBackButton />
          <h1 className='profile_heading'>Редактирование профиля</h1>

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
                {`${profile.firstName ? profile.firstName : ''} ${
                  profile.secondName ? profile.secondName : ''
                } ${profile.patronymic ? profile.patronymic : ''}`}
              </p>
            </div>
          </div>

          <div className='profile_data'>
            <form
              className='profile_form'
              onSubmit={profileForm.handleSubmit(onProfileFormSubmit)}
            >
              <div className='profile_datasection'>
                <h2 className='datasection_heading'>Основная информация</h2>

                <div className='datasection_field'>
                  <p className='field_title'>Фамилия</p>
                  <input
                    className='field_input'
                    type='text'
                    defaultValue={profile.secondName}
                    {...profileForm.register('secondName', { required: true })}
                  />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Имя</p>
                  <input
                    className='field_input'
                    type='text'
                    defaultValue={profile.firstName}
                    {...profileForm.register('firstName', { required: true })}
                  />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Отчество</p>
                  <input
                    className='field_input'
                    type='text'
                    defaultValue={profile.patronymic}
                    {...profileForm.register('patronymic', { required: true })}
                  />
                </div>
              </div>

              <div className='profile_datasection'>
                <h2 className='datasection_heading'>Контактная информация</h2>

                <div className='datasection_field'>
                  <p className='field_title'>Телефон</p>
                  <input
                    className='field_input'
                    type='tel'
                    defaultValue={profile.phone}
                    {...profileForm.register('phone', { required: true })}
                  />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>E-mail</p>
                  <input
                    className='field_input'
                    type='email'
                    value={email}
                    disabled
                  />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Ник в Telegram</p>
                  <input
                    className='field_input'
                    type='text'
                    defaultValue={profile.telegram}
                    {...profileForm.register('telegram', { required: true })}
                  />
                </div>
              </div>

              <div className='profile_datasection'>
                <h2 className='datasection_heading'>Образование</h2>

                <div className='datasection_field'>
                  <p className='field_title'>Учебное заведение</p>
                  <textarea
                    className='field_textarea'
                    defaultValue={profile.university}
                    {...profileForm.register('university', { required: true })}
                  ></textarea>
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Факультет</p>
                  <textarea
                    className='field_textarea'
                    defaultValue={profile.faculty}
                    {...profileForm.register('faculty', { required: true })}
                  ></textarea>
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Специальность</p>
                  <textarea
                    className='field_textarea'
                    defaultValue={profile.speciality}
                    {...profileForm.register('speciality', { required: true })}
                  ></textarea>
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Курс</p>
                  <input
                    type='text'
                    className='field_input'
                    defaultValue={profile.course}
                    {...profileForm.register('course', { required: true })}
                  />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Опыт работы</p>
                  <textarea
                    className='field_textarea'
                    defaultValue={profile.workExperience}
                    {...profileForm.register('workExperience', {
                      required: true,
                    })}
                  ></textarea>
                </div>
              </div>

              <Button style={{ alignSelf: 'flex-start' }} type='submit'>
                Сохранить изменения
              </Button>
            </form>

            <form className='profile_form'>
              <div className='profile_datasection'>
                <h2 className='datasection_heading'>Изменить пароль</h2>
                <div className='datasection_field'>
                  <p className='field_title'>Старый пароль</p>
                  <input type='password' className='field_input' />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Новый пароль</p>
                  <input type='password' className='field_input' />
                </div>

                <div className='datasection_field'>
                  <p className='field_title'>Повторите пароль</p>
                  <input type='password' className='field_input' />
                </div>
              </div>
              <Button style={{ alignSelf: 'flex-start' }} type='submit'>
                Изменить пароль
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
