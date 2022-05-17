import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;

//
const Ranking_font = styled.div`
    font-size: xx-large;
    font-weight: bold;
`;
//

const Date_font = styled.div`
    font-size: large;
    font-weight: bold;
    text-align: center; 
`;

const ContentBox = styled.div`
    display: flex;
    gap: 0.25rem;
    
    align-items: center;
    grid-area: content;
    justify-content: center;
`;
const Content1 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: left;
    width: 30%;
    height: 100%;
`;
const Content2 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: left;
    width: 50%;
    height: 100%;
    font-size: large;
`;
const Content3 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 100%;
    height: 100%;
`;

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
            <br/>
            <Card>
                <Card.Header>{study.topic}</Card.Header>
                <Card.Body>
                    <Card.Title>{study.title}</Card.Title>
                    <Card.Text>
                    <ContentBox>
                        <Content1>방장</Content1>
                        <Content2>{study.leader}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>
                    <ContentBox>
                        <Content1>목표 시간</Content1>
                        <Content2>{study.target_time}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <ContentBox>
                        <Content1>하루 벌금</Content1>
                        <Content2>{study.penalty}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <ContentBox>
                        <Content1>멤버 수</Content1>
                        <Content2>{study.member_number}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>
                    <ContentBox>
                        <Content1>스터디 정보</Content1>
                        <Content2>{study.info}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>
                    </Card.Text>
                    {
                        (study.is_recruit === true)?
                        <>
                            <Button variant="dark" onClick={() => {fetchJoin()}}>JOIN</Button>
                        </>
                        : null
                    }
                </Card.Body>
            </Card>
            
        </div>
    );
};

export default StudiesComp;