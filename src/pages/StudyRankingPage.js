import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StudyRanking from '../components/StudyRanking';

const Container = styled.div`
  padding: 20px;
`;

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
        </Container>
    );
};

export default StudyRankingPage;