import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Fragment, useState} from "react";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

function Menu(props) {
    const [token] = useState(localStorage.getItem('token'));
    const {user} = useContext(AuthContext);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">TWRL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>

                        {/*Only Authenticated user can manage booking*/}
                        {token && user &&
                            <Fragment>
                                <Nav.Link href="/booking">Booking</Nav.Link>
                                <Nav.Link href="/reservations">My Booking</Nav.Link>

                                {/*//Only Staff can view Admin menu*/}
                                {user && user.is_staff &&
                                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/management/rooms/">Room Management</NavDropdown.Item>
                                        <NavDropdown.Item href="/management/reservations">Reservations
                                            Management</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/management/users/">User Management</NavDropdown.Item>
                                    </NavDropdown>
                                }

                                <Nav.Link href="/logout">Logout</Nav.Link>
                                {user && (<Nav style={{paddingLeft:50}}>Welcome, {user.first_name}</Nav>)}
                            </Fragment>
                        }
                        {/*If it is not Authenticated browser.*/}
                        {!token &&
                            <Fragment>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;