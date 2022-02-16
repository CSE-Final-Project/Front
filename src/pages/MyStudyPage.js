import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyStudy from '../components/MyStudy';
import { withRouter } from 'react-router';

const MyStudyPage = () => {
    const URL = '/api/users/studies';

    const [myStudy, setMyStudy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMyStudy = async () => {
        try{
            setError(null);
            setMyStudy(null);
            setLoading(true);

            const response = await axios.get(URL);
            setMyStudy(response.data);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchMyStudy();
    },[]);

    if(loading) return <div>loading...</div>;
    if(error) return <div>Error...</div>;
    if(!myStudy) return null;

    return (
        <div>
            {
                myStudy.map(function(mystudy, i){
                    return(
                        <MyStudy mystudy={mystudy} i={i} key={i}/>
                    )
                })
            }
        </div>
    );
};

export default withRouter(MyStudyPage);