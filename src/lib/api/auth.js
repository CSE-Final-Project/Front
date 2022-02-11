import client from "./client";

/* login */
export const login = ({id,password}) =>
    client.post('/api/users/login',{id,password});

/* register */
export const register = ({id,password})=>
    client.post('/api/users/',{id,password});

/* 로그인 상태 확인 */
export const check = () => client.get('/api/users/check');

/* logout */
export const logout = () => client.get('/api/users/logout');