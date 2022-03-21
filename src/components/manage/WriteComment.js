import axios from 'axios';
import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';

const WriteComment = () => {
    const studyID = window.location.href.split("/").reverse()[2];
    const postID = window.location.href.split("/").reverse()[1];
    console.log(studyID,'|',postID);

    const URL = '/api/studies/board/comment/write/'+studyID+'/'+postID;
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(URL,{
                comment: comment,
            })
            console.log(res.data.code);
            if(res.data.code === 200){
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
                <Button variant="primary" size="lg" type="submit">
                    +
                    
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default WriteComment;