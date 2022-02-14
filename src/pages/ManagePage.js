import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Attendance from '../components/manage/Attendance';
import Penalty from '../components/manage/Penalty';

const ManagePage = (props) => {
    const studyID = props.match.params.studyID;
    console.log(studyID);
    let [tab, setTab] = useState(1);

    const title = props.location.state.studyTitle; 

    const titleStyle = {
        position: 'relative',
        height: '60px',
        borderBottom: '1px solid #a7a7a7',
        borderTop: '1px solid #a7a7a7',
        textAlign: 'left',
        lineHeight: '60px'
    }

    const titleTextStyle = {
        marginLeft: '5%'
    }


    return (
        <div>
            <div style={titleStyle}>
                <p style = {titleTextStyle}>{title}</p>
            </div>
            <Nav variant="tabs" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{setTab(1)}}>출석 체크</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{setTab(2)}}>벌금 정산</Nav.Link>
                </Nav.Item>
            </Nav>
            {
                (tab===1)?
                <Attendance studyID={studyID}/>
                :
                <Penalty studyID={studyID}/>
            }
        </div>
    );
};


export default ManagePage;