import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import FormFrame from '../components/FormFrame';
import { togglePopup } from '../store/slices/popupSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import md5 from 'md5';
import { signInUser } from '../store/slices/userSlice';

const LoginPage = () => {
    const dispatch = useDispatch();

    const toggleSignUpPopup = () => dispatch(togglePopup('signUp'));
    const toggleSignInPopup = () => dispatch(togglePopup('signIn'));
    const togglePassRecoveryPopup = () => dispatch(togglePopup('passRecovery'));
    const notify = () => toast("Wow so easy!");
    const { register, handleSubmit } = useForm();
    const onSubmit = (user) => {
        user.password = md5(user.password);
        dispatch(signInUser(user));
        notify();

    };

    return (
        <div className='form_frame' onClick={(e) => e.stopPropagation()}>
            <form className='formframe_body' onSubmit={handleSubmit(onSubmit)}>
                <div className='form_heading'>
                    <p className='form_title'>Вход</p>
                    <a
                        className='link'
                        onClick={() => {
                            toggleSignInPopup();
                            toggleSignUpPopup();
                        }}
                    >
                        Регистрация
                    </a>
                </div>

                <label className='form_input_wrapper'>
                    <p className='form_input_label'>E-mail*</p>
                    <input
                        type='text'
                        className='form_input'
                        {...register('email')}
                        required
                    />
                </label>

                <label className='form_input_wrapper'>
                    <p className='form_input_label'>Пароль*</p>
                    <input
                        type='password'
                        className='form_input'
                        {...register('password')}
                        required
                    />
                </label>

                <a
                    onClick={() => {
                        toggleSignInPopup();
                        togglePassRecoveryPopup();
                    }}
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        marginTop: '17px',
                        cursor: 'pointer',
                    }}
                >
                    Забыли пароль?
                </a>
                <Button type='submit' style={{ marginTop: '42px' }}>
                    Войти
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
