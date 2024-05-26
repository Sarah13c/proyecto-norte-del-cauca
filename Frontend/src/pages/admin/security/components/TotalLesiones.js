import React, { useState } from 'react';
import { Box, Flex, Select, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/card/Card.js';
import MultipleLineChart from '../../../../components/charts/MultipleLineChart.js';

export default function TotalLesiones({ data, ...rest }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [selectedMunicipio, setSelectedMunicipio] = useState('Todos');
  const [selectedZona, setSelectedZona] = useState('Todas');

  // Obtener la lista de municipios únicos
  const municipios = ['Todos', ...new Set(data.map(item => item.MUNICIPIO_HECHO_LePe))];

  // Obtener la lista de zonas únicas
  const zonas = ['Todas', 'RURAL', 'URBANA'];

  // Función para filtrar los datos según el municipio y zona seleccionados
  const filterDataByMunicipioAndZona = (data, municipio, zona) => {
    if (municipio === 'Todos') {
      return zona === 'Todas'
        ? data
        : data.filter(item => item.ZONA_LePe === zona);
    }

    return data.filter(
      item =>
        item.MUNICIPIO_HECHO_LePe === municipio &&
        (zona === 'Todas' || item.ZONA_LePe === zona)
    );
  };

  // Datos filtrados según el municipio y zona seleccionados
  const filteredData = filterDataByMunicipioAndZona(
    data,
    selectedMunicipio,
    selectedZona
  );

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Lesiones personales por Municipio y Zona
        </Text>
        <Select
          value={selectedMunicipio}
          onChange={(e) => setSelectedMunicipio(e.target.value)}
          placeholder="Selecciona un municipio"
        >
          {municipios.map(municipio => (
            <option key={municipio} value={municipio}>
              {municipio === 'Todos' ? 'Todos los municipios' : municipio}
            </option>
          ))}
        </Select>
        <Select
          value={selectedZona}
          onChange={(e) => setSelectedZona(e.target.value)}
          placeholder="Selecciona una zona"
        >
          {zonas.map(zona => (
            <option key={zona} value={zona}>
              {zona === 'Todas' ? 'Todas las zonas' : zona}
            </option>
          ))}
        </Select>
      </Flex>
      <Box h="350px" mt="auto">
        {filteredData && <MultipleLineChart data={filteredData} />}
      </Box>
    </Card>
  );
}
