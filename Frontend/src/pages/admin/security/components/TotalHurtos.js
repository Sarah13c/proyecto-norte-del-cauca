import React, { useState } from 'react';
import { Box, Flex, Select, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/card/Card.js';
import LineApexChart from '../../../../components/charts/security/LineApexChart.js';

export default function TotalHurtos({ data, ...rest }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [selectedZone, setSelectedZone] = useState('RURAL'); // Estado para almacenar la zona seleccionada

  // Función para filtrar los datos según la zona seleccionada
  const filterDataByZone = (data, zone) => {
    return data.filter((item) => item.ZONA_Hurto === zone);
  };

  // Datos filtrados según la zona seleccionada
  const filteredData = selectedZone ? filterDataByZone(data, selectedZone) : data;

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Hurtos por Municipio y Zona
        </Text>
        <Select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          placeholder="Selecciona una zona"
        >
          <option value="RURAL">Rural</option>
          <option value="URBANA">Urbana</option>
        </Select>
      </Flex>
      <Box h="350px" mt="auto">
        {filteredData && <LineApexChart data={filteredData} />}
      </Box>
    </Card>
  );
}