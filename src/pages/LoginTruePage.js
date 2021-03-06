import React from 'react';
import styled from 'styled-components';
import {Card,Button,ListGroup} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;
const LoginTruePage = () => {
    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    var str1 = dt.getFullYear()+'λ '+(dt.getMonth()+1)+'μ '+dt.getDate()+'μΌ';
    return (
        <Container>
            <Card >
                <Card.Header className="text-center">
                π{localStorage.getItem('user')}λβοΈ
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
                            κ³΅λΆ μκ° : 1μκ° 20λΆ <br/>
                            μΆμ : X <br/>
                         
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header>Midterm Exam study</Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                            κ³΅λΆ μκ° : 3μκ° <br/>
                            μΆμ : O <br/>
                           
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginTruePage;