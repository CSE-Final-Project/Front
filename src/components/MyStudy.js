import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';

const MyStudy = (props) => {
    const mystudy = props.mystudy;
    const mystudy_id = mystudy.id;

    const URL_room = '/api/studies/do/'+mystudy_id;
    const URL_recruit = '/api/studies/completed/'+mystudy_id;
    const URL_delete = '/api/studies/setting/'+mystudy_id;

    const fetchRoom = async () => {
        try{
            const response = await axios.get(URL_room);
            console.log(response.data);
            if(response.data.code==="200"){
                props.history.push('/room/'+response.data.addr);
            }
        }catch(e){
            console.log(e);
        }
    }

    const enterManage = () =>{
        props.history.push({ //import {useHistory} from "react-router";
            pathname: '/manage/'+ mystudy_id,
            state: {studyTitle: mystudy.title, startDate: mystudy.date_start}
          });
    }

    const recruited = async () => {
        console.log('모집완료');
        try{
            const response = await axios.get(URL_recruit);
            console.log(response.data);
            if(response.data.code==="200"){
                console.log('모집완료 확인');
            }
        }catch(e){
            console.log(e);
        }
    }

    const deleteStudy = async () => {
        console.log('스터디 삭제');
        try{
            const response = await axios.delete(URL_delete);
            console.log(response.data);
            if(response.data.code === 200 ){
                console.log('삭제 확인');
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <br/>
            <Card>
                <Card.Header>{mystudy.topic}</Card.Header>
                <Card.Body>
                    <Card.Title>{mystudy.title}</Card.Title>
                    <Card.Text>
                        목표 시간: {mystudy.target_time} <br/>
                        멤버 수: {mystudy.member_number} <br/>
                        하루 벌금: {mystudy.penalty} <br/>
                        스터디 정보: {mystudy.info} <br/>
                        방장이름: {mystudy.leader} <br/>
                        스터디 아이디: {mystudy.id} <br/>
                    </Card.Text>
                    <Button size="sm" onClick={() => {fetchRoom()}}>공부 시작</Button>
                    &nbsp;
                    <Button size="sm" onClick={() => {enterManage()}}>관리</Button>
                    &nbsp; 
                    {
                        (localStorage.getItem('user')===mystudy.leader)?
                        <>
                            <Button size="sm" variant="warning" onClick={() => {recruited()}}>모집 완료</Button>&nbsp;
                            <Button size="sm" variant="warning" onClick={() => {deleteStudy()}}>삭제</Button>
                        </>
                        :
                        null
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default withRouter(MyStudy);