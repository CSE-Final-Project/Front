import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../modules/user';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  if (window.location.pathname.includes('room')) return null; 

  return (
    <> 
      <Header user={user} onLogout={onLogout} />
    </>
  );
};



export default HeaderContainer;