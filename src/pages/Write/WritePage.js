import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import useForm from './useForm';
import axios from 'axios';
import {Form,Button} from 'react-bootstrap';

const Container = styled.div`
  padding: 20px;
`;
const WritePage = (props) => {
    axios.defaults.withCredentials = true;
    const studyID = props.match.params.studyID
    console.log(props.match.params.studyID)
    const URL = 'https://nudo-study.cf/api/studies/'+studyID+'/board';
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(URL,{
                title: title,
                content: content,
            })
            console.log(res.data.code)
            if(res.data.code==="200"){
                alert('글쓰기 완료');
                window.history.back();
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control 
                        type = "text"
                        value = {title}
                        placeholder="제목을 입력해주세요"
                        onChange = {(e)=>setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>내용</Form.Label>
                    <Form.Control 
                        as="textarea" rows={5}
                        type = "text"
                        value= {content}
                        placeholder="내용을 입력해주세요"
                        onChange = {(e)=>setContent(e.target.value)} />
                </Form.Group>
                <br/>
                <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                    Submit
                </Button>
                </div>
            </Form>
        </Container>
    );
};

export default WritePage;