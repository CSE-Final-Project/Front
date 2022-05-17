import React, { useEffect,useState} from 'react';
import styled from "styled-components";
import axios from 'axios';
import useForm from './useForm_studyCreate';
import {Form,Button} from 'react-bootstrap';

const Container = styled.div`
  margin-top: 10px;
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

// const Button = styled.div`
//   font-size: 18px;
//   font-weight: 700;
//   line-height: 49px;
//   display: block;
//   width: 100%;
//   height: 49px;
//   margin: 16px 0 7px;
//   cursor: pointer;
//   text-align: center;
//   color: #fff;
//   border: none;
//   border-radius: 0;
//   background-color: #ff8c00;
//   ${({ disabled }) =>
//     disabled &&
//     `
//     background-color: #efefef;
//   `}
// `;

const StudyCreate = (props) => {
    const URL = '/api/studies';

    const {inputs,submitting,handleChange,handleSubmit} = useForm({
      initialValues: {study_id: "",title:"",topic:"",target_time:"",penalty:"",info:""},
      onSubmit: (inputs) => {
        // alert(JSON.stringify(inputs,null,2));
  
        const fetchData = async()=>{
          try{
            // const response = await axios.post(URL,JSON.stringify(inputs));
            const response = await axios.post(URL,inputs);
            console.log(response.data.result);
            if(response.data.code === "200"){
              console.log('study_id:',inputs.study_id);
              // sessionStorage.setItem('user',inputs.id);
              alert('스터디가 생성되었습니다.');
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
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" >
            <Form.Label>study_id</Form.Label>
            <Form.Control 
            name="study_id" 
            value = {inputs.study_id}
            onChange={handleChange}
            placeholder="study_id를 입력해주세요"  />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>title</Form.Label>
            <Form.Control 
            name="title" 
            value = {inputs.title} 
            onChange={handleChange}
            placeholder="title을 입력해주세요" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>topic</Form.Label>
            <Form.Control name="topic" 
            value = {inputs.topic}
            onChange={handleChange}
            placeholder="topic을 입력해주세요"  />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>target_time</Form.Label>
            <Form.Control name="target_time" 
            value = {inputs.target_time}
            onChange={handleChange}
            placeholder="target_time을 입력해주세요"  />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>penalty</Form.Label>
            <Form.Control name="penalty" 
            value = {inputs.penalty}
            onChange={handleChange}
            placeholder="penalty를 입력해주세요"  />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>info</Form.Label>
            <Form.Control name="info"
            value = {inputs.info}
            onChange={handleChange}
            placeholder="info를 입력해주세요" />
          </Form.Group>

          <div className="d-grid gap-2">
          <Button variant="warning" size="lg" type ="submit" disabled={submitting}>
            Submit
          </Button>
          </div>
          
        </Form>
      </Container>
      </>
    );
};

export default StudyCreate;