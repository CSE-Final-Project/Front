import React from 'react';
import Button from './Button';
import font from '../../css/font.css'
import { Nav, Navbar,Container,Offcanvas,NavDropdown,Form,FormControl } from 'react-bootstrap';
import '../../App.css'
import styled from 'styled-components';

const Header2 = ({user, onLogout}) => {
    return (
        <div>
            <Navbar bg="light" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="/" ><div >
                    {/* <img src="img/studydo.png" width="130px" height="40px"/> */}
                    {/* <img src={require("./studydo.png").default} width="130px" height="40px"/> */}
                    <img src={process.env.PUBLIC_URL + '/img/studydo.png'} width="130px" height="40px"/>
                        </div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                    {
                        user ? (
                            <div className='App'>
                                <Offcanvas.Title id="offcanvasNavbarLabel">{user}</Offcanvas.Title>
                            </div>
                        ) : null
                    }
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        {
                            user? (
                                <div className='App'>
                                    <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>
                                    <Nav.Link href="/studies/my">참여 중인 스터디</Nav.Link>
                                    <Nav.Link href="/studies">스터디 목록</Nav.Link>
                                    <Nav.Link href="/studies/ranking">스터디 랭킹</Nav.Link>
                                </div>
                            ) : (
                                <div className='App'>
                                    <Nav.Link href="/login">로그인</Nav.Link>
                                </div>
                            )
                        }
                        
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            
        </div>
    );
};

export default Header2;