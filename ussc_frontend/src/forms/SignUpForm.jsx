import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../store/slices/popupSlice';
import FormFrame from '../components/FormFrame';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import md5 from 'md5';
import { signUpUser } from '../store/slices/userSlice';

// {

//   "surname": "string",
//   "name": "string",
//   "patronymic": "string",
//   "email": "string",
//   "hashedPassword": "string",
//   "application": {

//   },
//   "testCase": {
//   },
//   "applicationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "testCaseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// }

const SignUpForm = () => {
  const dispatch = useDispatch();

  const toggleSignUpPopup = () => dispatch(togglePopup('signUp'));
  const toggleSignInPopup = () => dispatch(togglePopup('signIn'));

  const methods = useForm();
  const { register, handleSubmit } = methods;
  const onSubmit = (user) => {
    if (user.password !== user.password_again) {
      alert('Вы указали разные пароли!');
      return;
    }
    delete user.password_again;
    user.password = md5(user.password);

    dispatch(signUpUser(user));
  };

  return (
    <FormFrame onSubmit={handleSubmit(onSubmit)}>
      <div className='form_heading'>
        <p className='form_title'>Регистрация</p>
        <a
          className='link'
          onClick={() => {
            toggleSignUpPopup();
            toggleSignInPopup();
          }}
        >
          У вас уже есть аккаунт?
        </a>
      </div>

      <label className='form_input_wrapper'>
        <p className='form_input_label'>E-mail*</p>
        <input
          type='email'
          className='form_input'
          {...register('email', { required: true })}
        />
      </label>

      <label className='form_input_wrapper'>
        <p className='form_input_label'>Пароль*</p>
        <input
          type='password'
          className='form_input'
          {...register('password', { required: true })}
        />
      </label>

      <label className='form_input_wrapper'>
        <p className='form_input_label'>Повторите пароль*</p>
        <input
          type='password'
          className='form_input'
          {...register('password_again', { required: true })}
        />
      </label>

      <Button type='submit' style={{ marginTop: '66px' }}>
        Зарегистрироваться
      </Button>
    </FormFrame>
  );
};

export default SignUpForm;
