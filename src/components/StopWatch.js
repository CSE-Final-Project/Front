import React, {useEffect, useState} from 'react';

const StopWatch = (props) => {
    const [time, setTime] = useState(0);
    const [stop, setStop] = useState(true);
    const [click, setClick] = useState(true);

    const buttonstyle = {
            
        border: "medium none",
        display: "block",
        fontSize: "12px",
        padding: "0px 0px",
        right: "0",
        backgroundColor: "#ff0000",
        backgroundRepeat:"no-repeat",
        position: "absolute",
        left: "40%",
        top: "90%" ,
        bottom: "0%",
        margin: "auto", 
        backgroundSize: "contain",
        backgroundPosition: "center",
        float: "right" 
         }
    
    let stop_val = true;

    const sendWatchValue= () =>{
        if(props.watch === 'false'){
            props.getWatchValue('true');
        }else{
            props.getWatchValue('false');
        }
    }

    // console.log('wow: ',props.detect);
    if(props.detect === 'false'){  //Room.js의 result를 props.detect로 받아옴
        stop_val = false;
    }else if(props.detect === 'true'){
        stop_val = true;
    }
    // console.log('stop: ',stop);

    useEffect(()=>{
        let interval = null

        setStop(stop_val);
        // console.log('aaa: ',stop);
        
        if(click & stop){
            interval = setInterval(()=>{
                setTime(prevTime => prevTime+10)
            },10)
        } else {
             clearInterval(interval);
        }

        return () => clearInterval(interval);
    },)

    return (
            <button style = {{position: 'absolute', right: '0%', top: '90%'}} onClick={()=>{ setClick(!click); sendWatchValue();}}>
                <span>{("0" + Math.floor((time/3600000)%24)).slice(-2)}시간 </span>
                <span>{("0" + Math.floor((time/60000)%60)).slice(-2)}분 </span>
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}초 </span>
                <span>{("0" + (time/10)%1000).slice(-2)}</span>
            </button>

    );
};

export default StopWatch;