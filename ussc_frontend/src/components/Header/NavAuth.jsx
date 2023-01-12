import React from 'react';
import s from './Header.module.css';
import {useDispatch} from 'react-redux';
import {togglePopup} from '../../store/slices/popupSlice';
import {Link} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth';
import {removeUser} from '../../store/slices/userSlice';
import {useProfile} from '../../hooks/use-profile';
import {removeProfile} from '../../store/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const NavAuth = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const toggleSignInPopup = () => dispatch(togglePopup('signIn'));
    const toggleSignUpPopup = () => dispatch(togglePopup('signUp'));

    const user = useAuth();
    const [profile] = useProfile();

    const logout = () => {
        debugger
        dispatch(removeProfile());
        dispatch(removeUser());
        navigate("/");
    };

    if (user.isAuth) {
        return (
            <div className={s.nav_auth}>
                <Link to='/profile' className={s.nav_item}>
                    {profile.firstName && profile.secondName
                        ? `${profile.firstName} ${profile.secondName}`
                        : 'Аноним'}
                </Link>
                <span className={s.sep}></span>
                <div className={s.nav_item} onClick={logout}>Выйти</div>
            </div>
        );
    }

    return (
        <div className={s.nav_auth}>
            <a className={s.nav_item} onClick={toggleSignInPopup}>Войти</a>
            <span className={s.sep}></span>
            <a className={s.nav_item} onClick={toggleSignUpPopup}>Зарегистрироваться</a>
        </div>
    );
};

export default NavAuth;
