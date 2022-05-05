import React from 'react';
import {Card, Button} from 'react-bootstrap';
import styled from 'styled-components';

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
    const penalty = props.penalty;
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
                            (localStorage.getItem('user')===penalty.user_id)?
                            <>
                                <Content3><Button variant="primary">정산</Button></Content3>
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