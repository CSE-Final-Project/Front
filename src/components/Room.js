import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled, {css} from "styled-components";
import StopWatch from './StopWatch';
import axios from 'axios';

console.log("렌더링0"); 

let now_yes; //계속 NO HAND! 나오다가 HAND DETECT! 나온 시점
let now_no; //계속 HAND DETECT! 나오다가 NO HAND! 나온 시점
let studyTime =0;
let studyTime_total=0;
let num=0;
let yn_arr = [0,0];
let start =0;
let watch_test = true;
<<<<<<< Updated upstream
=======
let mode = false; 
var abortController = new AbortController();

>>>>>>> Stashed changes

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
    filter:  ${props => props.color==="false" ? 'brightness(1)' : 'brightness(1)'};  
`;
//'grayscale(100%)'
const StyledCanvas = styled.canvas`
    height: 40%;
    width: 50%;
`;

let videoColor; 
let detect;
let flag = [1,1];
let n = 0; 
var myID; 

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};


const Room = (props) => {
    const videolistRef = useRef(); 
    videolistRef.current = [];

    console.log("렌더링1 : Room");  

    const [peers, setPeers] = useState([]); //peers: 상태 바뀌면 재렌더링되는 value, setPeers: peers 변경 함수
    const socketRef = useRef(); //socket.io 통신용, 값 변화 감지, 재렌더링 x
    const userVideo = useRef(); //내 비디오 지정, 값 변화 감지, 재렌더링 x
    const peersRef = useRef([]); //타 피어리스트 지정, 값 변화 감지, 재렌더링 x
    const roomID = props.match.params.roomID; //props 통해서 roomID 가져오기 

    const canvasRef = useRef();
    const imageRef = useRef();


    const [result, setResult] = useState("");
    const [watch, setWatch] =useState('false');
    // setWatch(!watch);
    const getWatchValue = (text) => {
        setWatch(text);
    }    
         
    console.log("1>(Room)스탑워치 상태: ",watch);

    console.log("렌더링1의 peers:", peers);

    useEffect(() => { //호출 되면 실행? 
        {peers.map((peer, index) => {
            peer.on("stream", stream => { 
                videolistRef.current[index].srcObject = stream; 
                videolistRef.current[index].style.filter = 'brightness(0)'; //0325: 접속 비디오 기본 black 상태, 
        }) })}
        })//,[peers]); <-문제 생기면 추가

    useEffect(() => { //렌더링 될 때마다 실행, peers 값 변할 때마다 렌더링
<<<<<<< Updated upstream
        console.log("렌더링3:  useEffect 실행 -> 소켓 통신, 디텍션 "); 
        console.log("렌더링3: videolistRef.current[0] : ", videolistRef.current[0]);
        socketRef.current = io.connect("https://10.200.129.177:8000"); //현재 커넥트 정보 저장 
        console.log(socketRef.current) 
=======

        socketRef.current = io.connect("https://192.168.0.28:8000"); //현재 커넥트 정보 저장 
>>>>>>> Stashed changes
        
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
        .then(stream => {
            userVideo.current.srcObject = stream; // 내 비디오 추가
            socketRef.current.emit("join room", roomID); 
            socketRef.current.on("all users", users => { //"all users"  이벤트 듣고 있다가 실행, 첫 접속 시 본인 제외 다른 피어들 정보 받아옴
                const peers = []; //위에 peers와 구분됨 
                users.forEach(userID => { //타 피어 정보 받아와서 peer 객체로 peersRef, peers 에 저장
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({ //peerRef 업데이트 
                        peerID: userID,
                        peer
                    })
                    peers.push(peer);
                })
                setPeers(peers); //peers 업데이트 -> 재렌더링
            })


            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer
                })
                setPeers(users => [...users, peer]);
            });
            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });


            //5. video-state 이벤트
            socketRef.current.on("video-state", data => { //data: peer_tf, tf_state (<-반대로 바꿔주기만 하면 됨)

                if(data.peer_tf === myID){ //서버에서 broadcast로 emit 못함
                    console.log ("5. 내 tf 상태 emit") //필요없음, 지워야
                }else{
                    var index = peersRef.current.findIndex(i => i.peerID === data.peer_tf);
                    if(data.tf_state === 'false'){
                        videolistRef.current[index].style.filter = 'brightness(0)'
                        watch_test=false;
                    }else{
                        videolistRef.current[index].style.filter = 'brightness(1)' 
                        watch_test=true;
                    }
                }
            })
            
             socketRef.current.on("my peer id", myPeerID => {
                myID = myPeerID;
            })

            //6. disconncet 이벤트
            /*
                1. peersRef에서 삭제헤야 
                2. peers에서 삭제해야 (문제: peers에 socket.id 없음) 
                -> peersRef에서 인덱스 추출하고 peers에서는 해당 인덱스 삭제
                */
            socketRef.current.on("user-disconnected", disconnect_peer => {
                var idx = peersRef.current.findIndex(i => i.peerID === disconnect_peer); //peersRef에서 인덱스 추출
                peersRef.current.splice(idx,1); //peersRef에서 삭제 
                setPeers(peers.filter((value,index) => index !== idx)); //peers 삭제            
            })
        })
    },[]);

    useEffect(()=>{
        console.log("소켓 비교(시작)", myID); 
        const interval = setInterval(async () => {
<<<<<<< Updated upstream
            console.log('[interval 실행]');
            // const roomID = props.match.params.roomID;
            // console.log('roomID:',roomID);

=======
>>>>>>> Stashed changes
            captureImageFromCamera();

            if (imageRef.current) {
                const formData = new FormData();
                formData.append('image', imageRef.current);
<<<<<<< Updated upstream

                const response = await fetch('https://10.200.129.177:5000/image', { 
                method: "POST",
                body: formData,
                }).then().catch(err => console.log(err));

                console.log("0. 디텍트 실행");

                if (response.status === 200) {
                

                    const text = await response.text();
                    detect = JSON.parse(text); 
                    videoColor = detect.result; 
                    console.log('2>(Room)실제 detect: ',detect.result);
                    setResult(detect.result);
                    console.log("3>(Room)useEffect안의 스탑워치: ",watch);

                    if(watch === 'false'){
                        detect.result = 'false';
                        console.log('4>(Room)detect 변경: ',detect.result);
                    }

                    console.log('5>(Room)두번째 detect: ',detect.result);

                    if(detect.result === 'true'){

                        num++;
                        yn_arr[num%2]=0;

                        if((yn_arr[0]+yn_arr[1])%2!=0 | start == 0){
                            now_yes=new Date();
                            console.log('NOW_YES: ',now_yes.getTime());                 
                        }
                        start++;
                

                    }else if(detect.result === 'false'){

                        num++;
                        yn_arr[num%2]=1;

                        if((yn_arr[0]+yn_arr[1])%2!=0){
                            now_no=new Date();
                            console.log('NOW_NO(2): ',now_no.getTime());
                            console.log('NOW_YES(2): ',now_yes.getTime());    
                            studyTime=now_no.getTime()-now_yes.getTime();
                            console.log('[studyTime(sec)] : '+studyTime/1000); 
                            studyTime_total+=studyTime;
                            console.log('[studyTime_Total]: ',studyTime_total/1000);              
                        }

=======

                var response; 
                if(mode) { //자동 측정 on 모드
                    response = await fetch('https://192.168.0.28:5000/image', { //https://223.131.223.239:5000/image
                    method: "POST",
                    body: formData,
                    signal: abortController.signal, //0325
                    }).then().catch(err => console.log(err)); 
                    
                    //!로 status가 있는지부터 확인해야할듯 (abort 하는 것 때문에) 0505 , Uncaught (in promise) 
                    //TypeError: Cannot read properties of undefined (reading 'status')
                    if (response.status === 200) { 

                        const text = await response.text();
                        detect = JSON.parse(text); 
                        videoColor = detect.result; 
                        setResult(detect.result);

                        if(detect.result === 'true'){
                            num++;
                            yn_arr[num%2]=0;
                            if((yn_arr[0]+yn_arr[1])%2!=0 | start == 0){
                                timeStart();                 
                            }
                            start++;
                        }else if(detect.result === 'false'){
                            num++;
                            yn_arr[num%2]=1;
                            if((yn_arr[0]+yn_arr[1])%2!=0){
                                timeEnd();              
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
                        console.log("Error from API."); 
>>>>>>> Stashed changes
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
                        console.log('false-event 발생: 내아이디 -> ', myID , '  룸 아이디-> ', roomID, ' 보낸 tf 값-> ' , detect.result); 
                        console.log('false-event 발생 시 peers: ', peers);
                    }
                    console.log("3. 보냄: " + text);

                } else {
                    console.log("Error from API."); 
                }
            }
        },5000);
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
            if(response.data.code==="200"){
                window.location.replace('/');
            }
        }catch(e){
            console.log(e);
        }
    }

    const enterHome = () =>{
<<<<<<< Updated upstream
        if((yn_arr[0]+yn_arr[1])==0){
            now_no=new Date();
            studyTime=now_no.getTime()-now_yes.getTime();
            studyTime_total+=studyTime;
            console.log('YES상태에서 나가기 누름');
=======
        if( ((yn_arr[0]+yn_arr[1])==0 && studyTime_total>0) || (!mode && watch==='true')){ //mode on, off 둘 다 watch 기준으로 수정
            timeEnd();
>>>>>>> Stashed changes
        }
    
        fetchStudyTime();
<<<<<<< Updated upstream
        props.history.push('/');
        // window.location.replace('/');
=======
        //수정
        props.history.push('/studies/my');
        var location = window.location;
        location.reload();
        //window.location.replace('/');
    }

    let modecount = 0;

    const timeStart = () => {
        now_yes=new Date();
    }

    const timeEnd = () => {
                now_no=new Date();   
                studyTime=now_no.getTime()-now_yes.getTime();
                console.log('@@@@@[studyTime(sec)] : '+studyTime/1000); 
                studyTime_total+=studyTime;
                console.log('@@@@@[studyTime_Total]: ',studyTime_total/1000); 
    }

    const modeClick = () =>{ //false : 자동모드 off , true: 자동모드 on
        //스탑워치가 작동 중이었다면, 스탑워치 멈출 때 시간 갱신 
        const socket=socketRef.current;
        console.log("소켓비교 (modeClick): " , socket.id); 
        console.log("소켓 비교(modeCilck)", myID); 
        if(mode && watch === 'true' && detect.result === 'true'){ //mode on -> off 클릭일 때
                num=0; //시간 측정 flag 초기화
                yn_arr = [0,0]; 
                flag = [1,1]; //socket-event flag 초기화
                n = 0;  
                timeEnd(); 
        }else if(!mode && watch === 'true'){ //mode off -> on 클릭일 때
                //num=0;
                //yn_arr = [0,0]; //flag 초기화 
                timeEnd();
                timeStart(); //off 측정 중인 상태에서 on으로 갈 때 필요
        }

        setClick(!click)
        mode = !mode;      //true인 경우 : fetch x

        //watch false로 바꾸기
       if(!mode){ //off 모드면 
        abortController.abort(); //0325
        getWatchValue('false'); 
        videoColor = 'false'
        console.log("소켓 확인(props.roomID): ", props.roomID); 
        console.log("소켓 확인(props.myID): ", props.myID); 
        console.log("소켓 확인(roomID): ", roomID); 
        console.log("소켓 확인(myID): ", myID); 
        socket.emit('false-event', { peer_tf: myID, dst_room: roomID, tf_state: 'false'}) //0325: 처음 상태 black
    }else{ //on 모드
            console.log("controller.signal.aborted: ", abortController.signal.aborted);
            console.log("controller.signal: ", abortController.signal);
            abortController = new AbortController(); //처음에 쓰던 abortContoller는 signal false 이므로 새로 생성
            setClick(true) // !click
           // getWatchValue('true'); //0401 삭제
            n++; 
            flag[n%2] = 0;
            videoColor = 'false'
            socket.emit('false-event', { peer_tf: myID, dst_room: roomID, tf_state: 'false'}) //0325: 처음 상태 black
            
        }
        //socket.emit : off -> stopwatch.js 에서, on -> Room.js에서 수행
>>>>>>> Stashed changes
    }

    const videodivStyle = {
        position: 'relative', 
        height: '45%', 
        //width + margin = 50%
        width: '47%', 
        margin: '0.3%', 
        border: '2pt solid black',
        backgroundColor: 'black'
    }

    const peervideoStyle = {
        height: '100%' ,
        width: '100%', 
        filter: 'brightness(1)',
        objectFit: 'cover'
    }

    const outbuttonStyle = {
        position: 'absolute', 
        left: '0px', 
        top: '0px',
        fontSize: '1rem',
        color: 'white',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
    }

    return (
           <Container>
            <div style = {videodivStyle}>
                <StyledVideo  color={videoColor} muted ref={userVideo} autoPlay playsInline > 
                <StyledCanvas ref={canvasRef} hidden></StyledCanvas>
                </StyledVideo> 
                <StopWatch myID={myID} roomID={roomID} socket={socketRef.current} detect={result} watch={watch} getWatchValue={getWatchValue} />
                <button style={outbuttonStyle} onClick={()=>{enterHome()}}>나가기</button>
            </div>
                {peers.map((peer, index) => {
                    return(
                        <div style = {videodivStyle} >
                        <video  key={index} peer={peer} style={peervideoStyle} playsInline autoPlay ref={ ref => {videolistRef.current[index] = ref} }></video>
                        </div>
                        )
                })}
            </Container>
    );
};

export default Room;