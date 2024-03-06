import React from 'react';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar';
import FormInfo from '../components/FormInfo';
import Sidebar from "../components/Sidebar";
import AccessibilityPage from '../components/AccessibilityPage';

const Accessibility = () => {
    const column1Styles = {
        backgroundColor: '#138A92',
        padding: '20px',
    };

    const column2Styles = {
        marginRight: '10px', // Espacio entre las columnas
    };

    return (
        <>
            <NavBar />
            <Row>
                <Col sm={2} style={column1Styles}>
                    <Sidebar />
                </Col>
                <Col sm={9} className="column-2" style={column2Styles}> {/* Añade la clase column-2 y el estilo de margen */}
                <AccessibilityPage />
                </Col>
            </Row>
        </>
    );
};

export default Accessibility;
