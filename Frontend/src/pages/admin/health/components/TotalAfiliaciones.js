import React from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import BarGroupChart from "../../../../components/charts/BarGroupChart.js";

export default function TotalAfiliaciones({
  afiliacionesPorMunicipio,
  selectedYear,
  handleYearChange,
  ...rest
}) {
  // Lista de años disponibles
  const years = afiliacionesPorMunicipio
    ? [...new Set(afiliacionesPorMunicipio.map((entry) => entry.Año))]
    : [];

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Afiliaciones por Municipio y Régimen
        </Text>
      </Flex>
      <Box mt="20px">
        {afiliacionesPorMunicipio && (
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
        {afiliacionesPorMunicipio && (
          <BarGroupChart
            data={afiliacionesPorMunicipio}
            selectedYear={selectedYear}
          />
        )}
      </Box>
    </Card>
  );
}