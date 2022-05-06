import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';
import { Button } from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;

const Board = (props) => {
    axios.defaults.withCredentials = true;
    const studyID = props.studyID
    const URL = 'https://nudo-study.cf/api/studies/'+studyID+'/board/';
    const write_URL = '/manage/'+studyID+'/write';

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPost = async () => {
        try{
            setError(null);
            setLoading(true);
            setPost(null);

            const response = await axios.get(URL);
            // console.log(response.data.code);
            // console.log(response.data.board);
            console.log(response.data.posts);
            // setPost(response.data.board);
            setPost(response.data.posts);
            console.log('post:',post);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchPost();
    },[])

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!post) return null;
    return (
        <Container>
            <div className="d-grid gap-2">
            <Button variant="warning" size="lg" href={write_URL}>
                +
            </Button>
            </div>
            <br/>
            {
                post.map(function(post,i){
                    return(
                        <>
                        <BoardCard studyID={studyID} post={post} key={post.idx}/>
                        <hr/>
                        </>
                    )
                })
            }
        </Container>
    );
};

export default Board;