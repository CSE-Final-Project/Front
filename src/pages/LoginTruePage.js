import React from 'react';
import styled from 'styled-components';
import {Card,Button} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;
const LoginTruePage = () => {
    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    var str1 = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월 '+dt.getDate()+'일';
    return (
        <Container>
            <Card >
                <Card.Header className="text-center">
                    {localStorage.getItem('user')}님의 공부 시간✏️
                </Card.Header>
                <Card.Body>
                    <Card.Title> {str1}  </Card.Title> <br/>
                    <Card.Text>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                  
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginTruePage;