import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponents/MapComponent';
import 'leaflet/dist/leaflet.css';
import NavBar from '../components/Nav/TopNavbar';
import CardsGrid from '../components/CardsGrid';
import Graphic from '../components/Graphic';
import Sidebar from "../components/Sidebar";
import { faHouseUser, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Demografia = () => {
    const center = [2.283333, -76.85];
    const [mousePosition, setMousePosition] = useState(null);
    const [totalPoblacion, setTotalPoblacion] = useState(null); // Estado para almacenar el total de población
    const [error, setError] = useState(null); // Estado para almacenar el error
    const [municipiosData, setMunicipiosData] = useState(null); // Estado para almacenar los datos de los municipios

    const column1Styles = {
        backgroundColor: '#0E77C8',
    };

    // Obtener el total de población y los datos de los municipios desde el backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalPoblacionResponse = await fetch('http://localhost:3001/total2022Poblacion');
                if (!totalPoblacionResponse.ok) {
                    throw new Error('Error al obtener los datos del servidor');
                }
                const totalPoblacionData = await totalPoblacionResponse.json();
                setTotalPoblacion(totalPoblacionData[0].total_poblacion);

                const municipiosResponse = await fetch('http://localhost:3001/datos2022Poblacion');
                if (!municipiosResponse.ok) {
                    throw new Error('Error al obtener los datos de los municipios del servidor');
                }
                const municipiosData = await municipiosResponse.json();
                setMunicipiosData(municipiosData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError(error.message); // Establecer el error en el estado
            }
        };
        fetchData();
    }, []);

    // Define el arreglo de cartas aquí
    const cardTexts = [
        {
            icon: faHouseUser,
            title: '8.023',
            description: 'Densidad Urbana (km2)',
            bg: '#0E77C8',
        },
        {
            icon: faUsers,
            title: totalPoblacion !== null ? totalPoblacion : 'Cargando...', // Mostrar el total de población o "Cargando..." si aún no se ha cargado
            description: 'Total de Habitantes ',
            bg: '#139218',
        },
        {
            icon: faBuilding,
            title: 'Otro valor',
            description: 'Descripción del otro valor',
            bg: '#924113',
        },
    ];

    return (
        <>
            <NavBar />

            <Row style={{ marginTop: '100px' }}>
                <Col sm={2} style={column1Styles}>
                    <Sidebar />
                </Col>
                <Col sm={6}>
                    <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}> {/* Tamaño específico y ocultar el desbordamiento */}
                        <MapComponent
                            center={center}
                            mousePosition={mousePosition}
                            setMousePosition={setMousePosition}
                        />
                    </div>
                </Col>
                <Col sm={4}>
                    <Row>
                        <h1>DEMOGRAFÍA</h1>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}> {/* Agrega margen inferior */}
                        {/* Pasa el arreglo de cartas y el número de columnas como propiedades al componente CardsGrid */}
                        <CardsGrid cardTexts={cardTexts} />
                    </Row>
                    <Row>
                        Gráfica
                        {municipiosData && <Graphic data={municipiosData} />}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Demografia;
