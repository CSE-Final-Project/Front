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
        console.log("렌더링2:  useEffect 실행 -> 피어 비디오 on/off 용");
        console.log("렌더링2: videolistRef.current[0] stream 정의 전: ", videolistRef.current[0]);
        {peers.map((peer, index) => {
            peer.on("stream", stream => { 
                videolistRef.current[index].srcObject = stream; 
        }) })}
        console.log("렌더링2: videolistRef.current[0] stream 정의 후: ", videolistRef.current[0]);
    })//,[peers]); <-문제 생기면 추가

    useEffect(() => { //렌더링 될 때마다 실행, peers 값 변할 때마다 렌더링
        console.log("렌더링3:  useEffect 실행 -> 소켓 통신, 디텍션 "); 
        console.log("렌더링3: videolistRef.current[0] : ", videolistRef.current[0]);
        socketRef.current = io.connect("https://172.30.53.214:8000"); //현재 커넥트 정보 저장 
        console.log(socketRef.current) 
        
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
        .then(stream => {
            userVideo.current.srcObject = stream; // 내 비디오 추가
            socketRef.current.emit("join room", roomID); 
            socketRef.current.on("all users", users => { //"all users"  이벤트 듣고 있다가 실행, 첫 접속 시 본인 제외 다른 피어들 정보 받아옴
                console.log("all users 이벤트")
                const peers = []; //위에 peers와 구분됨 
                users.forEach(userID => { //타 피어 정보 받아와서 peer 객체로 peersRef, peers 에 저장
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    console.log("socketRef.current.id: ", socketRef.current.id);
                    console.log(JSON.stringify(peer.userID)); 
                    peersRef.current.push({ //peerRef 업데이트 
                        peerID: userID,
                        peer
                    })
                    peers.push(peer);
                    
                    console.log("추가된 peers:", peers);
                    console.log("peers[0]: " , peers[0]); 
             
                    // console.log(JSON.stringify(peers)); 
                    console.log(JSON.stringify(peersRef.current)); 
                })
                setPeers(peers); //peers 업데이트 -> 재렌더링
                 
                console.log("peer목록 업데이트 후: " ,peers);  //첫 접속자는 null, forEach  실행 안함
                // console.log(JSON.stringify(peersRef.current)); 
            })


            socketRef.current.on("user joined", payload => {
                console.log("user joined 이벤트")
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer
                })
                setPeers(users => [...users, peer]);
                console.log("user join 이후 peers: " ,peers);
            });

            socketRef.current.on("receiving returned signal", payload => {
                console.log("receiving returned signal 이벤트")
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });


            //5. video-state 이벤트
            socketRef.current.on("video-state", data => { //data: peer_tf, tf_state (<-반대로 바꿔주기만 하면 됨)

                if(data.peer_tf === myID){ //서버에서 broadcast로 emit 못함
                    console.log ("5. 내 tf 상태 emit") //필요없음, 지워야
                }else{
                    console.log("5. video state 이벤트 실행"); 
                    console.log("5. video state 변수: 1. " , data.peer_tf, " 2. ", data.tf_state); 
                    console.log("5. 현재 peer:", peers); 
                    console.log("5. 현재 peersRef: ", peersRef.current)
                    var index = peersRef.current.findIndex(i => i.peerID === data.peer_tf);
                    console.log("5. index->", index); 
                    console.log("5. videolistRef.current[index] : ", videolistRef.current[index]);
                    if(data.tf_state === 'false'){
                        console.log("5. 블랙 비디오 스타일 설정")
                        videolistRef.current[index].style.filter = 'brightness(0)'

                        watch_test=false;
                        console.log('watch_test: ',watch_test);
                    }else{
                        console.log("5. 비디오 스타일 None")
                        videolistRef.current[index].style.filter = 'brightness(1)' 

                        watch_test=true;
                        console.log('watch_test: ',watch_test);
                    }
                }
            })
            
             socketRef.current.on("my peer id", myPeerID => {
                myID = myPeerID;
                console.log("my peer id 이벤트 성공", myID);
            })

            //6. disconncet 이벤트
            /*
                1. peersRef에서 삭제헤야 
                2. peers에서 삭제해야 (문제: peers에 socket.id 없음) 
                -> peersRef에서 인덱스 추출하고 peers에서는 해당 인덱스 삭제
                */
            socketRef.current.on("user-disconnected", disconnect_peer => {
                console.log("6. user-disconnected 이벤트 발생, 나가는 peer:" , disconnect_peer); 
                console.log("6. disconnected peersRef 추출 전: ", peersRef); 
                var idx = peersRef.current.findIndex(i => i.peerID === disconnect_peer); //peersRef에서 인덱스 추출
                peersRef.current.splice(idx,1); //peersRef에서 삭제
                console.log("6. disconnected peersRef 추출 후: ", peersRef); 
                console.log("6. disconnected peers 변경 전: ", peers); 
                setPeers(peers.filter((value,index) => index !== idx)); //peers 삭제
                console.log("6. disconnected peers 변경 후: ", peers);
            
            })
        })
    },[]);

    useEffect(()=>{
        const interval = setInterval(async () => {
            console.log('[interval 실행]');
            // const roomID = props.match.params.roomID;
            // console.log('roomID:',roomID);

            captureImageFromCamera();

            if (imageRef.current) {
                const formData = new FormData();
                formData.append('image', imageRef.current);

                const response = await fetch('https://172.30.53.214:5000/image', { 
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
            console.log("signal 이벤트 - sending")
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
            console.log("signal 이벤트 -returning")
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
            console.log('roomID:',roomID);
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
        if((yn_arr[0]+yn_arr[1])==0){
            now_no=new Date();
            studyTime=now_no.getTime()-now_yes.getTime();
            studyTime_total+=studyTime;
            console.log('YES상태에서 나가기 누름');
        }
    
        console.log('최종 공부시간(초):',studyTime_total/1000);
        fetchStudyTime();
        props.history.push('/');
        // window.location.replace('/');
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
        fontSize: '0.7rem',
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