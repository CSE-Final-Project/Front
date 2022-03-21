import {React, useContext} from 'react';
import styled from 'styled-components';

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
const enterComment = (studyID,postID) =>{
    window.location.replace('/manage/'+studyID+'/'+postID+'/comment');
}

const BoardCard = (props) => {
    const post = props.post;
    return (
        <Container>
            <Writer onClick={()=>{enterComment(props.studyID,post.name)}}>{post.name}</Writer> <br/>
            {post.content} <br/>
            <Div2 onClick={()=>{enterComment(props.studyID,post.name)}}>🗨️</Div2> <br/>
            
        </Container>
    );
};

export default BoardCard;