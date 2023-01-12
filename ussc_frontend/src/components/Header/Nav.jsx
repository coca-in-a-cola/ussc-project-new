import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth'

const Nav = () => {
    const isAuth = useAuth().isAuth;
    const isAdmin = useAuth().isAdmin;

    if (isAuth) {
        if (!isAdmin)
            return (
                <div className={s.nav}>
                    <Link to='/applications' className={s.nav_item}>
                        Мои заявки
                    </Link>
                    <Link to='/directions' className={s.nav_item}>
                        Направления подготовки
                    </Link>
                </div>
            );
        else
            return (
                <div className={s.nav}>
                    <Link to='/admin/directions' className={s.nav_item}>
                        Направления практик
                    </Link>
                    <Link to='/admin/applications' className={s.nav_item}>
                        Заявки
                    </Link>
                    <Link to='/admin/testcases' className={s.nav_item}>
                        Тестовое
                    </Link>
                    <Link to='/admin/practicants' className={s.nav_item}>
                        Практиканты
                    </Link>
                </div>
            );
    }

    return (
        <div className={s.nav}>
            <a href='#about' className={s.nav_item}>
                О нас
            </a>
            <a href='#directions' className={s.nav_item}>
                Направления подготовки
            </a>
            <a href='#footer' className={s.nav_item}>
                Контакты
            </a>
        </div>
    );
};

export default Nav;
