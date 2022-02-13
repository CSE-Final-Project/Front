import React, { useEffect, useState } from 'react';
import StudiesComp from '../components/StudiesComp';
import axios from 'axios';

const StudiesPage = () => {
    const URL = '/api/studies';

    const [studies, setStudies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStudies = async () => {
        try{
            //request 시작하면 error, studies 초기화
            setError(null);
            setStudies(null);
            setLoading(true); //loading중이니까 true
            
            const response = await axios.get(URL);
            setStudies(response.data);
        } catch(e){
            setError(e);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchStudies();
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!studies) return null;

    return (
        <div>
            {
                studies.map(function(study,i){
                        return(
                            <StudiesComp study={study} i={i} key={i}/>
                        )
                    }       
                )
            }
            <button onClick={fetchStudies}>다시 불러오기</button>
    
        </div>
    );
};

export default StudiesPage;