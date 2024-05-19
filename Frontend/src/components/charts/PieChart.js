import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend as PieLegend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={30}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="Poblacion_DANE"
          nameKey="MunicipioAS"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <PieLegend
          layout="horizontal"
          align="left"
          verticalAlign="top"
          iconSize={10}
          iconType="square"
          margin={{ top: 10 }}
          content={({ payload }) => (
            <ul>
              {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ fontSize: '10px' }}>
                  <span style={{ backgroundColor: entry.color, marginRight: '4px', display: 'inline-block', width: '10px', height: '10px' }}></span>
                  {entry.value}
                </li>
              ))}
            </ul>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
