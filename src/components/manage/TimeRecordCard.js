import React from 'react';
import {Card} from 'react-bootstrap';

const TimeRecordCard = (props) => {
    const timeInfo = props.timeInfo;
    const h = parseInt(timeInfo.studytime/3600);
    const m = parseInt((timeInfo.studytime%3600)/60);
    const s = timeInfo.studytime%60;
    console.log('TimeRecordCard 전달 데이터:', timeInfo);
    return (
        <div>
            <br/>
            <Card>
                <Card.Header>{timeInfo.user_id}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        {h}시간{' '}{m}분{' '}{s}초{' '}
                    </p>
                    
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TimeRecordCard;