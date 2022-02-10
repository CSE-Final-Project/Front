import React from "react";
import { v1 as uuid } from "uuid";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/Enter.css';
import { connect } from "react-redux";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

	function studyCreate(){
		props.history.push(`/studyCreate`);
	}

    return (
        <>
		<div className="container" >
			<div className="item_5">
				<div>
					<button type='button' className="button_style" onClick={studyCreate}>스터디 생성하기</button>	
				</div>
				<div>
					<button type='button' className="button_style" onClick={create}>방 새로 만들기</button>	
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/1">1번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/2">2번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/3">3번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="/cal/study">총 공부시간</Link>				
					</button>
				</div>	         
			</div>			
		</div>
	    </>
    );
};

// function test(state){
// 	return {
// 		state : state
// 	}
// }

// export default connect(test)(withRouter(CreateRoom));
export default withRouter(CreateRoom);