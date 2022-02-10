/*
redux-saga를 통해 api 요청할 수 있도록
loading redux module과 createRequestSaga 유틸 함수 설정
요청을 위한 액션 타입을 payload로 설정 (sample/GET_POST)
 */

import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
    START_LOADING,
    requestType=> requestType,
);

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType,
);

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);

export default loading;