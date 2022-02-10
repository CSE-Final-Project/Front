import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import rootReducer, {rootSaga} from './modules';

import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { tempSetUser, check } from './modules/user';


/* store 생성 | 프로젝트에 redux 적용하기 위해 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// const [isLogin, setIsLogin] = useState();
    // useEffect(()=>{
    //     if(sessionStorage.getItem('user')){
    //         setIsLogin(true);
    //     }
    // },[]);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안 함
    store.dispatch(tempSetUser(user));
    // store.dispatch(check());
    console.log('index.js user:',user);

  } catch (e) {
      console.log('localStorage is not working');
    }
}



sagaMiddleware.run(rootSaga);
loadUser();

// const store = createStore(
//   rootReducer, 
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   composeWithDevTools(),
//   );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
