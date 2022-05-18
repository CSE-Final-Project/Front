import React from 'react';
import styled from 'styled-components';
import {Card,Button,ListGroup} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;
const LoginTruePage = () => {
    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    var str1 = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월 '+dt.getDate()+'일';
    return (
        <Container>
            {/* <Card >
                <Card.Header className="text-center">
                📚{localStorage.getItem('user')}님✏️
                </Card.Header>
                <Card.Body>
                    <Card.Title> {str1}  </Card.Title> 
                    <hr/> 
                    <Card.Text>

                    <Card>
                        <Card.Header>Algorithm study</Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                            공부 시간 : 1시간 20분 <br/>
                            출석 : X <br/>
                         
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header>Midterm Exam study</Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                            공부 시간 : 3시간 <br/>
                            출석 : O <br/>
                           
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    </Card.Text>
                </Card.Body>
            </Card> */}
            STUDY.DO <br/><br/>

            공부만 하세요.  <br/>
            스터디 관리는 알아서 해드릴게요. 🙂 <br/><br/>

            생산성을 높여주는 캠스터디 서비스 <br/>
            STUDY.DO 입니다. <br/>
        </Container>
    );
};

export default LoginTruePage;