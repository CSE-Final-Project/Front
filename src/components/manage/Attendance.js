import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import AttendanceCard from './AttendanceCard';

const Attendance = (props) => {
    const studyId = props.studyID;
    const URL = '/api/studies/attendance/'+studyId;
    const [atten,setAtten]=useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAttendance = async () => {
        try{
            setAtten(null);
            setLoading(true);
            const date = new Date();
            const response = await axios.post(URL,{date:date});
            // console.log(response.data);
            setAtten(response.data);
        }catch (e){
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchAttendance();
    },[]);

    if(loading) return <div>loading...</div>;
    if(!atten) return null;

    return (
        <div>
            {
                atten.map(function(atten,i){
                        return(
                            <AttendanceCard atten={atten} i={i} key={i}/>
                        )
                    }       
                )
            }
            
        </div>
    );
};

export default Attendance;