import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PenaltyCard from './PenaltyCard';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;
const Penalty = (props) => {
    axios.defaults.withCredentials = true;
    const studyID = props.studyID;
    const URL ='/api/studies/penalty/'+studyID;
    const [penalty, setPenalty] = useState(null);
    const [loading,setLoading] = useState(false);

    const fetchPenalty = async () => {
        try{
            setLoading(true);
            setPenalty(null);
            const response = await axios.get(URL);
            setPenalty(response.data);
        }catch (e){
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchPenalty();
    },[]);
    
    if(loading) return <div>loading...</div>;
    if(!penalty) return null;

    return (
        <Container>
            {
                penalty.map(function(penalty,i){
                    return(
                        <PenaltyCard penalty={penalty} i={i} key={i}/>
                    )
                })
            }
        </Container>
    );
};

export default Penalty;