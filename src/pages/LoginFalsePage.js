import React , { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
`;

const LoginFalsePage = () => {

    return (
        <Container>
            로그인 안했을 때 페이지 수정3
        </Container>
    );
};

export default LoginFalsePage;