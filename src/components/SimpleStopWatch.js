import React, {useEffect, useState} from 'react';

const SimpleStopWatch = (props) => {
    const [time, setTime] = useState(0);
    const [stop, setStop] = useState(false);
    const [click, setClick] = useState(false);
    const socket = props.socket;

    const sendWatchValue= () =>{ //스탑워치 클릭 시 로직
        props.getClickValue(!props.click);
    }

//     useEffect(()=>{
//         let interval = null
//   //      if(click){
//                 interval = setInterval(()=>{
//                     setTime(prevTime => prevTime+10)
//                 },10)
//             //} else {
//                // clearInterval(interval);
//            //}
//         return () => clearInterval(interval);
//     },)

const [delay, setDelay] = useState(1000);
const [isRunning, setIsRunning] = useState(true);

// useInterval(() => {
//     setTime(time + 1);
//   }, isRunning ? delay : null);

    const buttonStyle = {
        position: 'absolute', 
        left: '0px', 
        bottom: '20px',
        fontSize: '1.5rem', //원래 0.7 (발표용)
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        borderColor: 'white'
    }

    return (
            <button style = {buttonStyle} onClick={()=>{ setClick(!click);}}>
                <span>{("0" + Math.floor((time/3600000)%24)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/60000)%60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}</span>
            </button>

    );
};

export default SimpleStopWatch;