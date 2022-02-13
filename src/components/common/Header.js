import React, {useState} from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

import {NavLink} from 'react-router-dom'; //export default 아닌 모듈은 {} 중괄호 필수
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../css/Header.css';
import { FiX } from "react-icons/fi";

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
    height: 4rem;
    dispaly: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right{
        display: flex;
        align-items: center;
        float: right;
    }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
    height: 4rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

/* 옆 메뉴 */
const MenuSide = styled.div`
  display:  ${props => props.state ? 'flex' : 'none'}; 
  position: fixed; 
  flex-direction: column;
  top: 0; 
  left: 0;
  transition: 350ms;
  background-color: #ffffff;
  width: 40vw;
  height:100vh;
  border-right:1px solid #a7a7a7;
  @media screen and (max-width: 450px){
    width: 60vw;
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin-top: 10%;
`

const Header = ({user, onLogout}) => {
  const [isOpen, setMenu] = useState(false);
  const menus = [
    { title: "참여 중인 스터디" , path: "/studies/my"},  // 실제 주소 'api/' 제외
    { title: "스터디 목록", path: "/studies"}, 
  ]

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen); 
  }   

  return (
    <>
      <HeaderBlock>
        <Wrapper>
        <FontAwesomeIcon icon={faAlignJustify} onClick={()=> toggleMenu()}/>
        <MenuSide state = {isOpen}>
        <FiX className ='xButton' onClick={()=> toggleMenu()}/>
        <List> 
          {menus.map((menu, index) => {
              return (
                  <NavLink className="listStyle" exact style={{color: "black", textDecoration: "none"}}
                    to={menu.path}
                    key={index}
                    >
                  <p>{menu.title}</p>
                  </NavLink>
              )
          })}
        </List>
        </MenuSide>
          <Link to='/' className='logo' style={{paddingLeft : '70px'}}>STUDY.DO</Link>
          <div className='right'>
            {user ? (
                <div className='right'>
                <UserInfo>{user}</UserInfo>
                <Button onClick={onLogout}>로그아웃</Button>
                </div>
            ) : (
                <div className='right'>
                <Button to='/login'>로그인</Button>
                </div>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};



export default Header;