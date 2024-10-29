// TotalViolenciaIntrafamiliar.js
import React, { useState, useEffect } from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import PieChartAcc from "../../../../components/charts/security/PieChartAcc.js";

const TotalViolenciaIntrafamiliar = ({ data, ...rest }) => {

  // Estado para el año seleccionado
  const [selectedYear, setSelectedYear] = useState(2020);

  // Obtener la lista de años disponibles
  const years = [...new Set(data.map((entry) => entry.AÑO_VioIn))];

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Manejar el cambio de año
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // Filtrar los datos por año seleccionado
  const filteredData = data.filter((entry) => entry.AÑO_VioIn === selectedYear);

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Violencia Intrafamiliar por Municipio y Año
        </Text>
      </Flex>
      <Box mt="20px">
        {data && (
          <Flex justify="center">
            <Select
              placeholder="Seleccione un año"
              value={selectedYear}
              onChange={handleYearChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </Flex>
        )}
      </Box>
      <Box h="350px" mt="auto">
        {data && <PieChartAcc data={filteredData} />}
      </Box>
    </Card>
  );
};

export default TotalViolenciaIntrafamiliar;