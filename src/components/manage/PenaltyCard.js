import React from 'react';
import {Card} from 'react-bootstrap';

const PenaltyCard = (props) => {
    const penalty = props.penalty;
    return (
        <div>
            <br/>
            <Card>
                <Card.Header>{penalty.user_id}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        {penalty.total_penalty}원{' '}
                    </p>
                    
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PenaltyCard;