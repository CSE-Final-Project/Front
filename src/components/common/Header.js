import React from 'react';
import Button from './Button';
import { Nav, Navbar,Container,Offcanvas,NavDropdown,Form,FormControl } from 'react-bootstrap';
const Header2 = ({user, onLogout}) => {
    return (
        <div>
            <Navbar bg="light" expand={false}>
                <Container fluid>
                    <Navbar.Brand href="/">STUDY.DO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                    {
                        user ? (
                            <Offcanvas.Title id="offcanvasNavbarLabel">{user}</Offcanvas.Title>
                        ) : null
                    }
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        {
                            user? (
                                <>
                                    <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>
                                    <Nav.Link href="/studies/my">참여 중인 스터디</Nav.Link>
                            <Nav.Link href="/studies">스터디 목록</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link href="/login">로그인</Nav.Link>
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