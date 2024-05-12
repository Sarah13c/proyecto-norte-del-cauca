import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ComposedChart, Area, Scatter } from 'recharts';
import { PieChart, Pie, Legend as PieLegend, Cell, Tooltip as PieTooltip } from 'recharts';
import { Navbar, Nav } from 'react-bootstrap';

const Graphic = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AD40AF'];

  const [chartType, setChartType] = useState('bar');

  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MunicipioAS" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Poblacion_DANE" fill="#8884d8" name="Población" />
        </BarChart>
      );
    } else if (chartType === 'pie') {
      return (
        <PieChart width={400} height={400}>
          <PieTooltip />
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="Poblacion_DANE"
            nameKey="Municipio"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <PieLegend />
        </PieChart>
      );
    } else if (chartType === 'line') {
      return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MunicipioAS" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Poblacion_DANE" stroke="#8884d8" activeDot={{ r: 8 }} name="Población" />
        </LineChart>
      );
    } else if (chartType === 'linearea') {
      return (
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="Municipio" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Poblacion_DANE" fill="#8884d8" stroke="#8884d8" name="Población" />
          <Bar dataKey="Poblacion_DANE" barSize={20} fill="#413ea0" name="Población" />
          <Line type="monotone" dataKey="Poblacion_DANE" stroke="#ff7300" name="Población" />
          <Scatter dataKey="Poblacion_DANE" fill="red" name="Población" />
        </ComposedChart>
      );
    }
  };

  return (
    <div>
      {/* Navbar con opción para cambiar el tipo de gráfico */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Tipo: </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => setChartType('bar')}>Gráfico de barras</Nav.Link>
            <Nav.Link onClick={() => setChartType('pie')}>circular</Nav.Link>
            <Nav.Link onClick={() => setChartType('line')}>línea</Nav.Link>
            <Nav.Link onClick={() => setChartType('linearea')}>Línea-Área</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {renderChart()}
    </div>
  );
};

export default Graphic;
