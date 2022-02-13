import React, { useEffect, useState } from 'react';
import AllStudy from '../components/AllStudy';
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
            console.log('studies:',studies);
        } catch(e){
            setError(e);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchStudies();
        console.log('studies1:',studies);
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!studies) return null;

    return (
        <div>
            {
                studies.map(function(study,i){
                        return(
                            <AllStudy study={study} i={i} key={i}/>
                        )
                    }       
                )
            }
            {/* <button onClick={fetchStudies}>다시 불러오기</button> */}
    
        </div>
    );
};

export default StudiesPage;