import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardCard from './BoardCard';

const Container = styled.div`
  padding: 20px;
`;

const Board = (props) => {
    const studyID = props.studyID
    const URL = '/api/studies/board/'+studyID;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPost = async () => {
        try{
            setError(null);
            setLoading(true);
            setPost(null);

            const response = await axios.get(URL);
            console.log(response.data.code);
            console.log(response.data.board);
            setPost(response.data.board);
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
            {
                post.map(function(post,i){
                    return(
                        <>
                        <BoardCard studyID={studyID} post={post} key={i}/>
                        <hr/>
                        </>
                    )
                })
            }
        </Container>
    );
};

export default Board;