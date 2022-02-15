import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

const MyStudy = (props) => {
    const mystudy = props.mystudy;
    const mystudy_id = mystudy.id;

    const URL = '/api/studies/do/'+mystudy_id;

    const fetchRoom = async () => {
        try{
            const response = await axios.get(URL);
            console.log(response.data);
            if(response.data.code==="200"){
                props.history.push('/room/'+response.data.addr);
            }
        }catch(e){
            console.log(e);
        }
    }

    const enterManage = () =>{
        props.history.push('/manage/'+ mystudy_id);
    }

    return (
        <div>
            <h3>title: {mystudy.title}</h3>
            스터디아이디: {mystudy.id} <br/>
            방장: {mystudy.leader} <br/>
            목표시간: {mystudy.target_time} <br/>
            벌금: {mystudy.penalty} <br/>
            정보: {mystudy.info} <br/>
            <button onClick={()=>{fetchRoom()}}>공부 시작</button>
            <button onClick={()=>{enterManage()}}>관리</button>
            <hr/>
        </div>
    );
};

export default withRouter(MyStudy);
