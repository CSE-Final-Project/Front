import React, {useEffect, useState, useRef} from 'react';

var click = false;
var stTime = 0;
var endTime = 0;
var timerStart = null; //잘못되었을수도..

const SimpleStopWatch = (props) => {
    const socket = props.socket;
    let stop_val = false;

    const buttonStyle = {
        position: 'absolute', 
        right: '0px', 
        bottom: '0px',
        fontSize: '1.5rem', //원래 0.7 (발표용)
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
        borderColor: 'white'
    }

    const sendWatchValue= () =>{ //스탑워치 클릭 시 로직
        props.getClickValue(!props.click);
        if(!props.mode){ //자동 측정 mode off 일 때만 watch 수동 조작 이벤트 실행
            console.log("1. props.watch: ", props.watch);
            if(props.watch === 'false'){
                props.getWatchValue('true');
                console.log("2. props.watch: ", props.watch);
                props.timeStart();
                props.getVideoColorValue('true') //흑백 - 블랙 타이밍 확인용
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'true'})
            }else{
                props.getWatchValue('false');
                console.log("3. props.watch: ", props.watch);
                props.timeEnd();
                props.getVideoColorValue('false') //흑백 - 블랙 타이밍 확인용
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
            }
        }/*else{ //mode on
            props.getClickValue(true);
            props.getWatchValue('false'); //0505 true -> false로 바꿈, 처음에는 false로 시작해야하지 않나..
            console.log("4. props.watch: ", props.watch);
            socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
        } */
    }

    // console.log('wow: ',props.detect);
    if(props.mode){
    if(props.detect === 'false'){  //Room.js의 result를 props.detect로 받아옴
        stop_val = false;
    }else if(props.detect === 'true'){
        stop_val = true;
    }
}

    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    useEffect(()=>{
 //  function startOrStop() {
             // setClick(!click);
            // click = !click; 
  console.log("click1: ", click)
        if(click == true){
            click = false;
        }else{
            click = true; 
        }
    console.log("click2:", click);
    console.log("watch: ", props.watch);
    if(props.watch === 'true'){ //click -> 기준 watch 하나로
        if(stTime==0) {
            console.log("1");
            stTime = Date.now() // 처음 시작할 때
        }else{
            console.log("2");
            stTime += (Date.now() - endTime) // 재시작할 때
            }
        timerStart = setInterval(function() {
        console.log("3");
        var nowTime = new Date(Date.now() - stTime)
            //console.log("nowTime: ", nowTime);
        var hourNum = nowTime.getHours()-9; //UTC+9 확인 (Date.now와 new Date와 기준이 다른지 확인)
        setHour(hourNum);
        var minNum = nowTime.getMinutes();
        setMin(minNum);
        var secNum = nowTime.getSeconds();
        setSec(secNum);
        }, 1000)
    }else{
        console.log("4");
      //  if(timerStart) {
         //   console.log("5");
            clearInterval(timerStart)
            endTime = Date.now() // STOP시점의 시간 저장
         //   }
 }
 return () => clearInterval(timerStart);
},[props.watch])

const fullChange=() =>{
    const element = document.documentElement; 
    if(!props.mode){
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
}
// startOrStop(); 
//},)
//hour > 9 ? hour : 
//setClick(!click);
    return (
            <button style = {buttonStyle} onClick={()=>{sendWatchValue();  fullChange();}}>
                <span>{hour > 9 ? hour : "0" + hour}:</span>
                <span>{min > 9 ? min : "0" + min}:</span>
                <span>{sec > 9 ? sec : "0" + sec}</span>
            </button>
    );
};

export default SimpleStopWatch;