import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../styles/style.css';
import NavBar from '../components/Nav/TopNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Form } from 'react-bootstrap';

const Register = () => {
    return (
        <>
            <NavBar enPaginaRegistro={true} />
            <Row className="m-0">
                <Col lg={6} className="mb-5 d-flex align-items-center">
                    <div className="d-flex flex-column ms-5 flex-grow-1">
                        <div className="text-center">
                            <h4 className="mt-1 mb-5 pb-1" style={{color: '#0E77C8'}}>INICIAR SESIÓN EN TU CUENTA</h4>
                        </div>
                        <div className="text-center mb-3">
                            <p>Inicia sesión con:</p>
                            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>

                                <Button variant='outline-primary' className='m-1' style={{color: '#0E77C8'}}>
                                    <FontAwesomeIcon icon={faTwitter} size="sm" />
                                </Button>
                                <Button variant='outline-primary' className='m-1' style={{color: '#0E77C8'}}>
                                    <FontAwesomeIcon icon={faGoogle} size="sm" />
                                </Button>
                                <Button variant='outline-primary' className='m-1' style={{color: '#0E77C8'}}>
                                    <FontAwesomeIcon icon={faGithub} size="sm" />
                                </Button>
                            </div>
                        </div>
                        <Form.Group className='mb-4'>
                            <Form.Label style={{color: '#0E77C8'}}>Correo</Form.Label>
                            <Form.Control type='email' />
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label style={{color: '#0E77C8'}}>Contraseña</Form.Label>
                            <Form.Control type='password' />
                        </Form.Group>
                        <div className="text-center pt-1 mb-5 pb-1">
                            <Button className="mb-4 w-100 gradient-custom-2" style={{backgroundColor: '#0E77C8'}}>Iniciar Sesión</Button>
                            <a className="text-muted" href="#!" style={{color: '#0E77C8'}}>Olvidaste la contraseña</a>
                        </div>
                    </div>
                </Col>
                <Col lg={6} className="mb-5">
                    <div className="d-flex flex-column align-items-center justify-content-center gradient-custom-2 h-100 mb-4" style={{backgroundColor: '#0E77C8'}}>
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4 text-center">
                            <h4 className="mb-4">¿NO TIENES CUENTA?</h4>
                            <p className="small mb-0">Regístrate ahora y descubre las funcionalidades que te ofrecemos!</p>
                            <Button className="mt-4 w-70" style={{ backgroundColor: 'white', color: '#0E77C8' }} href="/register">Crear Cuenta</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Register;
