import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

const StyledButton = styled.button`
    border:nond;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline:none;
    cursor: pointer;
    
    background: ${palette.gray[8]};
    &:hover{
        background:${palette.gray[7]};
    }

    ${props=> props.fullWidth && css`
        padding-top:0.75rem;
        padding-bottom: 0.75rem;
        width:100%;
        font-size: 1.125rem;
    `}

    ${props=> props.cyan && css`
        background: ${palette.yellow[0]};
        &:hover{
            background: ${palette.yellow[1]};
        }
    `}
`;

//{...props}쓴 이유 : Button이 받아 오는 props를 모두 StyledButton에 전달한다.
const Button_2  = ({ to, history, ...rest }) => {
    const onClick = e => {
        // to가 있다면 to로 페이지 이동
        if (to) {
          history.push(to);
        }
        if (rest.onClick) {
          rest.onClick(e);
        }
    };
    return (
        <div className="d-grid gap-2">
            <StyledButton {...rest} onClick={onClick} />
        </div>
    );
};

export default withRouter(Button_2 );