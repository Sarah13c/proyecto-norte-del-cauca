import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';
import NavBar from '../components/Nav/TopNavbar';
import CardsGrid from '../components/CardsGrid';
import Graphic from '../components/Graphic';
import Sidebar from "../components/Sidebar";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';


const Salud = () => {
  
    const column1Styles = {
        backgroundColor: '#138A92',
        padding: '20px',
    };

    // Define el arreglo de cartas aquí
    const cardTexts = [
        {
            icon: faSkullCrossbones,
            title: '28.786',
            description: 'Total de muertes',
            bg: '#921313',
        },
        {
          icon: faSkullCrossbones,
          title: '28.786',
          description: 'Total de muertes',
          bg: '#921313',
      },{
        icon: faSkullCrossbones,
        title: '28.786',
        description: 'Total de muertes',
        bg: '#921313',
    }
        // Agrega más objetos con diferentes iconos según sea necesario
    ];

    return (
        <>
        <NavBar />
      
        <Row style={{ marginTop: '100px' }}> 
          <Col sm={2} style={column1Styles}>
            <Sidebar />
          </Col>
                <Col sm={6}>
                    <Image src="/img/FotoMapa.jpg" rounded />
                </Col>
                <Col sm={4}>
                    <Row>
                        <h2>SALUD</h2>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}> 
                       
                        <CardsGrid cardTexts={cardTexts} columns={cardTexts.length} />
                    </Row>
                    <Row>
                        Gráfica
                        <Graphic />
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Salud;