import React, {useEffect, useState} from 'react';

const StopWatch = (props) => {
    const [time, setTime] = useState(0);
    //mode off -> on 으로 클릭 시 stop 기본 false 상태로 바꿔줘야 함
    const [stop, setStop] = useState(false);
    //mode off -> on 으로 클릭 시 click 도 false로 바꿔줘야 함, click const Room.js로 이동
        //const [click, setClick] = useState(false);
    const socket = props.socket;
    
    let stop_val = false;

    const sendWatchValue= () =>{
        props.getClickValue(!props.click);
        if(!props.mode){ //자동 측정 mode off 일 때만 watch 수동 조작 이벤트 실행
            if(props.watch === 'false'){
                props.getWatchValue('true');
                props.timeStart();
                props.getVideoColorValue('true')
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'true'})
            }else{
                props.getWatchValue('false');
                props.timeEnd();
                props.getVideoColorValue('false')
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
            }
        }else{ //mode on
            props.getClickValue(true);
            props.getWatchValue('true');
        }
    }

    // console.log('wow: ',props.detect);
    if(props.mode){
        if(props.detect === 'false'){  //Room.js의 result를 props.detect로 받아옴
            stop_val = false;
        }else if(props.detect === 'true'){
            stop_val = true;
        }
    }
    // console.log('stop: ',stop);
    useEffect(()=>{
        let interval = null

        setStop(stop_val);
        console.log('aaa: ',stop);
        console.log("시간 측정 기준 변수 상태: click->", props.click, " stop->", stop," props.watch->", props.watch)
        // mode on: stop만 true 면 됨
        if(props.mode){  
            if(stop){ 
                interval = setInterval(()=>{
                    setTime(prevTime => prevTime+10)
                },10)
            } else {
                clearInterval(interval);
            }
        }else{ //mode off: watch 만 true 면 됨 (코드 나중에 정리)
            if(props.click &  props.watch === 'true' ){ 
                interval = setInterval(()=>{
                    setTime(prevTime => prevTime+10)
                },10)
            } else {
                clearInterval(interval);
            }

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

    //setClick(!click);
    return (
            <button style = {buttonStyle} onClick={()=>{ fullChange(); sendWatchValue();}}>
                <span>{("0" + Math.floor((time/3600000)%24)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/60000)%60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}:</span>
                <span>{("0" + (time/10)%1000).slice(-2)}</span>
            </button>

    );
};

export default StopWatch;