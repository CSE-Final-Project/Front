import React from 'react';
import { withRouter } from 'react-router';
import {createBrowserHistory} from 'history';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

//
const Ranking_font = styled.div`
    font-size: xx-large;
    font-weight: bold;
`;
//

const Date_font = styled.div`
    font-size: large;
    font-weight: bold;
    text-align: center; 
`;

const ContentBox = styled.div`
    display: flex;
    gap: 0.25rem;
    
    align-items: center;
    grid-area: content;
    justify-content: center;
`;
const Content1 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: left;
    width: 30%;
    height: 100%;
`;
const Content2 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: left;
    width: 50%;
    height: 100%;
    font-size: large;
`;
const Content3 = styled.div`
    padding: 0.25rem;
    // background: yellow;
    text-align: center;
    width: 100%;
    height: 100%;
`;

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
                 window.location.assign('/room/'+response.data.addr); //새로고침 
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
                window.location.replace('/studies/my');
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
                window.location.replace('/studies/my');
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <Card>
                <Card.Header>{mystudy.topic}</Card.Header>
                <Card.Body>
                    <Card.Title>{mystudy.title}</Card.Title>
                    
                    <Card.Text>
                    <ContentBox>
                        <Content1>방장</Content1>
                        <Content2>{mystudy.leader}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>
                    <ContentBox>
                        <Content1>목표 시간</Content1>
                        <Content2>{mystudy.target_time}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <ContentBox>
                        <Content1>하루 벌금</Content1>
                        <Content2>{mystudy.penalty}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <ContentBox>
                        <Content1>멤버 수</Content1>
                        <Content2>{mystudy.member_number}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>
                    <ContentBox>
                        <Content1>스터디 정보</Content1>
                        <Content2>{mystudy.info}</Content2>
                        <Content3></Content3>
                    </ContentBox>
                    <hr/>

                    {/* 목표 시간:  {mystudy.target_time} <br/>
                        멤버 수: {mystudy.member_number} <br/>
                        하루 벌금: {mystudy.penalty} <br/>
                        스터디 정보: {mystudy.info} <br/>
                        방장이름: {mystudy.leader} <br/>
                        스터디 아이디: {mystudy.id} <br/> */}
                    </Card.Text>
                   
                    {
                        (mystudy.is_recruit===false)?
                        <>
                            <Button size="sm" variant="dark" onClick={() => {fetchRoom()}}>공부 시작</Button>
                            &nbsp;
                            <Button size="sm" variant="dark" onClick={() => {enterManage()}}>관리</Button>
                            &nbsp; 
                        </>
                        :
                        null
                    }
                    {
                        (mystudy.is_recruit===true && localStorage.getItem('user')===mystudy.leader)?
                        <>
                            <Button size="sm" variant="warning" onClick={() => {recruited()}}>모집 완료</Button>&nbsp;
                        </>
                        :
                        null
                    }
                    {
                        (localStorage.getItem('user')===mystudy.leader)?
                        <>
                            <Button size="sm" variant="warning" onClick={() => {deleteStudy()}}>삭제</Button>
                        </>
                        :
                        null
                    }
                </Card.Body>
            </Card>
            <br/>
        </div>
    );
};

export default withRouter(MyStudy);