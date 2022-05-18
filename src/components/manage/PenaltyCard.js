import React, { useEffect, useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const ContentBox = styled.div`
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    align-items: center;
    grid-area: content;
    justify-content: center;
`;
const Content1 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 20%;
    height: 100%;
`;
const Content2 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 50%;
    height: 100%;
    font-size: large;
`;
const Content3 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 20%;
    height: 100%;
`;

const PenaltyCard = (props) => {
    axios.defaults.withCredentials = true;
    const penalty = props.penalty;
    const studyID = props.studyID;
    console.log('스터디아이디~',studyID);

    const URL_leader = 'https://nudo-study.cf/api/studies/'+studyID+'/leader';
    const URL = 'https://nudo-study.cf/api/studies/'+studyID+'/penalty';
    const [loading,setLoading] = useState(false);
    const [leader ,setLeader] = useState(null);

    const fetchLeader = async () => {
        try{
            setLoading(true);
            setLeader(null);
            const response = await axios.get(URL_leader);
            console.log(response);
            setLeader(response.data.leader);
        }catch (e){
            console.log(e)
        }
        setLoading(false);

    }

    const userID = localStorage.getItem('user');
    console.log('userID:',userID)

    const fetchPen = async () => {
        try {
            console.log(URL)
            const response = await axios.post(URL,{user_id:userID, penalty_user_id:penalty.user_id});
            if(response.data.code === "200"){
                alert('정산 완료');
                var location = window.location;
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchLeader();
    },[]);

    if(loading) return <div>loading...</div>;
    if(!leader) return null;

    return (
        <div>
            <br/>
            <Card>
                <Card.Header>{penalty.user_id}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <ContentBox>
                        <Content1>{penalty.total_penalty}원</Content1>
                        <Content2></Content2>
                        {
                            (localStorage.getItem('user')===leader)?
                            <>
                                <Content3><Button variant="dark" onClick={()=>{fetchPen()}}>정산</Button></Content3>
                            </>
                            : 
                            <>
                                <Content3></Content3>
                            </>
                        }
                    </ContentBox>
                    </blockquote>
                    
                </Card.Body>
            </Card>
        </div>
    );
};

export default PenaltyCard;