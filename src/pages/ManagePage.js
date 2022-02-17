import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Attendance from '../components/manage/Attendance';
import Penalty from '../components/manage/Penalty';
import TimeRecord from '../components/manage/TimeRecord';

const ManagePage = (props) => {
    const studyID = props.match.params.studyID;
    // console.log(studyID);
    let [tab, setTab] = useState(1); //let -> const

    const title = props.location.state.studyTitle; 
    const startdate = props.location.state.startDate; 

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
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={()=>{setTab(3)}}>공부 시간</Nav.Link>
                </Nav.Item>
            </Nav>
            {(() => {
                switch (tab) {
                    case 1: return <Attendance studyID={studyID} startdate={startdate}/>;
                    case 2: return <Penalty studyID={studyID} startdate={startdate}/>;
                    case 3: return <TimeRecord studyID={studyID} startdate={startdate}/>
                    default: return <Attendance studyID={studyID} startdate={startdate}/>
                }
            })()}
        </div>
    );
};


export default ManagePage;