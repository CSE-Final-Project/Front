import React from 'react';

const PenaltyCard = (props) => {
    const penalty = props.penalty;
    return (
        <div>
            아이디: {penalty.user_id} <br/>
            벌금: {penalty.total_penalty}
            <hr/>
        </div>
    );
};

export default PenaltyCard;