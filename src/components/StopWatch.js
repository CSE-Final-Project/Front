import React, {useEffect, useState} from 'react';

const StopWatch = (props) => {
    const [time, setTime] = useState(0);
    const [stop, setStop] = useState(false);
    const [click, setClick] = useState(false);
    const socket = props.socket;

    //지연 수정
   // const [delay, setDelay] = React.useState(1000); 
    //const [isRunning, toggleIsRunning] = useBoolean(true); 
    
    let stop_val = false;

    //함수로 바꿔서 const StopWatch 밖으로 내보내기, 
    //stopwatch에서 useInterval 함수 사용하기
    //useEffect 부분 조건 따라 isRunning 값 바꾸기 
    //(mode on, off 둘 다 isRunning 으로 사용..그럼 이 함수가 Room에 가야할듯.. mode 바뀔 때도 초기화, 디텍션할 때도)
    /*const useInterval = (callback, delay)=> {
        const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.
      
        useEffect(() => {
          savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
        }, [callback]);
      
        useEffect(() => {
          function tick() {
            savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
          }
          if (delay !== null) { // 만약 delay가 null이 아니라면 
            let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
            return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
          }
        }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
      }
*/

    const sendWatchValue= () =>{ //스탑워치 클릭 시 로직
        props.getClickValue(!props.click);
        if(!props.mode){ //자동 측정 mode off 일 때만 watch 수동 조작 이벤트 실행
            if(props.watch === 'false'){
                props.getWatchValue('true');
                props.timeStart();
                props.getVideoColorValue('true') //흑백 - 블랙 타이밍 확인용
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'true'})
            }else{
                props.getWatchValue('false');
                props.timeEnd();
                props.getVideoColorValue('false') //흑백 - 블랙 타이밍 확인용
                socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
            }
        }else{ //mode on
            props.getClickValue(true);
            props.getWatchValue('false'); //0505 true -> false로 바꿈, 처음에는 false로 시작해야하지 않나..
            socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
        } //else{
        //     props.getWatchValue('false');
        //     socket.emit('false-event', { peer_tf: props.myID, dst_room: props.roomID, tf_state: 'false'})
        // }
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
        //console.log("시간 측정 기준 변수 상태: click->", props.click, " stop->", stop," props.watch->", props.watch)
        // mode on: stop만 true 면 됨
        if(props.mode){  
            if(stop){//mode on, running -> true
                interval = setInterval(()=>{
                    setTime(prevTime => prevTime+10)
                },10)
            } else { //mode off, not running -> false
                clearInterval(interval);
            }
        }else{ //mode off: watch 만 true 면 됨 (코드 나중에 정리)
            if(props.watch === 'true'  ){  //mode off, running -> true
                interval = setInterval(()=>{
                    setTime(prevTime => prevTime+10)
                },10)
            } else { //mode off , running -> false
                clearInterval(interval);
            }

        }

        return () => clearInterval(interval);
    },)

    
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
   // fullChange();
    //setClick(!click);
    return (
            <button style = {buttonStyle} onClick={()=>{  sendWatchValue();  fullChange();}}>
                <span>{("0" + Math.floor((time/3600000)%24)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/60000)%60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}</span>
                {/* <span>{("0" + (time/10)%1000).slice(-2)}</span> */}
            </button>

    );
};

export default StopWatch;