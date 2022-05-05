import React, { useEffect, useState }  from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Comment from '../components/manage/Comment';
import WriteComment from '../components/manage/WriteComment';
import { Button } from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;
const Writer = styled.div`
    font-size: large; 
    font-weight: bold;
`
const CommentPage = ({ match }) => {
    const studyID =match.params.studyID;
    const postID = match.params.postID;
    
    //게시글 상세 화면 /api/studeis/{:studyId}/board/{:idx}
    const URL = '/api/studies/'+studyID+'/board/'+postID;

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        try {
            setError(null);
            setLoading(true);
            setPost(null);
            setComment(null);

            const response = await axios.get(URL);
            // setPost(response.data.get_data)
            // console.log('<>1:',response.data.get_data);
            // console.log('<2>:',response.data.get_data.post);
            // console.log('<2>:',response.data.get_data.post.user_id);
            // console.log('<3>>:',response.data.get_data.comments);
            // console.log('<4>>:',response.data.get_data.comments[0].idx);

            // setPost(response.data.get_data.post);
            // setComment(response.data.get_data.comments);
            console.log(response.data.post);
            console.log(response.data.comment);
            setPost(response.data.post);
            setComment(response.data.comment);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        // fetchComment();
        // fetchPost();
        fetchAll();
        console.log('comment:',comment);
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!comment) return null;
    if(!post) return null;

    return (
        <Container>
            <Writer>{post.user_id}</Writer> <br/>
            {post.content} <br/><br/>
            <hr/>

            {
                comment.map(function(comment,i){
                        return(
                            <>
                            <br/>
                                <Comment comment={comment} studyID={studyID} postID={postID} i={i} key={i}/>
                            </>
                        )
                    }       
                )
            }
            <br/>
            <hr/>
            <WriteComment/>
            {/* <button onClick={()=>{window.location.replace("/manage/study1")}}>뒤</button> */}
        </Container>
    );
};

export default CommentPage;