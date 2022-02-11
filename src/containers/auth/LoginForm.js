/* redux와 연동하여 dispatch하는 component */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check, tempSetUser } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const LoginForm = ({history}) => {
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user})=>({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e =>{
        const {value,name}=e.target;
        dispatch( //dispatch는 action생성함수 호출
            changeField({
                form:'login',
                key: name,
                value
            })
        )
    }


    const onSubmit = e =>{
        e.preventDefault();
        const { id, password } = form;
        dispatch(login({ id, password }));
    }

    //component가 처음 렌더링될 때 form을 초기화 함.
    //맨 처음 렌더링 후, initializeForm 액션생성함수 호출
    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(() => {
        if (authError) {
          console.log('로그인 실패');
          console.log(authError);
          return;
        }
        if (auth) {
            if(auth.data==='login success'){
                console.log('로그인 성공');
                console.log(auth.data);
                console.log(auth.id);
                // dispatch(check());
                dispatch(tempSetUser(auth.id));
            }
     
        }else{
            console.log('로그인 실패');
        }
    }, [auth, authError, dispatch,history]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
            localStorage.setItem('user', user);
            // localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
            console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        //AuthForm에 props전달
        <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    );
};

export default withRouter(LoginForm);