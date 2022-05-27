import axios from 'axios';
import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';

const WriteComment = () => {
    axios.defaults.withCredentials = true;
    const studyID = window.location.href.split("/").reverse()[2];
    const postID = window.location.href.split("/").reverse()[1];
    console.log(studyID,'|',postID);

    //게시글 댓글 작성 /api/studeis/{:studyId}/board/{:idx}/comment [POST]
    // const URL = '/api/studies/board/comment/write/'+studyID+'/'+postID;
    const URL = 'https://nudo-study.cf/api/studies/'+studyID+'/board/'+postID+'/comment';
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(URL,{
                content: comment,
            })
            console.log(res.data.code);
            if(res.data.code === "200"){
                alert("댓글 입력");
                window.location.reload();

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control 
                        as="textarea" rows={3}
                        type = "text"
                        value= {comment}
                        placeholder="댓글을 입력해주세요"
                        onChange = {(e)=>setComment(e.target.value)} />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="warning" size="lg" type="submit">
                    +
                    
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default WriteComment;