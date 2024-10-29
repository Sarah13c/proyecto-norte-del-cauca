// TotalAccesosCarnales.js
import React, { useState } from "react";
import { Box, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import BarGroupChartAcc from "../../../../components/charts/security/BarGroupChartAcc.js";

export default function TotalAccesosCarnales({ data, areas, onAreaChange, ...rest }) {
  const [selectedYear, setSelectedYear] = useState("");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Filtrar los datos por el año seleccionado
  const filteredData = selectedYear
    ? data.filter((d) => d.AÑO_AcceCar === parseInt(selectedYear))
    : data;

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Accesos Carnales por Municipio, Año y Zona
        </Text>
      </Flex>
      <Box mt="20px">
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
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </Select>
        </Flex>
      </Box>
      <Box h="350px" mt="auto">
        <BarGroupChartAcc data={filteredData} />
      </Box>
    </Card>
  );
}
