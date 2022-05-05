import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Container = styled.div`
    padding-left: 1em;    
    padding-right: 1em;  
`
const Writer = styled.div`
    font-size: large; 
    font-weight: bold;
`
const Div2 = styled.div`
    float: right;
`
const Div3 = styled.div`
    color :gray;
    font-weight: 100;
    font-size: small;
`
const Comment = (props) => {
    const comment = props.comment;
    const studyID = props.studyID;
    const postID = props.postID;

    const URL= '/api/studies/'+studyID+'/board/'+postID+'/comment/'+comment.idx;

    console.log(comment);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDelete = async () => {
        try {
            setError(null);
            setLoading(true);

            const response = await axios.delete(URL);
            if(response.data.code==="200"){
                alert('성공')
                window.location.reload();
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    
    return (
        <Container>
            <Card>
                <Card.Body>
                <Writer>{comment.user_id}<br/>
                <Div3>{comment.date} </Div3></Writer><br/>
                {comment.content}<br/>
                {/* idx: {comment.idx} <br/> */}
                {
                localStorage.getItem('user')===comment.user_id? (
                    <Div2>
                        {/* <Button size="sm">수정</Button> &nbsp; */}
                        <Button size="sm" onClick = {()=>{fetchDelete()}}>삭제</Button> &nbsp;
                    </Div2>
                ) : null
            }
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Comment;