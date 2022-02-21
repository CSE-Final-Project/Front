import React, {useEffect, useState} from 'react';

const StopWatch = (props) => {
    const [time, setTime] = useState(0);
    const [stop, setStop] = useState(false);
    const [click, setClick] = useState(false);
    const socket = props.socket;
    
    let stop_val = true;

    const sendWatchValue= () =>{
        if(props.watch === 'false'){
            props.getWatchValue('true');
            socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'true'})
        }else{
            props.getWatchValue('false');
            socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
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

    const buttonStyle = {
        position: 'absolute', 
        right: '0px', 
        bottom: '0px',
        fontSize: '0.7rem',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        borderColor: 'white'
    }

    const fullChange=() =>{
        const element = document.documentElement; 
        if(props.watch==='false'){ //false(멈춤) -> true(작동) 타이밍 
            if(element.requestFullscreen) {console.log("element.requestFullscreen"); element.requestFullscreen();} 
            else if(element.mozRequestFullScreen) {element.mozRequestFullScreen(); }
            else if(element.webkitRequestFullscreen) {console.log("element.webkitRequestFullscreen"); element.webkitRequestFullScreen(); }
            else if(element.msRequestFullscreen) {element.msRequestFullScreen(); }
        }else{
            if(document.exitFullscreen){ console.log("document.exitFullscreen"); document.exitFullscreen(); }
            else if(document.mozCancleFullScreen){ document.mozCancleFullScreen(); }
            else if(document.webkitExitFullscreen){ document.webkitExitFullscreen(); }
            else if(document.msExitFullscreen){ document.msExitFullscreen(); }
        }
    }

    return (
            <button style = {buttonStyle} onClick={()=>{ fullChange(); setClick(!click); sendWatchValue();}}>
                <span>{("0" + Math.floor((time/3600000)%24)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/60000)%60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}:</span>
                <span>{("0" + (time/10)%1000).slice(-2)}</span>
            </button>

    );
};

export default StopWatch;