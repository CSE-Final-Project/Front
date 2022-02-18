import React from 'react';
import {Card} from 'react-bootstrap';

const TimeRecordCard = (props) => {
    const timeInfo = props.timeInfo;
    return (
        <div>
            <br/>
            <Card>
                <Card.Header>{timeInfo.user_id}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        {timeInfo.total_time}시간{' '}
                    </p>
                    
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TimeRecordCard;