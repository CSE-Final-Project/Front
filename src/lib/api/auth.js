import client from "./client";

/* login */
export const login = ({id,password}) =>
    client.post('https://nudo-study.cf/api/users/login',{id,password});

/* register */
export const register = ({id,password})=>
    client.post('https://nudo-study.cf/api/users/',{id,password});

/* 로그인 상태 확인 */
export const check = () => client.get('https://nudo-study.cf/api/users/check');

/* logout */
export const logout = () => client.get('https://nudo-study.cf/api/users/logout');