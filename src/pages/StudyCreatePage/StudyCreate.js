import React, { useEffect,useState} from 'react';
import styled from "styled-components";
import axios from 'axios';
import useForm from './useForm_studyCreate';

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #ff8c00;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

const StudyCreate = (props) => {
    const URL = '/api/studies';

    const {inputs,submitting,handleChange,handleSubmit} = useForm({
      initialValues: {study_id: "",title:"",topic:"",target_time:"",penalty:"",info:""},
      onSubmit: (inputs) => {
        alert(JSON.stringify(inputs,null,2));
  
        const fetchData = async()=>{
          try{
            const response = await axios.post(URL,JSON.stringify(inputs));
            console.log(response.data.result);
            if(response.data.result === "success"){
              console.log('study_id:',inputs.study_id);
              // sessionStorage.setItem('user',inputs.id);
              window.location.replace('/');
            }
          }
          catch(e){
            console.log(e);
          }
        }
        fetchData();
      }
    });
  
      
    return (
      <>
      
      <Container>
        <form onSubmit={handleSubmit}>        
          <Input  
            name="study_id" 
            value = {inputs.study_id}
            onChange={handleChange}
            placeholder="study_id를 입력해주세요" 
          />
          <Input  
            name="title" 
            value = {inputs.title}
            onChange={handleChange}
            placeholder="title을 입력해주세요" 
          />
          <Input  
            name="topic" 
            value = {inputs.topic}
            onChange={handleChange}
            placeholder="topic을 입력해주세요" 
          />
          <Input  
            name="target_time" 
            value = {inputs.target_time}
            onChange={handleChange}
            placeholder="target_time을 입력해주세요" 
          />
          <Input  
            name="penalty" 
            value = {inputs.penalty}
            onChange={handleChange}
            placeholder="penalty를 입력해주세요" 
          />
          <Input
            name="info"
            value = {inputs.info}
            onChange={handleChange}
            placeholder="info를 입력해주세요"
          />
          <button type ="submit" disabled={submitting}>스터디 생성하기</button>        
        </form>
      </Container>
      </>
    );
};

export default StudyCreate;