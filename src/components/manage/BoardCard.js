import {React, useContext} from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import BoardPutPage from '../../pages/BoardPutPage';

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

const enterBoardPut = (studyID,postID) =>{
    window.location.replace('/manage/'+studyID+'/'+postID+'/put');
}

const BoardCard = (props) => {
    const post = props.post;
    const studyID = props.studyID;

    const URL_delete = '/api/studies/'+studyID+'/board/'+post.idx;

    const fetchDelete = async () => {
        try {
            const response = await axios.delete(URL_delete);
            if(response.data.code === "200"){
                alert('성공')
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Writer onClick={()=>{enterComment(props.studyID,post.idx)}}>{post.title}</Writer> <br/>
            content : {post.content} <br/>
            idx : {post.idx} <br/>
            user_id : {post.user_id} <br/>
            date : {post.date} <br/>
            {
                localStorage.getItem('user')===post.user_id? (
                    <Div2>
                        <Button variant="warning" size="sm" onClick={()=>{enterBoardPut(props.studyID,post.idx)}}>수정</Button> &nbsp;
                        <Button variant="warning" size="sm" onClick={()=>{fetchDelete()}}>삭제</Button> &nbsp;
                        <Button variant="warning" size="sm" onClick={()=>{enterComment(props.studyID,post.idx)}}>🗨️{post.comments}</Button>
                    </Div2>
                ) : (
                    <Div2>
                        <Button variant="warning" size="sm" onClick={()=>{enterComment(props.studyID,post.idx)}}>🗨️{post.comments}</Button>
                    </Div2>
                )
            }
            <br/>
            
        </Container>
    );
};

export default BoardCard;