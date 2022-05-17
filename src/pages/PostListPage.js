import React, { useEffect, useState } from 'react';
// import Button from '../components/common/Button_2';
import HeaderContainer from '../containers/common/HeaderContainer';

const PostListPage = () => {
    
    const [test, setTest] = useState('initial value');
    const [test2, setTest2] = useState('initial value2');

    useEffect(() => {
      console.log('1>렌더링!:모든값이 바뀔때마다 렌더링');
      return () => {
            console.log('1-2>언마운트 시 호출!')
        }
    });
    // state가 변경될 때 마다 기존의 컴포넌트가 unmount되면서 
    // 로그를 찍고 다시 렌더링 되면서 로그를 찍습니다

    useEffect(() => {
        console.log('2>test값이 바뀔때마다 렌더링!');
    },[test]);

    useEffect(() => {
        console.log('3>test2 state에 대해서만 호출!')
    }, [test2])

    useEffect(() => {
        console.log('4>첫 렌더링에만 호출')
        setTest2('last')
        return () => {
            console.log('4-1>마지막 언마운트 시 호출')
        }
    }, [])
  
    return (
      <div>
        <p>{test}</p>
        <input onChange={(e) => {setTest(e.target.value)}} />
        <p>{test2}</p>
        <input onChange={(e) => {setTest2(e.target.value)}} />
      </div>
    )
};

export default PostListPage;