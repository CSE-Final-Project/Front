import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button_2 from '../common/Button_2';
/*
회원가입, 로그인 폼을 보여주는 component
*/

const AuthFormBlock = styled.div`
    h3{
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px;
    // border-bottom-color : black;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: &oc-teal-7;
    }
    &:+{
        margin-top: 1rem;
    }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
 const Footer = styled.div`
    margin-top: 2rem;
    text-align:right;
    a{
        color:${palette.gray[6]};
        text-decoration:underline>;
        &amp;:hover {
        color:${palette.gray[9]};
        border-bottom:1px solid ${palette.gray[7]};
        }
        &amp;+&amp;{
            margin-top: 1rem;
        }
    }
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

const AuthForm = ({type,form,onChange,onSubmit}) => {
    const text = textMap[type];
    
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput 
                    autoComplete="id" 
                    name="id" 
                    placeholder='아이디'
                    onChange={onChange}
                    value={form.id}
                    />
                <StyledInput 
                    autoComplete='new-password'
                    name= 'password'
                    placeholder='비밀번호'
                    type='password'
                    onChange={onChange}
                    value={form.password}
                />  
                {type === 'register' && (
                    <StyledInput
                        autoComplete='new-password'
                        name='passwordConfirm'
                        placeholder='비밀번호 확인'
                        type='password'
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}
                <Button_2 >{text}</Button_2>
                {/* <Button cyan fullWidth style={{marginTop: '1rem'}}>{text}</Button> */}
            </form>
            <Footer>
                {
                    type ==='login'?
                    (
                        <Link to= '/register'>회원가입</Link>
                    ):
                    (
                        <Link to= '/login'>로그인</Link>
                    )
                }
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;