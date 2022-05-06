import React from 'react';
import { Nav } from 'react-bootstrap';

const Manage = (props) => {
    const studyID = props.match.params.studyID;
    console.log(studyID);


    return (
        <div>
            <br/>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="link-1">출석 체크</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">벌금 정산</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Manage;