import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import { withRouter } from 'react-router';


const RegisterForm = ({history}) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user  } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange= e => {
    const {value,name} =e.target;
    dispatch(
        changeField({
                form:'register',
                key:name,
                value
            })
        );
    };



    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { id, password, passwordConfirm } = form;
        if (password !== passwordConfirm) {
        // TODO: 오류 처리
        return;
        }
        dispatch(register({ id, password }));
    };



    // 컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);



    // 회원가입 성공/실패 처리
    useEffect(() => {
        if (authError) {
        console.log('오류 발생');
        console.log(authError);
        return;
        }
        if (auth) {
            console.log(auth);
            if(auth.code==='200'){
                console.log('회원가입 성공');
                alert('회원가입이 성공했습니다.')
                history.push('/');
                window.location.replace('/');
            }
            else{
                alert('회원가입이 실패했습니다.');
            }
        }else{
            console.log('회원가입 오류');
        }
    }, [auth, authError,dispatch,history]);

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if (user) {
        history.push('/'); // 홈 화면으로 이동
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
            console.log('localStorage is not working');
        }
        }
    }, [history, user]);

    return (
        <AuthForm
        type='register'
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    );
};



export default withRouter(RegisterForm);