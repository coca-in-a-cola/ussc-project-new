import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import HomeLayout from './components/HomeLayout';
import ProfileLayout from './components/ProfileLayout';
import TaskPage from './pages/TaskPage';
import RequireAuth from './hoc/RequireAuth';
import DirectionsPage from './pages/DirectionsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import {TestCaseSentOK} from './components/TestCaseSentOK';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminSingleApplicationPage from './pages/AdminSingleApplicationPage';
import AdminAddingDirectionPage from './pages/AdminAddingDirectionPage';
import AdminAddingTestCasePage from "./pages/AdminAddingTestCasePage";
import RequireAdmin from "./hoc/RequireAdmin";
import AdminDirectionsPage from "./pages/AdminDirectionsPage";
import AdminTestCasesPage from "./pages/AdminTestCasesPage";
import AdminSingleTestPage from "./pages/AdminSingleTestPage";
import AdminPracticantsPage from "./pages/AdminPracticantsPage";
import AdminSinglePracticantPage from "./pages/AdminSinglePracticantPage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='cardpop' element={<TestCaseSentOK/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>


                <Route
                    path='/home'
                    element={
                        <ProfileLayout/>
                    }
                >
                    <Route index element={<HomePage/>}/>
                </Route>

                <Route
                    path='/profile'
                    element={
                        <ProfileLayout/>
                    }
                >
                    <Route index element={<ProfilePage/>}/>
                </Route>

                <Route
                    path='/task/:userId/:taskId'
                    element={
                        <RequireAuth>
                            <ProfileLayout/>
                        </RequireAuth>
                    }
                >
                    <Route index element={<TaskPage/>}/>
                </Route>


                <Route
                    path='/directions'
                    element={
                        <RequireAuth>
                            <ProfileLayout/>
                        </RequireAuth>
                    }
                >
                    <Route index element={<DirectionsPage/>}/>
                </Route>


                <Route
                    path='/applications'
                    element={
                        <RequireAuth>
                            <ProfileLayout/>
                        </RequireAuth>
                    }
                >
                    <Route index element={<ApplicationsPage/>}/>
                </Route>

                {/*<Route index element={<ApplicationsPage />} />*/}
                <Route path='/admin/' element={<ProfileLayout/>}>
                    <Route
                        path='directions/'
                        element={<RequireAdmin><AdminDirectionsPage/></RequireAdmin>}
                    />

                    <Route
                        path='applications/'
                        element={<RequireAdmin><AdminApplicationsPage/></RequireAdmin>}
                    />

                    <Route
                        path='practicants/'
                        element={<RequireAdmin><AdminPracticantsPage/></RequireAdmin>}
                    />

                    <Route
                        path='practicant/:userId'
                        element={<RequireAdmin><AdminSinglePracticantPage/></RequireAdmin>}
                    />


                    <Route
                        path='application/:userId'
                        element={<RequireAdmin><AdminSingleApplicationPage/></RequireAdmin>}
                    />

                    <Route
                        path='testcases/'
                        element={<RequireAdmin><AdminTestCasesPage/></RequireAdmin>}
                    />

                    <Route
                        path='test/:userId/:testId'
                        element={<RequireAdmin><AdminSingleTestPage/></RequireAdmin>}
                    />

                    <Route path='create/'>
                        <Route path='direction/' element={<RequireAdmin><AdminAddingDirectionPage/></RequireAdmin>}/>
                        <Route path='testcase/:testId' element={<RequireAdmin><AdminAddingTestCasePage/></RequireAdmin>}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
