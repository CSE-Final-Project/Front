import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { loginCheck } from '../store/Store';

import CreateRoom from "../components/CreateRoom";
import Room from "../components/Room";
import StopWatch from '../components/StopWatch';


import StudyCreate from '../pages/StudyCreatePage/StudyCreate';

import PostListPage from '../pages/PostListPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/common/Footer';

const Wrapper = styled.div`
  display: flex; 
  min-height: 100vh; 
  flex-direction: column;
`;

const Router = () => {

    return (
        <>
        <BrowserRouter>
            <Wrapper>
                <HeaderContainer/>
                <Switch>    
                    <Route path="/" exact component={CreateRoom} />
                    <Route path="/room/:roomID" component={Room} />
                    <Route path="/studyCreate" component={StudyCreate} />

                    {/* path에 배열을 넣어 한 라우트 컴포넌트에 여러개 경로 설정 */}
                    {/* <Route component={PostListPage} path={['/@:username', '/']} exact /> */}
                    <Route component={PostListPage} path={'/postlist'} exact />
                    <Route component={LoginPage} path={'/login'} exact />
                    <Route component={RegisterPage} path={'/register'} exact />
                </Switch>
            </Wrapper>
            <Footer />
        </BrowserRouter>
        </>
    );
};

export default Router;