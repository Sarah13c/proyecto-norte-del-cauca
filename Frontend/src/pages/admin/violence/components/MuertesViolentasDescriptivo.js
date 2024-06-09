import React, { useState } from "react";
import { Box, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import StackedLineChartMV from "../../../../components/charts/violence/StackedLineChartMV.js";

const MuertesViolentasDescriptivo = ({ data, ...rest }) => {
  // Estado para los años, manera de muerte y causa de muerte seleccionados
  const [selectedManner, setSelectedManner] = useState(null);
  const [selectedCause, setSelectedCause] = useState(null);

  // Obtener la lista de años, maneras de muerte y causas de muerte disponibles
  const manners = [...new Set(data.map((entry) => entry["MANERA DE MUERTE DEFINITIVA"]))];
  const causes = [...new Set(data.map((entry) => entry["CAUSA DE MUERTE DEFINITIVA"]))];

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");


  // Manejar el cambio de manera de muerte
  const handleMannerChange = (event) => {
    const value = event.target.value === "" ? null : event.target.value;
    setSelectedManner(value);
    setSelectedCause(null); // Restablecer la causa de muerte seleccionada
  };

  // Manejar el cambio de causa de muerte
  const handleCauseChange = (event) => {
    const value = event.target.value === "" ? null : event.target.value;
    setSelectedCause(value);
  };

  // Filtrar los datos por año, manera de muerte y causa de muerte seleccionados
  let filteredData = data;
  if (selectedManner) {
    filteredData = filteredData.filter((entry) => entry["MANERA DE MUERTE DEFINITIVA"] === selectedManner);
  }
  if (selectedCause) {
    filteredData = filteredData.filter((entry) => entry["CAUSA DE MUERTE DEFINITIVA"] === selectedCause);
  }

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Muertes Violentas por Municipio y Año
        </Text>
      </Flex>
      <Box mt="20px">
        {data && (
          <Flex justify="center" mb="10px">
            <Select
              placeholder="Seleccione manera de muerte"
              value={selectedManner || ""}
              onChange={handleMannerChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
              mr="10px"
            >
              <option value="">Todas las maneras</option>
              {manners.map((manner) => (
                <option key={manner} value={manner}>
                  {manner}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Seleccione causa de muerte"
              value={selectedCause || ""}
              onChange={handleCauseChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
            >
              <option value="">Todas las causas</option>
              {causes
                .filter((cause) => selectedManner ? data.some((entry) => entry["MANERA DE MUERTE DEFINITIVA"] === selectedManner && entry["CAUSA DE MUERTE DEFINITIVA"] === cause) : true)
                .map((cause) => (
                  <option key={cause} value={cause}>
                    {cause}
                  </option>
                ))}
            </Select>
          </Flex>
        )}
      </Box>
      <Box h="350px" mt="auto">
        {data && <StackedLineChartMV data={filteredData} />}
      </Box>
    </Card>
  );
};

export default MuertesViolentasDescriptivo;    