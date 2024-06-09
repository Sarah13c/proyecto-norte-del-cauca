import React, { useState } from "react";
import { Box, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import StackedBarChartConflicto from "../../../../components/charts/violence/StackedBarChartConflicto.js";

const ConflictosArmados = ({ data, ...rest }) => {
  // Estado para los años y la entidad seleccionados
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Obtener la lista de años y entidades disponibles
  const years = [...new Set(data.map((entry) => entry.Año))].sort((a, b) => a - b);
  const entities = [...new Set(data.map((entry) => entry.Entidad))];

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Manejar el cambio de año inicial
  const handleStartYearChange = (event) => {
    const value = event.target.value === "" ? null : parseInt(event.target.value);
    setStartYear(value);
  };

  // Manejar el cambio de año final
  const handleEndYearChange = (event) => {
    const value = event.target.value === "" ? null : parseInt(event.target.value);
    setEndYear(value);
  };

  // Manejar el cambio de entidad
  const handleEntityChange = (event) => {
    const value = event.target.value === "" ? null : event.target.value;
    setSelectedEntity(value);
  };

  // Filtrar los datos por rango de años y entidad seleccionados
  let filteredData = data;
  if (startYear && endYear) {
    filteredData = filteredData.filter((entry) => entry.Año >= startYear && entry.Año <= endYear);
  }
  if (selectedEntity) {
    filteredData = filteredData.filter((entry) => entry.Entidad === selectedEntity);
  }

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Conflictos Armados por Municipio y Año
        </Text>
      </Flex>
      <Box mt="20px">
        {data && (
          <Flex justify="center" mb="10px">
            <Select
              placeholder="Desde Año"
              value={startYear || ""}
              onChange={handleStartYearChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
              mr="10px"
            >
              <option value="">Todos los años</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Hasta Año"
              value={endYear || ""}
              onChange={handleEndYearChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
              mr="10px"
            >
              <option value="">Todos los años</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Seleccione un municipio"
              value={selectedEntity || ""}
              onChange={handleEntityChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
            >
              <option value="">Todos los municipios</option>
              {entities.map((entity) => (
                <option key={entity} value={entity}>
                  {entity}
                </option>
              ))}
            </Select>
          </Flex>
        )}
      </Box>
      <Box h="350px" mt="auto">
        {data && <StackedBarChartConflicto data={filteredData} />}
      </Box>
    </Card>
  );
};

export default ConflictosArmados;