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
            <Date_font>{str1}</Date_font><br/>
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