import React, { useEffect, useState } from 'react';
import { Nav, TabContent } from 'react-bootstrap';
import Attendance from '../components/manage/Attendance';
import Penalty from '../components/manage/Penalty';

const ManagePage = (props) => {
    const studyID = props.match.params.studyID;
    // console.log(studyID);
    let [tab, setTab] = useState(1);


    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/home">
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