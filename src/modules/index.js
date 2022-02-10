/* 
store를 만들 때는 reducer 하나만 사용해야 함
-> combineReducer로 합쳐줌 
*/
import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import { all } from "redux-saga/effects";
import user,{userSaga} from "./user";

const rootReducer = combineReducers({
    auth,
    loading,
    user,
});

export function* rootSaga(){
    yield all([authSaga(),userSaga()]);
}

export default rootReducer;
//import rootReducer from './modules';