import React, { useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled, {css} from "styled-components";
import StopWatch from './StopWatch';
import SimpleStopWatch from './SimpleStopWatch';
import axios from 'axios';
import "../css/ModeToggle.css";
import "../css/Room.css";
import text from "./text.png"; 

console.log(new Date());
console.log(Date.now());

let now_yes; //계속 NO HAND! 나오다가 HAND DETECT! 나온 시점
let now_no; //계속 HAND DETECT! 나오다가 NO HAND! 나온 시점
let studyTime =0;
let studyTime_total=0;
let num=0;
let yn_arr = [1,1]; //0505 [0,0] -> [1,1]로 변경 (false가 기본값이므로)
let start =0;
let watch_test = true;
let mode = false;
var abortController = new AbortController();
var disconnect_idx; 
var disconnect_flag = false; 

/*
const peervideoStyle = {
    height: '100%' ,
    width: '100%', 
    filter: 'brightness(1)',
    //objectFit: 'cover'
} */

const videodivStyle = {
    position: 'relative', 
    height: '45%', 
    //width + margin = 50%
    width: '47%', 
    margin: '0.3%', 
    border: '2pt solid black',
    backgroundColor: 'black'
}

const imagedivStyle = {
    position: 'relative', 
    height: '45%', 
    //width + margin = 50%
    width: '47%', 
    margin: '0.3%', 
    border: '2pt solid black',
    backgroundColor: 'black'
}


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 100%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100%;
    filter:  ${props => props.color==="false" ? 'grayscale(100%)' : 'brightness(1)'}; 
`;

const VacantImage = styled.div`
    position: absolute;
    height: 100%; 
    width: 100%;
    visibility: ${props => props.state===false ? 'visible' : 'hidden'};
    `;


const PeerVideo = styled.video`
    position: absolute;
    height: 100%;
    width: 100%;
    filter: brightness(1);
    objectFit: cover;
    visibility: ${props => props.state===false ? 'hidden' : 'visible'};
    `;


const StyledCanvas = styled.canvas`
    height: 40%;
    width: 50%;
`;

let videoColor = 'false'; 
let detect;
let flag = [1,1];
let n = 0; 
var myID; 

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};


const imageStyle = {
    position: 'absolute', 
    height: '100%', 
    //width + margin = 50%
    width: '100%', 
} 

const Video = (props) => {
    const ref = useRef();
    var state = props.state;

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
// style= {peervideoStyle} 
    return (
        <div style = {videodivStyle} >
        <PeerVideo playsInline autoPlay  ref={ref} state = {state} />
        <img src={text} className="imageStyle" style = { state ? {display: 'none'}  : {visibility : 'visible'}  } />
        </div>
    );
};


const Room = (props) => {
    console.log("---------------------------재실행----------")
    const videolistRef = useRef(); 
    videolistRef.current = [];


    const [peers, setPeers] = useState([]); //peers: 상태 바뀌면 재렌더링되는 value, setPeers: peers 변경 함수
    const socketRef = useRef(); //socket.io 통신용, 값 변화 감지, 재렌더링 x
    const userVideo = useRef(); //내 비디오 지정, 값 변화 감지, 재렌더링 x
    const peersRef = useRef([]); //타 피어리스트 지정, 값 변화 감지, 재렌더링 x
    const roomID = props.match.params.roomID; //props 통해서 roomID 가져오기 

    const canvasRef = useRef();
    const imageRef = useRef();


    const [result, setResult] = useState("");
    const [watch, setWatch] =useState('false');
    const [click, setClick] = useState(false);

    // setWatch(!watch);
    const getWatchValue = (text) => {
        setWatch(text);
    }
    
    const getClickValue = (text) => {
        setClick(text);
    }

    const getVideoColorValue = (text) => {
        videoColor=text; 
    }

    function getPeerlist(){
        console.log("function getPeerlist: ", peers);
        console.log("function getPeerRef: ", peersRef);
    }

    getPeerlist(); 


    useEffect(() => { //렌더링 될 때마다 실행, peers 값 변할 때마다 렌더링


        socketRef.current = io.connect("https://10.200.31.199:8000"); //현재 커넥트 정보 저장  
        console.log("내 peer id: ", socketRef.current); 
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
        .then(stream => {
            userVideo.current.srcObject = stream; // 내 비디오 추가

            socketRef.current.emit("join room", roomID); 

            socketRef.current.on("all users", users => { //"all users"  이벤트 듣고 있다가 실행, 첫 접속 시 본인 제외 다른 피어들 정보 받아옴
                console.log("@all users");
                const peers = []; 
                users.forEach(userID => { //타 피어 정보 받아와서 peer 객체로 peersRef, peers 에 저장
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({ //peerRef 업데이트 
                        peerID: userID,
                        peer,
                        videoState: false
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                        videoState: false
                    });
                })
                setPeers(peers); //peers 업데이트 -> 재렌더링
                console.log("0-2. peers: ", peers);
            })

            socketRef.current.on("user joined", payload => {
                console.log("@user joined");
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                    videoState: false
                })
                
                const peerObj = {
                    peerID: payload.callerID,
                    peer,
                    videoState: false
                }
                setPeers(users => [...users, peerObj]);

                //상태 emit
                var state; 
                if(mode){ //mode on
                    if(props.detect === 'false') state = false; 
                    else state = true; 
                }else{ //mode off
                    if(watch ==='false') state = false;
                    else state = true; 
                }
                //console.log("@give-videostate emit")
               // socketRef.current.emit('give-videostate', { giver: myID, peerID: payload.callerID, tf_state: state});
            });

            socketRef.current.on("receiving returned signal", payload => {
                console.log("@receiving returned signal");
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
                socketRef.current.emit('call-videostate1', {peerID: myID, dst_room: roomID});
            });

            socketRef.current.on("call-videostate2", data => { 
                console.log("@call-videostate2");
                 //상태 emit
                 var state; 
                 if(mode){ //mode on
                     if(props.detect === 'false') state = false; 
                     else state = true; 
                 }else{ //mode off
                    console.log("@call-videostate2 videoColor: ", videoColor); 
                     if(videoColor ==='false') state = false;
                     else state = true; 
                 }
                socketRef.current.emit('receive-videostate1', {peerID: data.peerID, giver: myID, tf_state: state});
            });

            socketRef.current.on("receive-videostate2", data => { 
                console.log("@receive-state2");
                var index = peersRef.current.findIndex(p => p.peerID === data.peerID);
                console.log("@receive-state data.peerID: ", data.peerID);
                console.log("@receive-state data.tf_state: ", typeof(data.tf_state));  
                console.log("@receive-state index: ", index); 
                if(data.tf_state){ //주의: boolean 타입
                    console.log("@receive2에서 true");
                    const uniquePeers = peersRef.current; 
                    uniquePeers[index].videoState = true; 
                    peersRef.current[index].videoState = true;
                    watch_test=true; //이거 왜 있음?
                    setPeers(uniquePeers);
                    setPeers(users => [...users]); //강제로 렌더링 
                    console.log("@receive2에서 setPEers");
                }
            });

            socketRef.current.on("video-state", data => { //data: peer_tf, tf_state (<-반대로 바꿔주기만 하면 됨)
                console.log("#video-state > data: ", data);
                if(data.peer_tf === myID){ //서버에서 broadcast로 emit 못함
                    console.log ("5. 내 tf 상태 emit") //필요없음, 지워야
                }else{
                    var index = peersRef.current.findIndex(i => i.peerID === data.peer_tf);
                    if(data.tf_state === 'false'){
                        const uniquePeers = peersRef.current; 
                        uniquePeers[index].videoState = false; 
                        peersRef.current[index].videoState = false;
                        watch_test=false;
                        setPeers(uniquePeers);
                        setPeers(users => [...users]); //강제로 렌더링 
                    }else{
                        const uniquePeers = peersRef.current;
                        uniquePeers[index].videoState = true; 
                        peersRef.current[index].videoState = true;
                        watch_test=true;
                        setPeers(uniquePeers);
                        setPeers(users => [...users]); //강제로 렌더링 
                    }
                }
            })
            
             socketRef.current.on("my peer id", myPeerID => {
                console.log("#my peer id");
                myID = myPeerID;
            })

            //6. disconncet 이벤트
            /*
                1. peersRef에서 삭제헤야 
                2. peers에서 삭제해야 (문제: peers에 socket.id 없음) 
                -> peersRef에서 인덱스 추출하고 peers에서는 해당 인덱스 삭제
                */
                socketRef.current.on("user-disconnected", id => {
                    const peerObj = peersRef.current.find(p=>p.peerID === id);
                    if(peerObj){
                        peerObj.peer.destroy();
                    }
                    const peers = peersRef.current.filter(p=> p.peerID != id);
                    peersRef.current = peers;
        
                    const uniquePeers = peers.filter(p=> p.peerID != id); //수정: 이미 filter 처리 한거니까 그냥 peer만 넣기
                    setPeers(uniquePeers);
                })
            })

    },[]);


    useEffect(()=>{
        const interval = setInterval(async () => {
            captureImageFromCamera();

            if (imageRef.current && mode) {
                const formData = new FormData();
                formData.append('image', imageRef.current);

                var response; 
                if(mode) { //자동 측정 on 모드
                    response = await fetch('https://223.131.223.239:5000/image', { //https://223.131.223.239:5000/image
                    method: "POST",
                    body: formData,
                    signal: abortController.signal,
                    }).then().catch(err => console.log(err)); 
                   
                    if (response.status === 200) {

                        const text = await response.text();
                        detect = JSON.parse(text); 
                        videoColor = detect.result; 
                        setResult(detect.result);

                        if(detect.result === 'true'){
                            num++;
                            yn_arr[num%2]=0;
                            if(start == 0 | (yn_arr[0]+yn_arr[1])%2!=0){
                                timeStart(); //필요
                                setWatch('true');          
                            }
                            start++;
                        }else if(detect.result === 'false'){
                            num++;
                            yn_arr[num%2]=1;
                            if((yn_arr[0]+yn_arr[1])%2!=0){
                                timeEnd();     
                                setWatch('false'); //0516 추가         
                            }
                        }
                    
                        //위 코드랑 합치기 필요
                        if(detect.result === 'false'){
                            n++; 
                            flag[n%2] = 0;
                        }else{
                            n++; 
                            flag[n%2] = 1;
                        }
                        if((flag[0]+flag[1]) %2 != 0){
                            socketRef.current.emit('false-event', { peer_tf: myID, dst_room: roomID, tf_state: detect.result})// roomID 여기서 쓸 수 있나
                        }

                    } else {
                    }
                }
            } 
        },1000);
    return () => clearInterval(interval);
    }, [watch]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    const captureImageFromCamera = () => {
        const context = canvasRef.current.getContext('2d');
        const { videoWidth, videoHeight } = userVideo.current;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        context.drawImage(userVideo.current, 0, 0, videoWidth, videoHeight);

        canvasRef.current.toBlob((blob) => {
        imageRef.current = blob;
        })
    };

    const fetchStudyTime = async () => {
        try{
            const roomID = props.match.params.roomID;
            const response = await axios.patch('/api/studies/time/'+roomID,{study_time:studyTime_total/1000});
            console.log(response.data);
            if(response.data.code==="200"){
                window.location.replace('/');
            }
        }catch(e){
            console.log(e);
        }
    }

    const enterHome = () =>{
        //0516 mode && 추가, && studyTime_total>=0 삭제
        //console.log("")
        // ((mode && yn_arr[0]+yn_arr[1])==0) || (!mode && watch==='true') 0516 삭제, 수정
        if( watch==='true'){ //mode on, off 둘 다 watch 기준으로 수정
            console.log('#######################YES상태에서 나가기 누름'); //on mode의 측정 중, off mode의 측정 중 상황 모두 포함
            timeEnd();
        }
    
        console.log('최종 공부시간(초):',studyTime_total/1000);
        fetchStudyTime();
        //수정
        props.history.push('/studies/my');
        var location = window.location;
        location.reload();
        //window.location.replace('/');
    }

    

    let modecount = 0;

    const timeStart = () => {
        now_yes=new Date();
        console.log('@@@@@timeStart: NOW_YES: ',now_yes.getTime());
    }

    const timeEnd = () => {
                now_no=new Date(); //0505 수정
                studyTime=now_no.getTime()-now_yes.getTime(); 
                console.log('@@@@@timeend: [studyTime(sec)] : '+studyTime/1000); 
                studyTime_total+=studyTime;
                console.log('@@@@@timeEnd: [studyTime_Total]: ',studyTime_total/1000); 
    }

    const modeClick = () =>{ //false : 자동모드 off , true: 자동모드 on
        console.log("모드 바꿈");
        const socket=socketRef.current;

        //스탑워치가 작동 중이었다면, 스탑워치 멈출 때 시간 갱신
        console.log("watch 상태 (작동중 클릭이면 true, 끊고 클릭이면 false여야", watch)
        if(mode && watch === 'true' && detect.result === 'true'){ //mode on -> off 클릭일 때
                num=0; //시간 측정 flag 초기화
                yn_arr = [1,1]; //0516 수정 , [false,false] 
                flag = [0,0]; //0516 수정, [false,false]
               // yn_arr = [0,0]; 
                //flag = [1,1]; //socket-event flag 초기화
                n = 0;  
                timeEnd(); 
        }else if(!mode && watch === 'true'){ //mode off -> on 클릭일 때
                //num=0;
                //yn_arr = [0,0]; //flag 초기화 
                timeEnd();
                //timeStart(); //off 측정 중인 상태에서 on으로 갈 때 필요 //0505 삭제 (true, false인지도 모르는데 바로 시작하면 x)
        }

        setClick(!click) //0516 왜 있지
        mode = !mode;      //true인 경우 : fetch x
        //watch false로 바꾸기
       if(!mode){ //off 모드면 
        abortController.abort(); //0325
        getWatchValue('false'); 
        videoColor = 'false'
        socket.emit('false-event', { peer_tf: myID, dst_room: roomID, tf_state: 'false'}) //0325: 처음 상태 black 
    }else{ //on 모드
            abortController = new AbortController();
            setClick(false) //0516 true-> false로 수정
            getWatchValue('false'); //삭제 / 0516 다시 부활
           n++; 
           flag[n%2] = 0;
           videoColor = 'false'
           socket.emit('false-event', { peer_tf: myID, dst_room: roomID, tf_state: 'false'}) //0325: 처음 상태 black
        }
        //socket.emit : off -> stopwatch.js 에서, on -> Room.js에서 수행
    }

    const outbuttonStyle = {
        position: 'absolute', 
        left: '0px', 
        top: '0px',
        fontSize: '0.7rem',
        color: 'white',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
    }

    const ModeToggleStyle = {
        position: 'absolute', 
        left: '3px', 
        bottom: '0px',
        fontSize: '0.7rem',
    }

    return (
        
           <Container>
               {console.log("JSX")}
            <div style = {videodivStyle}>
                <StyledVideo  color={videoColor} muted ref={userVideo} autoPlay playsInline > 
                <StyledCanvas ref={canvasRef} hidden></StyledCanvas>
                </StyledVideo> 
               {/*} <StopWatch myID={myID} roomID={roomID} socket={socketRef.current} 
                detect={result} watch={watch} getWatchValue={getWatchValue} mode={mode}
                click={click} getClickValue={getClickValue}
                timeStart={timeStart} timeEnd={timeEnd}
    color={videoColor} getVideoColorValue={getVideoColorValue}/> */}
                <SimpleStopWatch myID={myID} roomID={roomID} socket={socketRef.current} 
                detect={result} watch={watch} getWatchValue={getWatchValue} mode={mode}
                click={click} getClickValue={getClickValue}
                timeStart={timeStart} timeEnd={timeEnd}
                color={videoColor} getVideoColorValue={getVideoColorValue}/>
                <button style={outbuttonStyle} onClick={()=>{enterHome()}}>나가기</button>
                <div className="toggle-switch" style={ModeToggleStyle} >
                    <input type="checkbox" id="chkTog" onClick={()=>{modeClick()}} />
                     <label htmlFor="chkTog">
                        <span className="toggle-track"></span>
                    </label>
                </div>
            </div>
                 {peers.map((peer, index) => {
                        return (
                            <Video key={peer.peerID} peer={peer.peer} idx = {index} state = {peer.videoState}/>
                        );
            })} 
               
            </Container>
    );
};

export default Room;