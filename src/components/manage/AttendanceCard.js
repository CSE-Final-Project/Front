import React ,{useState} from 'react';

const AttendanceCard = (props) => {
    const atten = props.atten;
    let check = '';

    if(atten.attendance === true){
        check = 'O';
    }else{
        check = 'X';
    }

    return (
        <div>
            아이디: {atten.user_id} <br/>
            날짜: {atten.date} <br/>
            출결: {check}
            <hr/>
        </div>
    );
};

export default AttendanceCard;