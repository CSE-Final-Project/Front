import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StudyRanking from '../components/StudyRanking';
//
import {Card} from 'react-bootstrap';
//

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
    padding: 0.25rem;
    align-items: center;
    grid-area: content;
    justify-content: center;
`;
const Content1 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 30%;
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
    width: 100%;
    height: 100%;
`;

const StudyRankingPage = () => {
    axios.defaults.withCredentials = true;
    const URL = 'https://nudo-study.cf/api/rankings/studies';
    const [studies, setStudies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRanking = async () => {
        try{
            setError(null);
            setStudies(null);
            setLoading(true);

            const response = await axios.get(URL);
            if(response.data.code === 200){
                setStudies(response.data.ranking);
                console.log('ranking:',response.data.ranking);
                console.log('studies:',studies);
            }
        }catch(e){
            setError(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchRanking();
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!studies) return null;

    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    var str1 = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월 '+dt.getDate()+'일';

    return (
        <Container>
            <Date_font>{str1}</Date_font><hr/>
            {
                studies.map(function(study,i){
                        return(
                            <StudyRanking study={study} i={i} key={i}/>
                        )
                    }       
                )
            }


            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>🥇</Ranking_font></Content1>
                    <Content2>study_1</Content2>
                    <Content3>6시간 20분</Content3>
                </ContentBox>
            </Card> <br/>
            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>🥈</Ranking_font></Content1>
                    <Content2>study_AI</Content2>
                    <Content3>5시간 30분</Content3>
                </ContentBox>
            </Card> <br/>
            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>🥉</Ranking_font></Content1>
                    <Content2>study_co</Content2>
                    <Content3>4시간 50분</Content3>
                </ContentBox>
            </Card> <br/>
            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>4</Ranking_font></Content1>
                    <Content2>study_22</Content2>
                    <Content3>2시간 20분</Content3>
                </ContentBox>
            </Card> <br/>
            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>5</Ranking_font></Content1>
                    <Content2>study_00</Content2>
                    <Content3>1시간 00분</Content3>
                </ContentBox>
            </Card>
            

        </Container>
    );
};

export default StudyRankingPage;