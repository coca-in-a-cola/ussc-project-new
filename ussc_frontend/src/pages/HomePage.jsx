import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Popup from '../components/Popup';
import PassRecoveryForm from '../forms/PassRecoveryForm';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import {togglePopup} from '../store/slices/popupSlice';
import school_logo from '../img/u_summer_school_logo.png';
import circle from '../img/circle.svg';
import circleBig from '../img/circle_big.svg';
import clockIcon from '../img/clock_icon.svg';
import bagIcon from '../img/bag_icon.svg';
import checkmarkIcon from '../img/checkmark_icon.svg';
import samplePhoto1 from '../img/sample_photo1.jpg';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/use-auth';
import DirectionsGrid from '../components/DirectionsGrid';

const HomePage = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth().isAuth;

    const signInPopupActive = useSelector((state) => state.popups.signIn);
    const signUpPopupActive = useSelector((state) => state.popups.signUp);
    const passRecoveryPopupActive = useSelector(
        (state) => state.popups.passRecovery
    );

    // if (isAuth) return <Navigate to='/directions' />;

    const toggleSignInActive = () => dispatch(togglePopup('signIn'));
    const toggleSignUpActive = () => dispatch(togglePopup('signUp'));
    const togglePassRecoveryActive = () => dispatch(togglePopup('passRecovery'));


    debugger;
    return (
        <>
            <div className='main'>
                <div className='homepage_content'>
                    <div className='content_section'>
                        <div className='offer'>
                            <div className='offer_text'>
                                <h1 className='offer_heading'>
                                    Пройди практику в<br/> U summer school - и получи шанс стать
                                    частью команды профессионалов
                                </h1>
                                <p className='offer_description'>
                                    Участие в <strong>U Summer School</strong> - это возможность
                                    погрузиться в одно из направлений сферы информационной
                                    безопасности. В течение месяца студенты решают рабочие задачи,
                                    учатся у экспертов компании, делают вклад в свое развитие.
                                </p>
                                <Button onClick={toggleSignUpActive}>Начать</Button>
                            </div>
                            <div className='offer_images'>
                                <img src={school_logo} alt='' className='school_logo'/>
                                <img
                                    src={circle}
                                    alt=''
                                    className='circle'
                                    style={{left: '285px', bottom: '320px'}}
                                />
                                <img
                                    src={circleBig}
                                    alt=''
                                    className='circle'
                                    style={{left: '360px', bottom: '1125px'}}
                                />
                            </div>
                        </div>
                        <div className='advantages'>
                            <div className='advantage'>
                                <img src={clockIcon} alt=''/>
                                <p className='advantage_title'>
                                    Более 15 успешных лет на рынке
                                </p>
                            </div>
                            <div className='advantage'>
                                <img src={bagIcon} alt=''/>
                                <p className='advantage_title'>
                                    Более 800 профессионалов в штате
                                </p>
                            </div>
                            <div className='advantage'>
                                <img src={checkmarkIcon} alt=''/>
                                <p className='advantage_title'>
                                    Более 1000 завершенных проектов
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='content_section' id='about'>
                        <h2 className='section_heading'>О практике</h2>
                        <div className='about'>
                            <ul className='about_list'>
                                <li className='list_item'>
                                    В июле мы приглашаем студентов 2 и 3 курсов на практику
                                </li>
                                <li className='list_item'>
                                    У каждого студента есть куратор, готовый научить, помочь,
                                    поддержать
                                </li>
                                <li className='list_item'>
                                    Летняя практика не оплачивается. Лучших студентов приглашаем
                                    после прохождения практики на стажировку
                                </li>
                                <li className='list_item'>
                                    В 2022 году в нашей летней школе учились 50 студентов из УрФУ,
                                    УрГУПС, УрГЭУ, ОГУ, ОГАУ.
                                </li>
                                <li className='list_item'>
                                    Летняя практика может стать базой для преддипломной практики.
                                    А Дипломом может стать рабочая задача.
                                </li>
                            </ul>
                            <img
                                src={samplePhoto1}
                                alt=''
                                style={{width: '728px', borderRadius: '20px'}}
                            />
                        </div>
                    </div>
                    <div className='content_section' id='directions'>
                        <h2 className='section_heading'>Направления подготовки</h2>
                        <DirectionsGrid/>
                    </div>
                </div>
            </div>

            <Popup
                active={signInPopupActive}
                toggleActive={toggleSignInActive}
                content={<SignInForm/>}
            />
            <Popup
                active={signUpPopupActive}
                toggleActive={toggleSignUpActive}
                content={<SignUpForm/>}
            />
            <Popup
                active={passRecoveryPopupActive}
                toggleActive={togglePassRecoveryActive}
                content={<PassRecoveryForm/>}
            />
        </>
    );
};

export default HomePage;
