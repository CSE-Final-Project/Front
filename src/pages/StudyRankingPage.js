import React, {useState} from 'react';
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

    const [studies, setStudies] = useState([{id:1,title:"study1",studytime:500},
        {id:2,title:"study2",studytime:400},
        {id:3,title:"study3",studytime:300},
        {id:4,title:"study4",studytime:200},
        {id:5,title:"study5",studytime:100},
    ]);

    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    var str1 = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월 '+dt.getDate()+'일';

    return (
        <Container>
            <Date_font>{str1}</Date_font><hr/>
            {/* <ContentBox>
                <Content1>순위</Content1>
                <Content2>이름</Content2>
                <Content3>평균 공부시간</Content3>
            </ContentBox> */}
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