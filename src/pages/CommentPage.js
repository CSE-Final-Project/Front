import React, { useEffect, useState }  from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Comment from '../components/manage/Comment';
import WriteComment from '../components/manage/WriteComment';

const Container = styled.div`
  padding: 20px;
`;
const Writer = styled.div`
    font-size: large; 
    font-weight: bold;
`
const CommentPage = ({ match } ) => {
    const studyID =match.params.studyID;
    const postID = match.params.postID;
    const URL1 = '/api/studies/board/comment/'+studyID+'/'+postID;
    const URL2 = '/api/studies/board/'+studyID+'/'+postID;

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPost = async () => {
        try{
            //request 시작하면 error, studies 초기화
            setError(null);
            setPost(null);
            setLoading(true); //loading중이니까 true
            
            const response = await axios.get(URL2);
            setPost(response.data.post);
            console.log('post:',post);
            console.log('post2:',response.data.post);
        } catch(e){
            setError(e);
        }
        setLoading(false);
    }

    const fetchComment = async () => {
        try{
            //request 시작하면 error, studies 초기화
            setError(null);
            setComment(null);
            setLoading(true); //loading중이니까 true
            
            const response = await axios.get(URL1);
            setComment(response.data.comment);
            console.log('comment:',comment);
        } catch(e){
            setError(e);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchComment();
        fetchPost();
        console.log('comment:',comment);
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!comment) return null;
    if(!post) return null;

    return (
        <Container>
            <Writer>{post[0].name}</Writer> <br/>
            {post[0].content} <br/><br/>
            <hr/>

            {
                comment.map(function(comment,i){
                        return(
                            <>
                            <br/>
                                <Comment comment={comment} i={i} key={i}/>
                            </>
                        )
                    }       
                )
            }
            <br/>
            <hr/>
            <WriteComment/>


        </Container>
    );
};

export default CommentPage;