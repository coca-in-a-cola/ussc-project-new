import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default HomeLayout;
