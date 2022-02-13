import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StudiesComp = (props) => {
    const study = props.study;

    const URL = '/api/studies/join';

    const [join, setJoin] = useState(null);
    // const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchJoin = async () => {
        try{
            // setError(null);
            // setJoin(null);
            // setLoading(true);

            const response = await axios.post(URL,{study_id: study.id});
            // const response = await axios.post(URL,{study_id:'asd'});
            // setJoin(response);
            console.log(response.data.msg);
            if(response.data.code === "200"){
                alert('스터디에 가입되었습니다.');
            }
            else if(response.data.code === "400"){
                alert('스터디 정원이 다 찼습니다.');
            }
        } catch(e) {
            // setError(e);
        }
        // setLoading(false);
    };


    return (
        <div>
            <h1>{study.title}</h1>
            스터디 아이디: {study.id} <br/>
            방장이름: {study.leader} <br/>
            주제: {study.topic} <br/>
            목표 시간: {study.target_time} <br/>
            멤버 수: {study.member_number} <br/>
            하루 벌금: {study.penalty} <br/>
            스터디 정보: {study.info} <br/>
            <button onClick={() => {fetchJoin()}}>가입</button>
            <hr/>
        </div>
    );
};

export default StudiesComp;