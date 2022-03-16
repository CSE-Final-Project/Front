import React from 'react';
import styled from 'styled-components';
import {Card} from 'react-bootstrap';

const Container = styled.div`
    padding-left: 1em;    
    padding-right: 1em;  
`
const Writer = styled.div`
    font-size: large; 
    font-weight: bold;
`
const Comment = (props) => {
    const comment = props.comment;

    return (
        <Container>
            <Card>
                <Card.Body>
                <Writer>{comment.name}</Writer><br/>
                {comment.content}<br/>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Comment;