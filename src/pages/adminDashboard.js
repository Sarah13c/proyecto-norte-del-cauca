import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, ScatterChart, Scatter, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from 'recharts';
import NavBar from '../components/Nav/TopNavbar';



const AdminDashboard = () => {
    const lineChartColor = '#8884d8';
    const barChartColor = '#82ca9d';
    const pieChartColors = ['#FFA726', '#FFD54F', '#FFB74D', '#FF8A65', '#FFCC80'];
    const areaChartColors = ['#8884d8', '#82ca9d'];
    const scatterChartColor = '#8884d8';


    const lineChartData = [
        { name: 'Enero', visits: 200 },
        { name: 'Febrero', visits: 350 },
        { name: 'Marzo', visits: 400 },
        { name: 'Abril', visits: 450 },
        { name: 'Mayo', visits: 600 },
    ];

    const barChartData = [
        { name: 'Página 1', visits: 100 },
        { name: 'Página 2', visits: 200 },
        { name: 'Página 3', visits: 300 },
        { name: 'Página 4', visits: 400 },
        { name: 'Página 5', visits: 500 },
    ];

    const pieChartData = [
        { name: 'Página 1', visits: 100 },
        { name: 'Página 2', visits: 200 },
        { name: 'Página 3', visits: 300 },
        { name: 'Página 4', visits: 400 },
        { name: 'Página 5', visits: 500 },
    ];

    const areaChartData = [
        { name: 'Enero', visits: 200, sales: 100 },
        { name: 'Febrero', visits: 350, sales: 200 },
        { name: 'Marzo', visits: 400, sales: 300 },
        { name: 'Abril', visits: 450, sales: 400 },
        { name: 'Mayo', visits: 600, sales: 500 },
    ];

    const scatterChartData = [
        { x: 10, y: 30 },
        { x: 20, y: 40 },
        { x: 30, y: 50 },
        { x: 40, y: 60 },
        { x: 50, y: 70 },
    ];

    return (
        <>
        
            <NavBar />
            
            <Col className="text-center">
          <h1>DASHBOARD ADMIN</h1>
            </Col>
            
                <Row className="mb-4">
                    
                    <Col md={3}> {/* Cambiado a md={3} para la barra lateral */}
                        
                    </Col>
                    <Col md={9}> {/* Cambiado a md={9} para el contenido */}
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header className="text-center">Gráfica de Línea</Card.Header>
                                    <Card.Body>
                                        <LineChart width={400} height={300} data={lineChartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#eee" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="visits" stroke={lineChartColor} />
                                        </LineChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header className="text-center">Gráfica de Barras</Card.Header>
                                    <Card.Body>
                                        <BarChart width={400} height={300} data={barChartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#ccc" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="visits" fill={barChartColor} />
                                        </BarChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header className="text-center">Gráfica de Pastel</Card.Header>
                                    <Card.Body>
                                        <PieChart width={400} height={300}>
                                            <Pie data={pieChartData} dataKey="visits" nameKey="name" cx="50%" cy="50%" outerRadius={80} label fill={pieChartColors} />
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header className="text-center">Gráfica de Área</Card.Header>
                                    <Card.Body>
                                        <AreaChart width={400} height={300} data={areaChartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#ccc" />
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="visits" fill={areaChartColors[0]} />
                                            <Area type="monotone" dataKey="sales" fill={areaChartColors[1]} />
                                        </AreaChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Header className="text-center">Gráfica de Dispersión</Card.Header>
                                    <Card.Body>
                                        <ScatterChart width={400} height={300}>
                                            <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                                            <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                                            <CartesianGrid />
                                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                            <Legend />
                                            <Scatter name="A scatter" data={scatterChartData} fill={scatterChartColor} />
                                        </ScatterChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            
        </>
    );
};

export default AdminDashboard;
