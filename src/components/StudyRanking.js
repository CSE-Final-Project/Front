import React from 'react';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';

const Ranking_font = styled.div`
    font-size: xx-large;
    font-weight: bold;
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

const StudyRanking = (props) => {
    const study = props.study;
    let medal='';
    if(study.rank===1){
        medal = "🥇";
    }else if(study.rank === 2) {
        medal = "🥈";
    }else if(study.rank === 3) {
        medal = "🥉";
    }else{
        medal =study.rank;
    }
    return (
        <>
            <Card body>
                <ContentBox>
                    <Content1>
                        <Ranking_font>{medal}</Ranking_font></Content1>
                    <Content2>{study.study_id}</Content2>
                    <Content3>{study.avg_time} </Content3>
                </ContentBox>
            </Card>
            <br/>
        </>
    );
};

export default StudyRanking;